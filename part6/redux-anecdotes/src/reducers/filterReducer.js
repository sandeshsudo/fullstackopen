import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name:'filter',
    initialState:'',
    reducers:{
        setFilter(state,action){
            return state = action.payload
        }
    }
})

export const {setFilter} = filterSlice.actions
export default filterSlice.reducer






// const filterReducer = (state=null,action) => {
//     switch(action.type){
//         case 'SET_FILTER': 
//             return action.filter
//         default:
//             return state
//     }

// }

// export const filterChange = (filter) => {
//     return {
//         type:'SET_FILTER',
//         filter,
//     }
// }

// export default filterReducer