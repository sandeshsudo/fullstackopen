const http = require('http')
const express = require('express')
const blogRouter = require('./controllers/blog')
const app = express()
//const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')

//app.use(cors())
app.use(express.json())

const mongoUrl = config.MONGODBURI  
mongoose.connect(mongoUrl).then(()=>logger.info("connected to DB..")).catch(err => logger.error(err))

app.use('/api', blogRouter)

const PORT = config.PORT

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})