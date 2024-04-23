import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users:[],
    admins:[]
}
const adminSlice = createSlice({
    name:"admin",
    initialState:initialState,
    reducers:{
        setAdmins:(state,action)=>{
            state.admins = action.payload 
        },
        addAdmins:(state,action)=>{
            state.admins.push(action.payload)
        },
        setUsers:(state,action)=>{
            state.users = action.payload
        },
        deleteFromAdmins:(state,action)=>{
            state.admins = state.admins.filter(admin=>admin.id !== action.payload)
        },
        deletFromUsers:(state,action)=>{
            state.users = state.users.filter(user=>user.id !== action.payload)
        }
    }
})

export const {setAdmins,setUsers,addAdmins,deleteFromAdmins,deletFromUsers} = adminSlice.actions

export default adminSlice