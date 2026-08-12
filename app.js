const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogRouter = require("./controllers/blogRouters");
const usersRouter = require("./controllers/userRouters");
const loginRouter = require('./controllers/loginRouters')
const app = express();
const Middleware = require("./utils/middleware");

// express.json parses incoming JSON request bodies and makes them available on request.body
app.use(express.json());

app.use(express.static('dist'))
// middleware that logs every request to the console for easier debugging
app.use(Middleware.requestLogger);

console.log("connecting to db....");
// use the connection string from config.js, which reads from environment variables
mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log("oops..!! connection unsuccessful to DB");
    console.error(error.message);
  });

// route handlers are mounted under these paths
app.use('/api/login', loginRouter)
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);

// handle requests that don't match any route
app.use(Middleware.unknownEndpoint);

// centralized error handling for the whole app
app.use(Middleware.errorHandler);

module.exports = app;
