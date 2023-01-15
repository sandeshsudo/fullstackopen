const blogRouter = require('express').Router()
// const { response } = require('../app')
const Blog = require("../models/Blog")
const User = require("../models/user")
const logger = require("../utils/logger")
const jwt = require("jsonwebtoken")
const middleware = require('../utils/middleware')

const getToken = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
    return null
}

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username:1,name:1})
    response.json(blogs)
    //Blog.find({}).then(res => response.json(res))
})
  
blogRouter.post('/', async (request, response, next) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id){
        return response.status(401).json({error:'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)
    
    //logger.info(`inside post ${user}`)
    //logger.info(`${user.name} is name of the user & id is ${user._id}`)
    // if(user._id.toString()){
    //     return response.status(401).json({error:'not authorised'})
    // }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    })

    try{
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog)
    }catch(error){
        next(error)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    const user = await User.findById(decodedToken.id)

    const blogToDelete = await Blog.findById(request.params.id)

    if ( blogToDelete.user._id.toString() === user._id.toString() ) {
        try {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
          } catch (exception) {
            next(exception)
          }
    } else {
        return response.status(401).json({ error: `Unauthorized` })
    }
})

blogRouter.put('/:id', async(request, response, next) =>{
    //const blogToUpdate = await Blog.findById(request.params.id)
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,blog, {new:true})
    response.json(updatedBlog)
})

module.exports = blogRouter