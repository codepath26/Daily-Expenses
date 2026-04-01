import axios from "axios"
import type {LoginPayload , SignupPayload} from "../types/auth.type"


const API = import.meta.env.REACT_APP_BACKEND_URL as string;

export const signupUser = async( userData : SignupPayload) =>  {
   const response = await axios.post(`${API}/signup` , userData);
   return response.data;
}

export const loginUser = async(userData : LoginPayload) =>  {
    const response = await axios.post(`${API}/login` , userData);
    return response;
}