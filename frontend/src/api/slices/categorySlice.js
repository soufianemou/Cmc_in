import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories:[],
}
const categorySlice = createSlice({
    name:"category",
    initialState:initialState,
    reducers:{
        setCategories:(state,action)=>{
            state.categories = action.payload
        },
        addCategory:(state,action)=>{
            state.categories.push(action.payload) 
        },
        updateCategory:(state,action)=>{
            state.categories = state.categories.map(cat=>
                cat.id === action.payload.id ? action.payload : cat ) 
        },
        deleteCategory:(state,action) =>{
            state.categories = state.categories.filter(cat=> cat.id !== action.payload)
        }
    }
})

export const {setCategories,addCategory,updateCategory,deleteCategory} = categorySlice.actions

export default categorySlice