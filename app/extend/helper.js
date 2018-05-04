const crypto = require('crypto');
const http = require('http');

exports.md5 = str => {
  const md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
};

exports.http_request = (body, callback) => {
  const post_data = JSON.stringify(body.data);

  const options = {
    hostname: body.ham_host,
    port: body.ham_port,
    method: 'POST',
    path: body.ham_path,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(post_data),
    },
  };

  console.log('Content-Length: ' + options.headers['Content-Length']);

  const req = http.request(options, function(res) {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      console.log(`BODY: ${chunk}`);
      callback(chunk);
    });

    res.on('end', function() {
      console.log('No more data in response.');
      // callback('No more data in response.');
    });
  });

  req.on('error', function(e) {
    console.log(`problem with request: ${e.message}`);
    callback(`problem with request: ${e.message}`);
  });

  // write data to request body
  req.write(post_data);
  req.end();
};
