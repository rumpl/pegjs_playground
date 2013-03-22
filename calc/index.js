var parser = require('./calc.js');

var ast = parser.parse('-2*3.23');

var expr = function (ex) {
    if (ex.type === "num") {
        return ex.val;
    }

    return call(ex);
};

var call = function (node) {
    switch(node.op) {
        case '+':
            return expr(node.left) + expr(node.right);
        case '-':
            return expr(node.left) - expr(node.right);
        case '*':
            return expr(node.left) * expr(node.right);
        case '/':
            return expr(node.left) / expr(node.right);
    }
};

console.log(call(ast));
