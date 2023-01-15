const app = require('./app')
const http = require('http')
//const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

const PORT = config.PORT

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

