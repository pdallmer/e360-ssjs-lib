
const traverse = require('@babel/traverse').default;
const { parse } = require('@babel/parser');
const generate = require('@babel/generator').default;
const deps = require('./dependencies.json');
let polyfills = false;

function fixDependencies(path, dependencies) {
    Object.keys(deps).forEach((lib) => {
        deps[lib].forEach((func) => {
            if (dependencies[lib] === undefined) {
                dependencies[lib] = [];
            }
            if (
                path.node.callee.type === 'Identifier' &&
                path.node.callee.name === func &&
                !dependencies[lib].includes(func)
            ) {
                dependencies[lib].push(func);
            }
            else if(
                path.node.callee.type === 'MemberExpression' && 
                deps.polyfills.includes(path.node.callee.property.name)
            ){
                polyfills = true;
            }
        })
    });
}

module.exports = function (input) {
    const ast = parse(input);
    const functions = {};
    const dependencies = {};
    const resource = this.resource.replace(/.*?(\w+).ssjs$/g, "$1");
    traverse(ast, {
        FunctionDeclaration(path) {
            functions[path.node.id.name] = generate(path.node).code;
        },

        CallExpression(path) {
            fixDependencies(path, dependencies);
        },

        NewExpression(path) {
            fixDependencies(path, dependencies);
        },
    });
    let output = Object.values(functions).map(f => `export ${f}`).join("\n");
    Object.keys(dependencies).forEach((lib) => {
        const deps = dependencies[lib].filter(d => !Object.keys(functions).includes(d));
        if (deps.length) {
            output = "import { " + deps.join(", ") + " } from '../../loaders/ssjsLoader!./" + lib + ".ssjs'\n" + output
        }
    });
    if(polyfills) {
        output = "import './lib_polyfill.ssjs'\n" + output
    }
    return output;
};