const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')


const mongoUrl = config.MONGODB_URI  
mongoose.connect(mongoUrl).then(()=>logger.info("connected to DB..")).catch(err => logger.error('error connecting db: ',err.message))
//mongoose.connect(db='bloglist', username='Sandesh', password='Sandesh', host=`${mongoUrl}`).then(()=>logger.info("connected to DB..")).catch(err => logger.error('error connecting db: ',err.message))
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

if(process.env.NODE_ENV === 'test'){
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)

module.exports = app
