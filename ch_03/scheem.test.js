var PEG = require('pegjs');
var assert = require('assert');
var fs = require('fs'); // for loading files

// Read file contents
var data = fs.readFileSync('scheem.peg', 'utf-8');
// Show the PEG grammar file
console.log("===== Grammar =====");
console.log(data);
// Create my parser
var parse = PEG.buildParser(data).parse;
// Do a test
console.log("===== Tests =====");

assert.deepEqual( parse("atom"), "atom" );
assert.deepEqual( parse("+"), "+" );
assert.deepEqual( parse("(+ x 3)"), ["+","x","3"] );
assert.deepEqual( parse("(+ 1 (f x 3 y))"),["+", "1", ["f", "x", "3", "y"]]);

//Add extra white space
assert.deepEqual( parse("      atom      "), "atom" );
assert.deepEqual( parse("( + x 3 )"), ["+","x","3"] );
assert.deepEqual( parse("   (     + x 3     )   "), ["+","x","3"] );
assert.deepEqual( parse("   (    +      1      (      f    x   3     y)      )"),["+", "1", ["f", "x", "3", "y"]]);
assert.deepEqual( parse("( + 1 \n \t( f x 3 y)\n)"),["+", "1", ["f", "x", "3", "y"]]);

//Add quote syntax
assert.deepEqual( parse("'(1 2 3)"),["quote", [1,2,3]]);
assert.deepEqual( parse("( 1 + '(2 3 4 5) + 3)"),["1","+",["quote",["2","3","4","5"]],"+","3"]);

