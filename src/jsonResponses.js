// Note this object is purely in memory
const users = {};

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
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  return respondJSON(request, response, 200, responseJSON);
};

// Will only request head of users data
const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

// Will update existing user with 201 status
const updateUser = (request, response) => {
  const newUser = {
    createdAt: Date.now(),
  };

  users[newUser.createdAt] = newUser;

  return respondJSON(request, response, 201, newUser);
};

// Will add an entirely new user
// with 201 status, or 204 if the user already exists,
// or 400 if parameters are missing
const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
    users[body.name].name = body.name;
  }

  users[body.name].age = body.age;

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
  getUsers,
  getUsersMeta,
  addUser,
  updateUser,
  notFound,
  notFoundMeta,
};
