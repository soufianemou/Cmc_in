import axios from "axios";
import Cookies from "js-cookie";
const customAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api',
    withCredentials:true
})

customAxios.interceptors.request.use((config)=>{
    const token = Cookies.get('ACCESS_TOKEN')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


export default customAxios