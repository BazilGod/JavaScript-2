const http2 = require('http2');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const url = require('url');
const { HTTP2_HEADER_PATH } = http2.constants

const key = fs.readFileSync('localhost.key');
const cert = fs.readFileSync('localhost.cert');

const server = http2.createSecureServer(
  { key, cert },
  onRequest
);

function push(stream, filePath) {
  const fileDescriptor = fs.openSync(filePath, 'r');
  const stat = fs.fstatSync(fileDescriptor);
  const fileHeaders = {
    'content-length': stat.size,
    'last-modified': stat.mtime.toUTCString(),
    'content-type': mime.getType(filePath)
  };

  stream.pushStream({ [HTTP2_HEADER_PATH]: filePath }, (err, pushStream, headers) => {
    if (err) console.log(err);
    else pushStream.respondWithFD(fileDescriptor, fileHeaders);
  });
}

function respondFile(stream, filePath) {
  const fullFilePath = path.join('./public', filePath);

  function statCheck(stat, headers) {
    headers['last-modified'] = stat.mtime.toUTCString();
    headers['content-length'] = stat.size;
  }

  function onError(err) {
    if (err.code === 'ENOENT') {
      stream.respond({ ':status': 404 });
      stream.end("<h1>Error 404! Not Found!</h1>");
    } else {
      stream.respond({ ':status': 500 });
      stream.end("<h1>Error 500! Internal Server Error!</h1>");
    }
  }

  stream.respondWithFile(fullFilePath, { 'content-type': mime.getType(fullFilePath) }, { statCheck, onError });
}

function onRequest(req, res) {

  const reqPath = url.parse(req.headers[':path']).pathname;

  if (reqPath === '/index.html') {
    push(res.stream, 'public/site.css');
    push(res.stream, 'public/app.js');
  }

  respondFile(res.stream, reqPath);
}

server.listen(8443, 'localhost', () => {
  console.log('Server is running');
});