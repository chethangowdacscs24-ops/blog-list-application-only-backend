const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})
describe('when there are initially some blogs saved', () => {
  

  test('blogs are returned as json and the correct amount is returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs').expect(200)
    
  })

  test('a valid blog can be added and increases the total count by one', async () => {
    const newBlog = {
      title: 'New blog entry',
      author: 'New Author',
      url: 'https://example.com/new',
      likes: 5,
    }

    await api.post('/api/blogs').send(newBlog).expect(201)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    
  })

  test('likes default to 0 when missing from request', async () => {
    const newBlog = {
      title: 'Blog without likes',
      author: 'Author Zero',
      url: 'https://example.com/nolikes',
    }

    const response = await api.post('/api/blogs').send(newBlog).expect(201)

  })

  test('blog without title or url is not added and returns 400', async () => {
    const missingTitle = {
      author: 'Missing Title',
      url: 'https://example.com/notitle',
      likes: 1,
    }

    const missingUrl = {
      title: 'Missing URL',
      author: 'Missing URL Author',
      likes: 1,
    }

    await api.post('/api/blogs').send(missingTitle).expect(400)
    await api.post('/api/blogs').send(missingUrl).expect(400)

  })
})
  after(async () => {
    await mongoose.connection.close()
  });
