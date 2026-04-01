export interface SignupPayload {
    name : string
    email : string
    password : string
    confirmPassword : string
    pic?: File | null
}

export interface LoginPayload {
    email : string
    password : string
}

export interface user {
    _id : string
    name : string
    email : string
    password : string
    pic? : string
    token : string
}
export interface FormPropsTypes {
    type: "login" | "signup";
}