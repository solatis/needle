//////////////////////////////////////////
// This example demonstrates several ways
// to turn a stream of data into JSON.
//////////////////////////////////////////

var stream = require('stream'),
    needle = require('./../');

// In the first example, we're going to use the built-in
// JSON parser.
console.time('timer1')

var url  = 'http://jsonplaceholder.typicode.com/db';
var resp = needle.get(url, { parse: true });

// The built-in JSON parser emits one single 'data' item
// into the stream, the JSON root node.
resp.on('readable', function(obj) {
  var rootNode;

  // rootNode is a JSON object, and will only be emitted one.
  while (rootNode = this.read()) {
    // do fancy stuff with rootNode
  }
});

resp.on('end', function () {
  console.timeEnd('timer1');
})

// In the second example, we are going only use Needle as
// a stream, but pipe that stream to a more flexible JSON
// parser, JSONStream.
var JSONStream = require('JSONStream');

// Initialize our GET request with our default (JSON) 
// parsers disabled.
console.time('timer2');

var resp = new needle.get(url, {parse: false})
    // And now interpret the stream as JSON, returning only the
    // title of all the posts.
    .pipe(new JSONStream.parse('posts.*.title'));

// Each chunk is a JSON object that matched our search
// query (in this case, specifically, the title).
resp.on('data', function (chunk) {
  // do fancy stuff with chunk
});

resp.on('end', function () {
  console.timeEnd('timer2');
})
