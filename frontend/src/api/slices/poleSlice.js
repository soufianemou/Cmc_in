import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    poles:[],
}
const poleSlice = createSlice({
    name:"pole",
    initialState:initialState,
    reducers:{
        setPoles:(state,action)=>{
            state.poles = action.payload
        },
        addPole:(state,action)=>{
            state.poles.push(action.payload) 
        },
        updatePole:(state,action)=>{
            state.poles = state.poles.map(pole=>
                pole.id === action.payload.id ? action.payload : pole ) 
        },
        deletePole:(state,action) =>{
            state.poles = state.poles.filter(pole=> pole.id !== action.payload)
        }
    }
})

export const {setPoles,addPole,updatePole,deletePole} = poleSlice.actions

export default poleSlice