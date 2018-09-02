const http = require('http');
const { URL } = require('url');

// the server should respond to all requests with a string
const server = http.createServer((req, res) => {
  const baseURL = 'http://localhost:4500/';

  // get the url and parse it
  const parsedUrl = new URL(req.url, baseURL);

  // get the path from the url
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // get the query string as a URLSearchParams object
  const queryStringObject = parsedUrl.searchParams;

  // get the HTTP method
  const method = req.method.toLowerCase();

  // send the response
  res.end('hello there\n');

  // log the path requested
  console.log(
    `trimmedPath: ${trimmedPath}, method: ${method}, query string: ${queryStringObject}`
  );
});

// start the server and have it listen on port 4500
server.listen(4500, _ => console.log('server ONLINE on port 4500'));
