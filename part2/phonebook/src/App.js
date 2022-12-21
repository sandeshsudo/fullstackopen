import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personsServices from './services/persons'
import Notification from './components/Notification'

function App() {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [search_key, setNewSearchKey] = useState('')
  const [search_result, setSearchResult] = useState(persons)
  const [errMessage, setErrorMessage] = useState(null)

  const fetchhook = () => {
    personsServices
      .getAll()
      .then(createdPerson => {
        setPersons(createdPerson)
        setSearchResult(createdPerson)
      })
  }

  useEffect(fetchhook, [])

  const handleChange = (e) => {
    newName.concat(setNewName(e.target.value))
    console.log("inside change", newName)
  }
  const handlePhoneChange = (e) => {
    newPhoneNumber.concat(setNewPhoneNumber(e.target.value))
  }

  const handleSearch = (e) => {
    search_key.concat(setNewSearchKey(e.target.value))
    if (search_key.length <= 1) {
      setSearchResult(persons)
    } else {
      setSearchResult(persons.filter((person) =>
        person.name.toLowerCase().includes(search_key.toLowerCase()) 
      ))
    }
  }

  const addPersons = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newPhoneNumber,
    }
    let person_already_exist = persons.some(person => person.name === newName)
    let person_to_update = persons.find(person => person.name === newName)

    if (person_already_exist){
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with new one ?`)){
        const updatePerson = {...person_to_update, number:newPhoneNumber}
        setNewName('')
        setNewPhoneNumber('')
        personsServices.update(person_to_update.id, updatePerson).then(returnedPerson => {
          setErrorMessage(`${person_to_update.name} number updated`)
          setTimeout(() => setErrorMessage(null), 5000)
          setPersons(persons.map(person => person.id !== person_to_update.id ? person : returnedPerson))
          setSearchResult(persons.map(person => person.id !== person_to_update.id ? person : returnedPerson))
        }).catch(error => {
            setErrorMessage(`Information on ${person_to_update.name} has already been removed from the server`)
            setTimeout(() => setErrorMessage(null), 5000)
          })
      }
    }else{
      personsServices.create(newPerson).then(returnedNote => {
        console.log('returned note', returnedNote)
        setNewName('')
        setNewPhoneNumber('')
        setErrorMessage(`${newPerson.name} added in the system`)
        setTimeout(() => setErrorMessage(null), 5000)
        setPersons(persons.concat(returnedNote))
        setSearchResult(persons.concat(returnedNote))
      })
    }
  }

  function delete_person(id) {
    const filtered_list_after_delete = persons.filter(item => item.id !== id)
    const person_to_delete = persons.filter(n => n.id === id)
    if (window.confirm(`Delete ${person_to_delete[0].name} ?`)){
      personsServices.remove(id).catch(error => {
        setErrorMessage(`Information on ${person_to_delete.name} has already been removed from the server`)
        setTimeout(() => setErrorMessage(null), 5000)
      })
      setSearchResult(filtered_list_after_delete)
      setPersons(filtered_list_after_delete)
    }

  }

  return (

    <div>
      <h2>Phonebook</h2>
      <Notification message={errMessage} />

      <Filter search_key={search_key} handleSearch={handleSearch} />

      <h3>Add a new</h3>
      <PersonForm values={[newName, newPhoneNumber]} actions={[handleChange, handlePhoneChange, addPersons]} />

      <h3>Numbers</h3>
      <Persons persons={search_result} onDelete={delete_person} />
    </div>
  );
}

export default App;
