const Blog = require("../models/blog");
const blogRouter = require("express").Router();
blogRouter.get("/", async (request, response) => {
  const result = await Blog.find({})
  response.json(result)
});
blogRouter.get("/:id", async (request, response) => {
   const post = await Blog.find({_id: request.params.id})
  if(!post){
   return response.json(result);
  }
  else{
   return response.status(400).json({error: "no such id post found"})
  }
  });
blogRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body || !body.title || !body.url) {
    return response.status(400).json({ error: "title or url is missing" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author ,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
  });
 const savedblog = await blog.save()
    response.status(201).json(savedblog);
});
blogRouter.delete("/:id", async (request, response) => {

   const savedblog= await Blog.findByIdAndDelete(request.params.id)
   if(!savedblog){
    return response.status(400).json({error: "no such id found to delete"})
   }
   response.status(202).end();
  });
module.exports = blogRouter;
