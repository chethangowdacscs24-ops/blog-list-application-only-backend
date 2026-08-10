// middleware to log incoming requests for debugging and learning
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

// middleware for handling unknown routes after the router definitions
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// centralized error handling middleware for Express
const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).json({ error: error.message });
  }

 else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }

  console.error("Unhandled error:", error.name, error.message);
  next(error);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
