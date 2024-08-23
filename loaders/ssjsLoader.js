
const traverse = require('@babel/traverse').default;
const { parse } = require('@babel/parser');
const types = require('@babel/types');
const generate = require('@babel/generator').default;

module.exports = (input) => {
    const ast = parse(input);
    
    const functions = [];
    traverse(ast, {
        FunctionDeclaration(path) {
            path.node.leadingComments = null;
            path.node.trailingComments = null;
            path.node.innerComments = null;
            functions.push(generate(path.node, {comments: false}).code);
        },
    })
    return functions.map(f => `export ${f}`).join("\n");
};