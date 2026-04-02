import { useState, type ReactNode } from "react";
import { UserContext, type User } from "./AuthContext";
import type { LoginPayload, SignupPayload } from "../types/auth.type";
import { loginUser, signupUser } from "../api/authapi";

import axios from "axios";

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




    const signup = async (data: SignupPayload) => {
        try {
            setLoading(true);
            setError(null);
            const res = await signupUser(data);
            const userData = res.user;
            setUser(userData);
        } catch (error: unknown) {

            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Something went wrong");
            }

        } finally {
            setLoading(false);
        }
    };

    const login = async (data: LoginPayload) => {
        try {
            setLoading(true)
            setError(null)
            const res = await loginUser(data);
            return res;
        } catch (error: unknown) {
            setLoading(false);

        } finally {
            setLoading(false);
        }
    }

    const blankAlert = () => {
        setTimeout(() => {
            setValidationAlert("");
        }, 2000);
    }

    const handleSubmit = async ({ e, type, formData }: { e: React.SyntheticEvent<HTMLFormElement>, type: "signup" | "login", formData: SignupPayload | LoginPayload }) => {
        e.preventDefault();

        if (type === "signup") {
            const userData = { ...formData, pic: profilePic } as SignupPayload;
            const { password, confirmPassword } = userData
            if (password !== confirmPassword) {
                setValidationAlert("Please Check The Password");
                blankAlert();
                return;
            }
            await signup(userData);
        } else {
            const userData = formData as LoginPayload;
                await login(userData);
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

        } catch (error: unknown) {

            if (axios.isAxiosError(error)) {
                console.error("Axios Error:", error.response?.data || error.message);
            } else if (error instanceof Error) {
                console.error("Error:", error.message);
            } else {
                console.error("Unexpected Error:", error);
            }

            return null;
        }
    };


    return <UserContext.Provider value={{ user, setUser, handleSubmit, loading, error, validationAlert, uploadImage, profilePic }}>
        {children}
    </UserContext.Provider>

}

export default AuthProvider;