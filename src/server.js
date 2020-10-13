const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3005;

// Filter data to the body collection in chunks
// When the end of the data is reached, add each user through the jsonHandler
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addCharacter') {
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      console.log(bodyParams);

      jsonHandler.addCharacter(request, response, bodyParams);
    });
  }
};

// Will use the appropriate method to retrieve our already existing data
const handleGet = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/main.js') {
    htmlHandler.getMain(request, response);
  } else if (parsedUrl.pathname === '/sheet.js') {
    htmlHandler.getSheet(request, response);
  } else if (parsedUrl.pathname === '/utilities.js') {
    htmlHandler.getUtils(request, response);
  } else if (parsedUrl.pathname === '/getCharacters') {
    jsonHandler.getCharacters(request, response);
  } else if (parsedUrl.pathname === '/') {
    htmlHandler.getIndex(request, response);
  } else {
    jsonHandler.notFound(request, response);
  }
};

// Retrieve only the minimal head data about our response
const handleHead = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/getCharacters') {
    jsonHandler.getCharactersMeta(request, response);
  } else {
    jsonHandler.notFoundMeta(request, response);
  }
};

// Send request, varied by possible url categories, parameters, and accepted types.
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  console.dir(parsedUrl.pathname);
  console.dir(request.method);

  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else if (request.method === 'GET') {
    handleGet(request, response, parsedUrl);
  } else {
    handleHead(request, response, parsedUrl);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
