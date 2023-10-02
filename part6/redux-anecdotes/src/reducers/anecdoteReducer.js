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
      const anecdotetoUpdate = action.payload
      return state.map(anecdote => anecdote.id !== anecdotetoUpdate.id ? anecdote : anecdotetoUpdate).sort((a,b) => a.votes - b.votes)
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  }
})

export const {addVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initialiseAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVote = content => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVote(content)
    dispatch(addVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer

