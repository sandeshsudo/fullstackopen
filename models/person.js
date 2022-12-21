const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.log('error connected to DB', err.message)
  })



const personSchema = new mongoose.Schema({
  //id: Number,
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports =  mongoose.model('Person', personSchema)

