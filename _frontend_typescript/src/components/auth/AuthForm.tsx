import React, { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

interface props {
    type: "login" | "signup"
}
const AuthForm = ({ type }: props) => {
    const { signup, login, loading, error } = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [show, setShow] = useState(false);
    const fileref = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();


    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (type === "signup") {
            await signup({ name, email, password });
            navigate("/login")
        } else {
            const res = await login({ email, password })
            if (res) navigate('/dashboard')
        }
    }


    return (
        <>
            <form onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => { handleSubmit(e) }} className="h-screen w-full bg-[url('assets/bg.jpg')] bg-cover bg-center p-2 md:w-full">
                <div className="h-full w-full py-2">
                    <h1 className="text-center text-3xl font-bold text-green-800">
                        {type} Page
                    </h1>
                    <div className="mt-10 flex h-full flex-col items-center">
                        <form className="flex w-[90%] flex-col md:w-[50%]">
                            {type === "signup" && (
                                <div className="mb-5 w-full rounded-md border border-black bg-none">
                                    <input
                                        required
                                        type="text"
                                        placeholder="Username"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="h-full w-full rounded-md bg-transparent p-2 text-white outline-none"
                                    />
                                </div>
                            )}

                            <div className="mb-5 w-full rounded-md border border-black bg-none">
                                <input
                                    required
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-full w-full rounded-md bg-transparent p-2 text-white outline-none"
                                />
                            </div>

                            <div className="relative mb-5 w-full rounded-md border border-black bg-none">
                                <input
                                    required
                                    type={!show ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={
                                        type === "signup" ? "Create password" : "Enter Password"
                                    }
                                    className="h-full w-full rounded-md bg-transparent p-2 text-white outline-none"
                                />
                                <span
                                    className="absolute right-2 top-2 cursor-pointer"
                                    onClick={() => setShow(!show)}
                                >
                                    {show ? (
                                        <i className="fa-solid fa-eye" />
                                    ) : (
                                        <i className="fa-solid fa-eye-slash" />
                                    )}
                                </span>
                            </div>

                            {type === "signup" && (
                                <div className="mb-5 w-full rounded-md border border-black bg-none">
                                    <input
                                        required
                                        type={!show ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm password"
                                        className="h-full w-full rounded-md bg-transparent p-2 text-white outline-none"
                                    />
                                    <i className="bx bx-hide eye-icon" />
                                </div>
                            )}

                            {type === "signup" && (
                                <div className="mb-5 w-full rounded-md border border-black bg-none">
                                    <input
                                        required
                                        ref={fileref}
                                        type="file"
                                        accept="image/*"
                                        placeholder="Profile Pic"
                                        onChange={(e) => {
                                            // postDetails(e.target.files?.[0]);
                                        }}
                                        className="h-full w-full rounded-md bg-transparent p-2 text-white outline-none"
                                    />
                                    <i className="bx bx-hide eye-icon" />
                                </div>
                            )}

                            <div className="w-full bg-none py-2 text-center">
                                {loading ? (
                                    <h1>Please wait...</h1>
                                ) : (
                                    <button
                                        type="submit"
                                        className="rounded-md border bg-green-700 px-2 py-1 text-white hover:bg-green-600"
                                    >
                                        {type}
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="mt-10 text-lg font-bold text-green-500 transition-all duration-300 hover:text-white">
                            {/* <span>
                                <Link to={goto} className="underline underline-offset-2">
                                    {goToMessage}
                                </Link>
                            </span> */}
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AuthForm;