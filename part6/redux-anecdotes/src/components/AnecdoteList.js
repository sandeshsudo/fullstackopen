import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

export const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter,anecdotes}) => {
        if (filter == null) return anecdotes
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const vote = (id) => {
        dispatch(setNotification(`You voted for ${id}`, 5))
        dispatch(addVote(id))
      }

    return(
        anecdotes?.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
        ).sort((a,b) => a - b)
    )
}