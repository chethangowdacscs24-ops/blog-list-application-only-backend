const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();

// GET all blogs from the database
blogRouter.get("/", async (request, response) => {
  const result = await Blog.find({}).populate("user", { username: 1, name: 1 });
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

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogRouter.post('/', async (request, response) => {
  const { title, author, url,  likes } = request.body
  if (!title || !url) {
    return response
      .status(400)
      .json({ error: "title or url  is missing" });
  }
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(400).json({ error: "invalid userid mostly user is delted " });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = await user.blogs.concat(blog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(404).json({ error: "blog not found" })
  }

  if (!blogToDelete.user || blogToDelete.user.toString() !== decodedToken.id) {
    return response.status(403).json({ error: "user not authorized to delete this blog" })
  }

  await Blog.findByIdAndDelete(blogToDelete._id)
  await User.findByIdAndUpdate(decodedToken.id, { $pull: { blogs: blogToDelete._id } })

  response.status(204).end()
})

module.exports = blogRouter;
