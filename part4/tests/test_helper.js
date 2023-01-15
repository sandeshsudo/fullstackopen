const Blog = require('../models/Blog')
const User = require('../models/user')

const initialBlogs = [
    {
        "title": "First Test Blog",
        "author": "Sandesh",
        "url": "http://localhost:3003/first_blog",
        "likes": 5
        },
        {
        "title": "Second Blog",
        "author": "Sandesh",
        "url": "http://localhost:3003/second_blog",
        "likes": 4
        },
]

const blogInDb = async() => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const userInDb = async() => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, blogInDb, userInDb
}