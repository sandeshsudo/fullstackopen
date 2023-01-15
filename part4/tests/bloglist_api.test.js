const mongoose = require('mongoose')
const supertest = require('supertest')
const { response } = require('../app')
const app = require('../app')
const Blog = require('../models/Blog')
const api = supertest(app)
const helper = require('./test_helper')
const logger = require('../utils/logger')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
}, 100000)

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})  

test('first blog is', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].title).toBe('First Test Blog')
})  

test('a valid blog can be added', async() => {
  const newBlog = {
      title: "Additional Blog",
      author: "Sandesh",
      url: "http://localhost:3003/additonal_blog",
      likes: 2      
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs/')
    
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
}, 100000)

test('The unique identifier property is defined by default _id', async()=>{
  const blog = await Blog.find({})
  expect(blog[0].id).toBeDefined()
})

test('Likes property is missing set to default 0', async() => {
  const newBlog = {
    title: "without likes",
    author: "Sandesh",
    url: "http://localhost:3003/additonal_blog",
    
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
     
    const blogs = await helper.blogInDb()
    const last_blog = await blogs.find(blog => blog.title === 'without likes')
    expect(last_blog.likes).toBe(0)
})

test('If title and url are missing, respond with 400 bad request', async () => {
  const newBlog = {
    author:"Edsger",
    likes:7
  }

  await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)      
})

test('Update likes in blog', async() => {
  const blogToUpdate = {
    title: "Update this",
    author: "Sandesh",
    url: "http://localhost:3003/deletable_blog",
    id:55,
    likes:1,
  }

  await api
    .post('/api/blogs')
    .send(blogToUpdate)
    .expect(201)
    .expect('Content-Type', /application\/json/)
     
    const blogs = await helper.blogInDb()
    const toUpdate = await blogs.find(blog => blog.title === "Update this")


    const updateWithLike = {
      ...toUpdate,
      likes: 2,
    }

  await api
    .put(`/api/blogs/${toUpdate.id}`)
    .send(updateWithLike)
    .expect(200)
    .expect('Content-type', /application\/json/)
  
    const blogss = await helper.blogInDb()
    const checkUpdated = await blogss.find(blog => blog.title === "Update this")
    logger.info('check likes: ',checkUpdated.likes)
    expect(checkUpdated.likes).toBe(2) 

})

test('Delete a blog', async() =>{
  const blogToDelete = {
    title: "Delete this",
    author: "Sandesh",
    url: "http://localhost:3003/deletable_blog",
    id:33
  }

  await api
    .post('/api/blogs')
    .send(blogToDelete)
    .expect(201)
    //.expect('Content-Type', /application\/json/)
     

  const blogs = await helper.blogInDb()
  const last_blog = await blogs.find(blog => blog.title === "Delete this")

  await api
    .delete(`/api/blogs/${last_blog.id}`)
    .expect(204)
},100000)

afterAll(() => {
  mongoose.connection.close()
})