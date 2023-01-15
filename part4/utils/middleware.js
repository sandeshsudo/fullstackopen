const logger = require('./logger')
const User = require("../models/user")
const jwt = require('jsonwebtoken')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message 
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if(error.name === 'TokenExpiredError'){
    return response.status(401).json({
        error: 'token expired'
    })
  } 
  logger.error(error.message)
  next(error)
}

const tokenExtractor = (request,response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        request["token"] = authorization.substring(7)
    }
    next()
}

//for later taking too much time
const userExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        const token = authorization.substring(7)
        const decodedtoken = jwt.verify(token, process.env.SECRET)
        logger.info(`decoded token: ${decodedtoken.id}`)
        if(!decodedtoken.id){
            return response.status(401).json({
                error: 'token expired'
            })
        }else{
            User.findById(decodedtoken.id).then((user) =>{
                logger.info(`inside else UE: ${user}, name is ${user.name}`)
                request.user = user
            })
        }
    }
    next()
}

module.exports = {errorHandler, tokenExtractor, userExtractor}