import { useSelector, useDispatch } from "react-redux"
import { addVote, updateVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

export const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter,anecdotes}) => {
        if (filter == null) return anecdotes
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const vote = (anecdote) => {
        dispatch(setNotification(`You voted for ${anecdote.content}`, 5))
        dispatch(updateVote(anecdote))
      }

    return(
        anecdotes?.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
        ).sort((a,b) => a - b)
    )
}