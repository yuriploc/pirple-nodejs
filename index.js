const http = require('http');
const https = require('https');
const { URL } = require('url');
const { StringDecoder } = require('string_decoder');
const fs = require('fs');
const config = require('./config');

// instantiate HTTP server
const httpServer = http.createServer((req, res) => {
  unifiedServer(req, res);
});

// start the HTTP server
httpServer.listen(config.httpPort, _ =>
  console.log(`server in ${config.envName} ONLINE on port ${config.httpPort}`)
);

// instantiate HTTPS server
const httpsServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem')
};

const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  unifiedServer(req, res);
});

// start HTTPS server
httpsServer.listen(config.httpsPort, _ => {
  console.log(`server in ${config.envName} ONLINE on port ${config.httpsPort}`);
});

// common server logic
const unifiedServer = (req, res) => {
  // get the url and parse it
  const baseURL = 'http://localhost:4500';
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

    // choose the handler's request
    // const chosenHandler = router[trimmedPath] || handlers.notFound;
    const chosenHandler =
      typeof router[trimmedPath] === 'function'
        ? router[trimmedPath]
        : handlers.notFound;

    // construct the data obj to send to the handler
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      buffer
    };

    // route the request to the handler specified
    chosenHandler(data, (statusCode = 200, payload = {}) => {
      // convert payload to a string
      payloadString = JSON.stringify(payload);

      // return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // log the path requested
      console.log(
        `trimmedPath: ${trimmedPath},
      method: ${method},
      query string: ${queryStringObject},
      headers: ${JSON.stringify(headers)}
      statusCode: ${statusCode}
      payload: ${payloadString}`
      );
    });
  });

  req.on('error', error => {
    console.error(error.stack);
    res.end('ERROR\n');
  });
};

// define router handlers
const handlers = {};

// ping handler
handlers.ping = (data, callback) => {
  callback(200, 'OK');
};

handlers.hello = (data, callback) => {
  callback(200, { greeting: 'Hello World' });
};

// not found handler
handlers.notFound = (data, callback) => {
  callback(404);
};

// requests router
const router = {
  hello: handlers.hello,
  ping: handlers.ping
};
