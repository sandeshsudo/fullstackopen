require('dotenv').config()
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const cors = require('cors')
const app = express()
const errorHandler = require('./middleware/errorHandler')



app.use(express.static('build'))
app.use(express.json())
app.use(cors())
//app.use(morgan('tiny'))
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))
// let persons = [
//     {
//       "id": 1,
//       "name": "Arto Hellas",
//       "number": "040-123456"
//     },
//     {
//       "id": 2,
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523"
//     },
//     {
//       "id": 3,
//       "name": "Dan Abramov",
//       "number": "12-43-234345"
//     },
//     {
//       "id": 4,
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122"
//     }
// ]

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)

  })
  //mongoose.connection.close()

  morgan(':method :url :status :res[content-length] - :response-time ms')
})

app.get('/info', (request, response) => {
  let num = persons.length
  let dtOfRequest = new Date(Date.now())
  response.send(
    '<p>Phonebook has info for '
        + num + ' people</p><p>' + dtOfRequest + '</p>'
  )
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(err => next(err))
})

app.post('/api/persons', (request, response, next) => {

  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number
  })
  if (!body.name) {
    return response.status(400).json({
      error: 'name is missing'
    })
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  } else if (Person.findOne({ 'name': body.name })) {
    Person.findByIdAndUpdate(request.params.id, person, { number: body.number })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  } else {
    person.save().then(saved => {
      response.json(saved)
      //response.send('person saved', saved)
    })
      .catch(error => {
        console.log(error.response.data.error)
        next(error)

      })
  }

})


app.use(errorHandler)
const generateId = () => Math.floor(Math.random() * 299)


const PORT = process.env.PORT || 3002

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))