require('dotenv').config()

const PORT = process.env.PORT

//const MONGODB_URI = process.env.MONGODBURI

 const MONGODB_URI = process.env.NODE_ENV === 'test' 
     ? process.env.TEST_MONGODB_URI 
     : process.env.MONGODBURI

//const MONGODBURI = process.env.MONGODBURI

module.exports = { PORT, MONGODB_URI }