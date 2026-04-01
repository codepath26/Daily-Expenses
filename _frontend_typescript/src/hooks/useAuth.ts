import { useState } from "react";
import type { LoginPayload, SignupPayload } from "../types/auth.type";
import { loginUser, signupUser } from "../api/authapi";

const useAuth = () => {   

    const [loading , setLoading]  = useState(false);
    const [error , setError] = useState<string | null>(null);

    const signup = async (data: SignupPayload) => {
        try {
            setLoading(true);
            setError(null);
            const res = await signupUser(data);
            return res;
        }catch(error : unknown){
            setLoading(false);
            setError("this")

        }finally{
            setLoading(false)
        }
    }


    const login = async (data : LoginPayload) => {
        try{
            setLoading(true)
            setError(null)
            const res = await loginUser(data);
            return res;
        }catch(error : unknown){
            setLoading(false);

        }finally{
            setLoading(false);
        }
    }


return {signup, login, loading,error}
}


export default useAuth;