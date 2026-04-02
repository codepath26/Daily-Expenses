import React, { createContext } from "react";
import type { LoginPayload, SignupPayload } from "../types/auth.type";

export interface User {
    _id: string
    name : string
    email : string
    password : string
    pic?:string
    isPremiumUser: boolean,
    totalExpenses: number,
    totalIncomes: number,
    createdAt: string,
    updatedAt: string,
    _v?:number
}

export interface AuthContextType {
    user : User | null;
    setUser : (user : User | null) => void
    handleSubmit : ({e, type ,formData}:  { e: React.SyntheticEvent<HTMLFormElement>, type: "signup" | "login", formData: SignupPayload | LoginPayload }) => void
    loading : boolean
    error : string | null
    validationAlert : string
    uploadImage  : (e : React.ChangeEvent<HTMLInputElement>) => void;
    profilePic : string | null


}
export const UserContext = createContext<AuthContextType | null>(null);