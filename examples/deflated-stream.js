var fs     = require('fs'),
    stream = require('stream'),
    needle = require('./../');

var url  = 'http://ibl.gamechaser.net/f/tagqfxtteucbuldhezkz/bt_level1.gz';

var resp = needle.get(url, { compressed: true, follow: true });

resp.on('readable', function () {
  var stream = this,
      chunk  = null;

  while (chunk = stream.read()) {
    console.log('Got ' + chunk.length + ' bytes');
  };
});

resp.on('end', function(data) {
  console.log('Done');
})
