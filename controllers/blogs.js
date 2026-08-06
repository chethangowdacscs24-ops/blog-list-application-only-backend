
const blogRouter = require('express').Router()
blogRouter.get('/',(request, response)=>{
    response.send("main logic working");
})
module.exports = blogRouter