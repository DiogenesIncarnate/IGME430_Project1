// Note this object is purely in memory
const characters = {};

const rollDice = (n, d) => {
  const _rolls = [];
  for (let i = 0; i < n; i++) {
    const roll = Math.floor(Math.random() * d);
    _rolls.push(roll);
  }

  const _sum = _rolls.reduce((a, b) => a + b, 0);

  const results = { rolls: _rolls, sum: _sum };

  return results;
};

const rollForAbilityScore = () => {
  const results = rollDice(4, 6);
  let { sum } = results;
  sum -= Math.min(results.rolls);
  return sum;
};

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

// Will update existing user with 201 status
const updateCharacter = (request, response) => {
  const newCharacter = {
    createdAt: Date.now(),
  };

  characters[newCharacter.createdAt] = newCharacter;

  return respondJSON(request, response, 201, newCharacter);
};

// Will add an entirely new user
// with 201 status, or 204 if the user already exists,
// or 400 if parameters are missing
const addCharacter = (request, response, body) => {
  const responseJSON = {
    message: 'All parameters are required.',
  };

  let responseCode = 201;

  if (!body.name || !body.race || !body.class) {
    console.dir(`${body.name}, ${body.race}, ${body.class}`);
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  responseCode = 201;

  console.log(rollForAbilityScore());

  if (characters[body.name]) {
    responseCode = 204;
  } else {
    characters[body.name] = {};
  }

  characters[body.name] = body;

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
  updateCharacter,
  notFound,
  notFoundMeta,
};
