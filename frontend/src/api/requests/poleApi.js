import { toast } from "react-toastify"
import customAxios from "../axios"
import {setPoles,addPole,deletePole,updatePole} from '../slices/poleSlice'

//fetch all poles public
export const fetchPolespublic =()=>{
    return async (dispatch)=>{
        try{
            const {data} =  await customAxios.get("/poles")
            dispatch(setPoles(data.data))
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
}

//get all poles admin
export const getPoles = ()=>{
    return async (dispatch)=>{
        try{
            const {data} = await customAxios.get("/admin/poles")
            dispatch(setPoles(data.data))
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
}
//create pole admin
export const createPole = (newpole)=>{
    return async (dispatch)=>{
        try{
            const {data} = await customAxios.post("/admin/poles",newpole)
            dispatch(addPole(data.pole))
            toast.success(data.message);
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
}
//update pole admin
export const updatePoleSl = (idpole,newpole)=>{
    return async (dispatch)=>{
        try{
            const {data} = await customAxios.put(`/admin/poles/${idpole}`,newpole)
            dispatch(updatePole(data.pole))
            toast.success(data.message);
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
}
//delete pole admin
export const deletePoleSl = (idpole)=>{
    return async (dispatch)=>{
        try{
            const {data} = await customAxios.delete(`/admin/poles/${idpole}`)
            dispatch(deletePole(idpole))
            toast.success(data.message);
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
}

