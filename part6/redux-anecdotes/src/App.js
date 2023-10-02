import AnecdoteForm from './components/AnecdoteForm'
import { AnecdoteList } from './components/AnecdoteList'
import { Notification } from './components/Notification'
import Filter from './components/Filter'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initialiseAnecdotes, setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdoteService'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    //anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
    dispatch(initialiseAnecdotes())
  },[])


  
  return (
    <div>
      <Filter />
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App