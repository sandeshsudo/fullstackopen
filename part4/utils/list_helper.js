const { listIndexes } = require("../models/Blog")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.filter(blog => blog.likes >= Math.max(...blogs.map(blog => blog.likes)))[0]
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}