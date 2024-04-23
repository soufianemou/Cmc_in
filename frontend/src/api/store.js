import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import postSlice from "./slices/postSlice";
import profileSlice from "./slices/profileSlice";
import commentSlice from "./slices/commentSlice";
import adminSlice from "./slices/adminSlice";
import poleSlice from "./slices/poleSlice";


export const store = configureStore({
    reducer :{
        auth:authSlice.reducer, 
        pole:poleSlice.reducer,
        post:postSlice.reducer,
        profile:profileSlice.reducer,
        comment:commentSlice.reducer,
        admin:adminSlice.reducer
    }
})