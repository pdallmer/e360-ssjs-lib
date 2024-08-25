
const traverse = require('@babel/traverse').default;
const { parse } = require('@babel/parser');
const types = require('@babel/types');
const generate = require('@babel/generator').default;
const deps = require('./dependencies.json');

function fixDependencies(path, dependencies) {
    Object.keys(deps).forEach((lib) => {
        deps[lib].forEach((func) => {
            if(dependencies[lib] === undefined) {
                dependencies[lib] = [];
            }
            if (
                path.node.callee.type === 'Identifier' &&
                path.node.callee.name === func && 
                !dependencies[lib].includes(func)
            ) {
                dependencies[lib].push(func);
            }
        })
    });
}

module.exports = function (input) {
    const ast = parse(input);
    const functions = {};
    const dependencies = {};
    traverse(ast, {
        FunctionDeclaration(path) {
            path.node.leadingComments = null;
            path.node.trailingComments = null;
            path.node.innerComments = null;
            functions[path.node.id.name] = generate(path.node, { comments: false }).code;
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
        if(deps.length) {
            output = "import { "+deps.join(", ")+" } from '../../loaders/ssjsLoader!./"+lib+".ssjs'\n" + output
        }
    });
    return output;
};