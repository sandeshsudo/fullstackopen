// import logo from './logo.svg';
// import './App.css';
import { useState } from 'react'

const Anecdote = ({text, votes}) => {
  return(
    <>
    <p>{text}</p>
    <p>has {votes } votes</p>
    </>
  )
}

function App() {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length-1).fill(0))
  const higestVotesCount = Math.max(...votes)
  const maxVotesIndex = votes.indexOf(Math.max(...votes))  
  
  const setSelection = () => {
    setSelected(Math.round(Math.random() * 7))
    console.log("selected",selected)
  }

  const updateVotes = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={updateVotes}>vote</button>
      <button onClick={setSelection}>next anecdotes</button>
    
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[maxVotesIndex]} votes={higestVotesCount} />
    </div>
  );
}

export default App;
