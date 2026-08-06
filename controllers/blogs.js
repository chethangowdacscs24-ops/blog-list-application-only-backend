const Blog = require('../models/blog')
const blogRouter = require('express').Router()
blogRouter.get('/',(request, response)=>{
    Blog.find({}).then((result)=>{
        response.json(result);
    }).catch((error)=>{
        next(error);
    })
    
})
blogRouter.post('/',(request, response)=>{
    const body = request.body
    if(!body || !body.title){
       return response.status(400).json({error : "title is missing"})
    }
    const blog = new Blog({
        title: body.title ,
        author: body.author ,
        url : body.url ,
        likes : body.likes ,
    })
    blog.save().then((savedblog)=>{
        response.status(201).json(savedblog);
    }).catch((error)=>{
        next(error)
    })
    ;
})
module.exports = blogRouter