const http = require('http');
const { URL } = require('url');
const { StringDecoder } = require('string_decoder');

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

  // get the headers as an object
  const headers = req.headers;

  // get the payload, if there is any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  req.on('data', data => {
    buffer += decoder.write(data);
  });

  req.on('end', _ => {
    buffer += decoder.end();
    // send the response
    res.end('hello there\n');
    // log the path requested
    console.log(
      `trimmedPath: ${trimmedPath},
      method: ${method},
      query string: ${queryStringObject},
      headers: ${JSON.stringify(headers)}
      payload: ${buffer}`
    );
  });

  req.on('error', error => {
    console.error(error.stack);
    res.end('ERROR\n');
  });
});

// start the server and have it listen on port 4500
server.listen(4500, _ => console.log('server ONLINE on port 4500'));
