//service to get data from server, in this case db.json- local server

import axios from 'axios'

//base url to fetch data from
const baseUrl = 'http://localhost:3001/anecdotes'

//get all data
const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

//send data to beckend, create new anecdote
const createNew = async (content) => {
    const object = {content, votes:0}
    const response = await axios.post(baseUrl, object)
    return response.data
}

export default { getAll, createNew }