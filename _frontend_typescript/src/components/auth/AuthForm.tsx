import React, { useContext } from "react";
import type { FormPropsTypes } from "../../types/auth.type";
import { UserContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";



const AuthForm = ({ type }: FormPropsTypes) => {
    const context = useContext(UserContext);
    if (!context) throw new Error("UserContext must be used inside the AuthProvider.")

    const { handleSubmit, loading, error, validationAlert, uploadImage, profilePic, name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, fileRef } = context;
    const navigate = useNavigate()



    const formSubmissionHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        if (type === "signup") {
            const formData = { name, email, password, confirmPassword, profilePic }
            const res = await handleSubmit({ e, type, formData })
            if (res) navigate("/login")
        } else {
            const formData = { email, password };
            const res = await handleSubmit({ e, type, formData });
            if (res) navigate("/dashboard")
        }
    }

    return (
        <div className="min-h-screen bg-[#D8B4BC] flex items-center justify-center">
            <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-gray-200">

                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    {type === "signup" ? "Create Account" : "Login"}
                </h2>
                <p className="bg-red-600 text-center  my-2 text-white rounded-lg">
                    {validationAlert}
                </p>

                <form onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => formSubmissionHandler(e)} className="space-y-4">

                    {type === "signup" && (
                        <input
                            required
                            type="text"
                            placeholder="Username"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                    )}

                    <input
                        required
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        required
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    />

                    {type === "signup" && (
                        <input
                            required
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                    )}

                    {type === "signup" && (
                        <label className="block w-full cursor-pointer border border-gray-300 rounded-lg text-center py-2 hover:bg-gray-50">

                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => uploadImage(e)}
                                className="hidden"
                            />

                            {profilePic ? (
                                <div className="flex items-center justify-center">
                                    <img
                                        src={profilePic}
                                        alt="Profile"
                                        className="w-20 h-20 rounded-full object-cover border"
                                    />
                                </div>
                            ) : (
                                <span className="text-gray-500">Upload Profile Picture</span>
                            )}

                        </label>
                    )}

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading
                            ? "Processing..."
                            : type === "signup"
                                ? "Signup"
                                : "Login"}
                    </button>
                </form>
                <div className="text-black  mt-10 hover:text-green-500 text-lg  font-bold transition-all duration-300 text-center">
                    <span>
                        <Link to={type === "signup" ? "/login" : "/signup"} className="underline  underline-offset-2">
                            {type == "signup" ? "Already have an account? Login" : "Don't have an account? Signup"}
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;