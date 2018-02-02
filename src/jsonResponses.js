const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondXML = (request, response, status, xml) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(xml);
  response.end();
};

const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  const responseXML = '<response><message>This is a successful response</message></response>';

  if (request.headers.accept === 'text/xml') {
    return respondXML(request, response, 200, responseXML);
  }
  return respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  let responseXML = '<response><message>Ths request has the required parameters</message></response>';

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'missing valid query paramter set to true';
    responseJSON.id = 'badRequest';
    responseXML = '<response><message>Missing valid query parameter set to true</message><id>badRequest</id></response>';
    if (request.headers.accept === 'text/xml') {
      return respondXML(request, response, 400, responseXML);
    }
    return respondJSON(request, response, 400, responseJSON);
  }

  if (request.headers.accept === 'text/xml') {
    return respondXML(request, response, 200, responseXML);
  }
  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'You are authorized',
  };

  let responseXML = '<response><message>You are authorized</message></response>';

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'You are not logged in; unauthorized';
    responseJSON.id = 'unauthorized';

    responseXML = '<response><message>You are not logged in; unauthorized</message><id>unauthorized</id></response>';

    if (request.headers.accept === 'text/xml') {
      return respondXML(request, response, 401, responseXML);
    }
    return respondJSON(request, response, 401, responseJSON);
  }

  if (request.headers.accept === 'text/xml') {
    return respondXML(request, response, 200, responseXML);
  }
  return respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You are forbidden from viewing this content',
    id: 'forbidden',
  };

  const responseXML = '<response><message>You are forbidden from viewing this content</message><id>forbidden</id></response>';

  if (request.headers.accept === 'text/xml') {
    return respondXML(request, response, 403, responseXML);
  }
  return respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response) => {
  const responseJSON = {
    message: 'Internal server error',
    id: 'internal',
  };

  const responseXML = '<response><message>Internal server error</message><id>internal</id></response>';

  if (request.headers.accept === 'text/xml') {
    return respondXML(request, response, 500, responseXML);
  }
  return respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'Request method not supported by the server',
    id: 'notImplemented',
  };

  const responseXML = '<response><message>Request method not supported by the server</message><id>notImplemented</id></response>';

  if (request.headers.accept === 'text/xml') {
    return respondXML(request, response, 501, responseXML);
  }
  return respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  const responseXML = '<response><message>The page you are looking for was not found</message><id>notFound</id></response>';

  if (request.headers.accept === 'text/xml') {
    return respondXML(request, response, 404, responseXML);
  }
  return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
