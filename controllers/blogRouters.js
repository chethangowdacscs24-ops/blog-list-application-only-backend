const Blog = require("../models/blog");
const blogRouter = require("express").Router();

// GET all blogs from the database
blogRouter.get("/", async (request, response) => {
  const result = await Blog.find({});
  response.json(result);
});

// GET a specific blog post using the id parameter from the URL
blogRouter.get("/:id", async (request, response) => {
  const post = await Blog.findById(request.params.id);

  if (!post) {
    return response.status(404).json({ error: "blog post not found" });
  }

  response.json(post);
});

// POST a new blog post, validating required fields before saving
blogRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body || !body.title || !body.url) {
    return response.status(400).json({ error: "title or url is missing" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

// DELETE a blog post by id; if no post exists, return an error
blogRouter.delete("/:id", async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id);
  if (!deletedBlog) {
    return response.status(400).json({ error: "no such id found to delete" });
  }

  response.status(202).end();
});

module.exports = blogRouter;
