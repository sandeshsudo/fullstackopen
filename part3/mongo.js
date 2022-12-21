const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  //id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person',personSchema)

if(process.argv.length < 3){
  console.log('Please provide the password')
  process.exit(1)
}else if(process.argv.length === 3){
  //fetch objects
  const password = process.argv[2]
  const url = `mongodb+srv://Sandesh:${password}@cluster0.f8dua.mongodb.net/phoneBook?retryWrites=true&w=majority`

  mongoose.connect(url).then((result) => {
    console.log('connected and fetching data')

    Person.find({}).then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })
  })
}else{
  //create objects
  const password = process.argv[2]
  const name = process.argv[3]
  const number = process.argv[4]
  const url = `mongodb+srv://Sandesh:${password}@cluster0.f8dua.mongodb.net/phoneBook?retryWrites=true&w=majority`

  mongoose.connect(url).then((result) => {
    console.log('connected')

    const person = new Person({
      name: name,
      number:number,
    })
    return person.save()
  }).then(() => {
    console.log('Person saved')
    return mongoose.connection.close()
  }).catch((err) => console.log(err))

}




