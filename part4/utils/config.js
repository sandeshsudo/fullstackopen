require('dotenv').config()

const PORT = process.env.PORT
const MONGODBURI = process.env.MONGODBURI

module.exports = { PORT, MONGODBURI }