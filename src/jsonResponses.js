// Note this object is purely in memory
const characters = {};

// Will respond with a json object string
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

// Will only provide the headers and status of a json response
const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

// Will respond with our updated json object of users
const getCharacters = (request, response) => {
  const responseJSON = {
    characters,
  };

  return respondJSON(request, response, 200, responseJSON);
};

// Will only request head of users data
const getCharactersMeta = (request, response) => respondJSONMeta(request, response, 200);

// Will add an entirely new user
// with 201 status, or 204 if the user already exists,
// or 400 if parameters are missing
const addCharacter = (request, response, body) => {
  const responseJSON = {
    message: 'All parameters are required.',
  };

  let responseCode = 201;

  console.dir(body);
  let isMissingParams = false;
  for (let i = 0; i < Object.entries(body).length; i++) {
    if (Object.entries(body)[i] == null) {
      console.dir(`${Object.entries(body)[i]}`);
      isMissingParams = true;
      responseJSON.id = 'missingParams';
    }
  }

  if (isMissingParams) {
    return respondJSON(request, response, 400, responseJSON);
  }

  responseCode = 201;

  if (characters[body.UID]) {
    responseCode = 204;
  } else {
    characters[body.UID] = {};
    characters[body.UID].UID = body.UID;
  }

  console.dir(body);
  Object.entries(body).forEach(([key, value]) => { characters[body.UID][key] = value; });

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully.';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

// Effective default response if we arrive at an unknown endpoint
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

// Response only with head data of unknown enpoint
const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
  getCharacters,
  getCharactersMeta,
  addCharacter,
  notFound,
  notFoundMeta,
};
