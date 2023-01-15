const bcrypt = require('bcrypt')
//const { response } = require('../app')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async(request, response) => {
    const {username, name, password} = request.body

    //checking unique validation using custom code later will check with mongoose-unique-validator plugin
    const existingUser = await User.findOne({username})
    if(existingUser){
        return response.status(400).json({
            error:'username must be unique'
        })
    }

    if(username === null){
        return response.status(400).json({
            error:'username and password cannot be left blank'
        })
    }

    if(String(username).length <= 3 || String(password).length <= 3){
        return response.status(400).json({
            error:'username and password must be atleast 3 characters long'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,  
    })

    const savedUser = await user.save()
    response.status(200).json(savedUser)

})

userRouter.get('/', async(request,response) => {
    const users = await User.find({}).populate('blogs',{title:1,author:1})
    response.status(200).json(users)
})

module.exports = userRouter