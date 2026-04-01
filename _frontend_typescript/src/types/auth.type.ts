export interface SignupPayload {
    name : string
    email : string
    password : string
    pic: string
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