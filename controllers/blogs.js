const Blog = require("../models/blog");
const blogRouter = require("express").Router();
blogRouter.get("/", (request, response) => {
  Blog.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      next(error);
    });
});
blogRouter.get("/:id", (request, response) => {
    Blog.find({_id: request.params.id})
      .then((result) => {
        response.json(result);
      })
      .catch((error) => {
        next(error);
      });
  });
blogRouter.delete("/:id", (request, response) => {

  Blog.findByIdAndDelete(request.params.id)
    .then((savedblog) => {
      response.status(202).end();
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = blogRouter;
