import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments:[],
}
const commentSlice = createSlice({
    name:"comment",
    initialState:initialState,
    reducers:{
        setCommentsAdmin:(state,action)=>{
            state.comments = action.payload
        },
        deleteCommentAdminSL :(state,action)=>{
            state.comments = state.comments.filter(comment=> comment.id !== action.payload)
        }
    }
})

export const {setCommentsAdmin,deleteCommentAdminSL} = commentSlice.actions

export default commentSlice