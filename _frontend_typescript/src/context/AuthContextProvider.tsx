import { useRef, useState, type ReactNode } from "react";
import { UserContext, type User } from "./AuthContext";
import type { LoginPayload, SignupPayload } from "../types/auth.type";

import axios, { isAxiosError } from "axios";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

interface ChildrenTypes {
    children: ReactNode
}

export interface AuthResponse {
    success: boolean;
    message: string;
    user?: User;
    token?: string;
}
const AuthProvider = ({ children }: ChildrenTypes) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [validationAlert, setValidationAlert] = useState("");
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);
    const API = import.meta.env.VITE_API_URL as string;



    const signup = async (data: SignupPayload) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post(`${API}/signup`, data);
            const res = response.data;
            const userData = res?.user;
            setUser(userData);
            return true;
        } catch (error: unknown) {

            if (error instanceof Error) {
                setValidationAlert(error.message)
                return false;
            } else {
                setValidationAlert("Something went wrong");
                return false;
            }

        } finally {
            setLoading(false);
        }
    };

    const login = async (data: LoginPayload) => {
        try {
            debugger
            setLoading(true)
            setValidationAlert("");
            const res = await axios.post(`${API}/login`, data);
            debugger
            if(res.status === 200 && res.data.token){
                const token = res.data.token; 
                localStorage.setItem("UserAuthenticationToken",token);
            }
            return res.data.token ? true : false;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message || "Server error occurred";
                setValidationAlert(message)
            }
           else if (error instanceof Error) {
                setValidationAlert(error.message)
                return false;
            } else {
                setValidationAlert("Something went wrong");
                return false;
            }

        } finally {
            setLoading(false);
        }
    }

    const blankAlert = () => {
        setTimeout(() => {
            setValidationAlert("");
        }, 2000);
    }

    const handleSubmit = async ({ e, type, formData }: { e: React.SyntheticEvent<HTMLFormElement>, type: "signup" | "login", formData: SignupPayload | LoginPayload }): Promise<boolean> => {
        e.preventDefault();

        if (type === "signup") {
            const userData = { ...formData, pic: profilePic } as SignupPayload;
            const { name, email, password, confirmPassword, pic } = userData

            if (!(/^[a-zA-Z0-9_]{3,30}$/.test(name))) {
                setValidationAlert("Username must be 3–30 characters and may contain letters, numbers, and underscores (_).")
                blankAlert();
                return false;
            }
            if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
                setValidationAlert("Enter valid email");
                blankAlert();
                return false;
            }
            if (password !== confirmPassword) {
                setValidationAlert("Password doesn't match");
                blankAlert();
                return false;
            }
            if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/.test(password))) {
                setValidationAlert("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.")
                blankAlert();
                return false;
            }
            const res = await signup(userData);
            return res ? true : false;
        } else {
            const userData = formData as LoginPayload;
            const res = await login(userData);
            console.log(res , "sfsjdf")
            return res ? true : false;
        }
    };

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            if (!ALLOWED_TYPES.includes(file.type)) {
                throw new Error("Only JPG and PNG images are allowed.");
            }
            
            if (file.size > MAX_FILE_SIZE) {
                throw new Error("Image should be smaller than 2MB.");
            }
            
            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "chat-app");

            const response = await axios.post(
                import.meta.env.VITE_CLOUDINARY_URL,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setProfilePic(response.data.secure_url);
            setLoading(false);

        } catch (error: unknown) {
            setLoading(false)
            if (axios.isAxiosError(error)) {
                setValidationAlert(error.response?.data || error.message);
            } else if (error instanceof Error) {
                console.error("Error:", error.message);
                setValidationAlert(error.message);
            } else {
                setValidationAlert("something went wrong.");
                console.error("Unexpected Error:", error);
            }

            return null;
        }finally{
            setLoading(false)
        }
    };


    return <UserContext.Provider value={{ user, setUser, handleSubmit, loading, error, validationAlert, uploadImage, profilePic, name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, fileRef }}>
        {children}
    </UserContext.Provider>

}

export default AuthProvider;