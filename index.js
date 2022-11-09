const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

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

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request,response) => {
    response.json(persons)
    morgan(':method :url :status :res[content-length] - :response-time ms')
})

app.get('/info', (request,response) => {
    let num = persons.length
    let dtOfRequest = new Date( Date.now())
    response.send(
        "<p>Phonebook has info for " 
        + num + " people</p><p>" + dtOfRequest + "</p>"
    )
})

app.get('/api/persons/:id',(request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    person ? response.json(person) : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request,response) =>{

    const body = request.body

    if(!body.name){
        return response.status(400).json({
            error: 'name is missing'
        })
    }else if(!body.number){
        return response.status(400).json({
            error: 'number missing'
        })
    }else if(persons.find(n => n.name === body.name)){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id:generateId(),
        name:body.name,
        number:body.number
    }

    persons.concat(person)
    response.json(person)

    
   
})


const generateId = () => Math.floor(Math.random()*299)


const PORT = process.env.PORT || 3002

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))