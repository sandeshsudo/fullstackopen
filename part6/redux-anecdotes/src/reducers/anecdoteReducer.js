import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState:[],
  reducers:{
    createAnecdote(state,action){
      const content = action.payload
      state.push(content)
    },
    addVote(state,action){
      const id = action.payload
      const anecdotesToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdotesToChange,
        votes: anecdotesToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote).sort((a,b) => a.votes - b.votes)
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  }
})

export const {createAnecdote, addVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export default anecdoteSlice.reducer

