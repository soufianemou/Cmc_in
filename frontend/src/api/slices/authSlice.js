import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    user: null,
    role:null,
    token: Cookies.get('ACCESS_TOKEN') || null,
}
const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        login:(state,action)=>{
            state.user = action.payload
        },
        setToken:(state,action)=>{
            state.token = action.payload
        },
        setRole:(state,action)=>{
            state.role = action.payload
        },
        logout:(state)=>{
            state.user = null
            state.token = null
            state.role = null
        },
        setUserinfoAfterupdate :(state,action)=>{
            state.user = action.payload
        },
        setUserPhoto:(state,action)=>{
            state.user.image = action.payload
        },
    }
})

export const {login,register,logout,setToken,setRole,setUserinfoAfterupdate,setUserPhoto} = authSlice.actions

export default authSlice