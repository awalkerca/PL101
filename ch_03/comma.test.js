var PEG = require('pegjs');
var assert = require('assert');
var fs = require('fs'); // for loading files

// Read file contents
var data = fs.readFileSync('comma.peg', 'utf-8');
// Show the PEG grammar file
console.log("===== Grammar =====");
console.log(data);
// Create my parser
var parse = PEG.buildParser(data).parse;
// Do a test
console.log("===== Tests =====");

assert.deepEqual( parse("1+2"), {tag:"+", left:1, right:2} );
assert.deepEqual( parse("1+2*3"), {tag:"+", left:1, right:{tag:"*", left:2, right:3}} );
assert.deepEqual( parse("1,2+3"), {tag:",", left:1, right:{tag:"+", left:2, right:3}} );
assert.deepEqual( parse("1*2,3"), {tag:",", left:{tag:"*", left:1, right:2}, right:3} );
