import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile:null,
    loading:false,
    usersCount:null,
    profiles:[]
}
const profileSlice = createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setProfile:(state,action)=>{
            state.profile = action.payload
        },
        setPhotoProfile:(state,action)=>{
            state.profile.image = action.payload
        },
        updateProfileSlice:(state,action)=>{
            state.profile = action.payload
        },
        setNewPhotoProfile:(state,action)=>{
            state.profile.image = action.payload
        },
        setLoading(state){
            state.loading = true
        },
        clearLoading(state){
            state.loading = false
        },
        setUserCount:(state,action)=>{
            state.usersCount = action.payload
        },
        setProfiles:(state,action)=>{
            state.profiles = action.payload 
        },
        deleteFromProfiles:(state,action)=>{
            state.profiles = state.profiles.filter(profile=>profile.id !== action.payload)
        }
    }
})

export const {setProfile,setNewPhotoProfile,setPhotoProfile,updateProfileSlice,deleteFromProfiles,setLoading,clearLoading,setUserCount,setProfiles} = profileSlice.actions

export default profileSlice