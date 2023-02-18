/*global process */
const mongoose = require('mongoose')

if (process.argv.length < 3){
  console.log(
    'USAGE: node mongo.js <password> <name> <number>\nor\nUSAGE: node mongo.js <password>'
  )
  process.exit(1)
}
console.log('Started')
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
console.log(password, name, number, process.env.PASSWORD)

const url = `mongodb+srv://highpingwarrior:${password}@cluster0.fvnb6ns.mongodb.net/phonebookApp?retryWrites=true&w=majority`
mongoose.set('strictQuery', true)
mongoose.connect(url).catch(() => console.log('Error'))
const personSchema = new mongoose.Schema({
  name : String,
  number : Number
})

const Person = mongoose.model('Person', personSchema)

if (name === undefined && number === undefined){
  Person.find({}).then(result => {
    result.forEach((person) => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
else {

  const person = new Person({
    name : name,
    number : number
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
