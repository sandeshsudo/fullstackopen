const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')
const logger = require('../utils/logger')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        try{
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('password',10)
        const user = new User({ username:'root', passwordHash})
        await user.save()
        }catch(error){
            logger.error(error)
        }
    },100000)

    test('creation succeeds with a fresh username', async ()=>{
        const usersAtStart = await helper.userInDb()

        const newUser = {
            username: 'Niks',
            name: 'Nitesh Sethi',
            password: 'Nandy123',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            
        const usersAtEnd = await helper.userInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    },100000)
    
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.userInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('username must be unique')
    
        const usersAtEnd = await helper.userInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
      },100000)

      test('creation fails with proper statuscode and message if username or password length is less than 3 characters' , async () => {
        const usersAtStart = await helper.userInDb()
    
        const newUser = {
          username: 'ro',
          name: 'Superuser',
          password: 'sa',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('username and password must be atleast 3 characters long')
    
        const usersAtEnd = await helper.userInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
      },100000)
})

afterAll(() => {
    mongoose.connection.close()
})