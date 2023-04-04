const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const { request, response } = require('express')
const logger = require('../utils/logger')

loginRouter.post('/', async (request, response) => {
    const {username, password} = request.body

    try{
    const user = await User.findOne({username})
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if(!(user && passwordCorrect)){
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }
    
    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60})

    response.status(200).send({token, user_id:user.id, username:user.username, name:user.name})
    }catch(exception){
        console.log(exception)
    }
    //logger.info("user logged in ", request.user.name)
})

module.exports = loginRouter