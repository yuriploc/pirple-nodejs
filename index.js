const http = require('http');
const url = require('url');

// the server should respond to all requests with a string
const server = http.createServer((req, res) => {
  // get the url and parse it
  const parsedUrl = url.parse(req.url, true);

  // get the path from the url
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\+|\+$/g, '');

  // send the response
  res.end('hello there\n');

  // log the path requested
});

// start the server and have it listen on port 4500
server.listen(4500, _ => console.log('server ONLINE on port 4500'));
