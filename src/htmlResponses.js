const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const main = fs.readFileSync(`${__dirname}/../client/main.js`);
const sheet = fs.readFileSync(`${__dirname}/../client/sheet.js`);
const utils = fs.readFileSync(`${__dirname}/../client/utilities.js`);

// Get the index page of our API using the client.html file loaded above
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// Get our CSS file from the style.css file loaded above
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// bottom three functions are for connecting to client-size javascript
const getMain = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(main);
  response.end();
};
const getUtils = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(utils);
  response.end();
};
const getSheet = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(sheet);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
  getMain,
  getSheet,
  getUtils,
};
