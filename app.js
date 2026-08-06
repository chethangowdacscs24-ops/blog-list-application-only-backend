const express = require('express')
const mongoose = require('mongoose')
const config= require('./utils/config')
const Blog = require('./models/blog')
const blogRouter = require('./controllers/blogs')
const app = express();
const Middleware = require('./utils/middleware')
app.use(express.json())
app.use(Middleware.requestLogger)
console.log("connecting to db....")
mongoose.connect(config.MONGODB_URI,{family : 4}).then((result)=>{
    console.log("connected to db")
}).catch((error)=>{
    console.log(" oops..!! connection unsucccefull to DB")
})

app.use('/api/blogs',blogRouter)
app.use(Middleware.errorHandler)

app.use(Middleware.unknownEndpoint)

module.exports =app;