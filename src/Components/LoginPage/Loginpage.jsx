import { useNavigate } from "react-router-dom";
import { account } from "../../appwriteConfig";
import React, { useState } from "react";
import "./Login-style.css";
import BottomSection from "../BottomSection/BottomSection";
import Loading from "./Loading";

const App = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });
    const [isLogin, setIsLogin] = useState(true);
    const [showLogin, setShowLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({ name: "", email: "", password: "" });

    const handleBlur = (e) => {
        const { name, value } = e.target;

        let error = "";
        if (name === "name" && !isValidUsername(value)) {
            error = "Username must be at least 3 characters.";
        } else if (name === "email" && !isValidEmail(value)) {
            error = "Use a valid Gmail address (@gmail.com).";
        } else if (name === "password" && !isValidPassword(value)) {
            error = "Password needs at least 8 characters";
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error as the user types
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleSignupClick = () => {
        setShowLogin(false);
    };
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!navigator.onLine) {
            alert(
                "You are not connected to the internet. Please check your connection."
            );
            return;
        }

        // Email validation check
        if (!isValidEmail(formData.email)) {
            alert(
                "Please enter a valid Gmail address (e.g., example@gmail.com)."
            );
            return; // Don't proceed if the email is invalid
        }

        setLoading(true);

        try {
            await account.createEmailPasswordSession(
                formData.email,
                formData.password
            );

            setTimeout(() => {
                navigate("/books"); // Navigate to books page
                setLoading(false);
                window.location.reload();
            }, 3000);
        } catch (error) {
            console.error("Login failed:", error.message);
            alert("Login failed: " + error.message);
            setLoading(false);
        }
    };


    const handleRegister = async (e) => {
        e.preventDefault();

        if (!navigator.onLine) {
            alert(
                "You are not connected to the internet. Please check your connection."
            );
            return;
        }

        // Email validation check before proceeding
        if (!isValidEmail(formData.email)) {
            alert(
                "Please enter a valid Gmail address (e.g., example@gmail.com)."
            );
            return; // Don't proceed with registration or save data
        }

        setLoading(true);
        setErrors({ name: "", email: "", password: "" });

        try {
            // Save user data to Appwrite only if email is valid
            await account.create(
                formData.name,
                formData.email,
                formData.password
            );
            handleLogin(e); // Proceed with login if registration is successful
        } catch (error) {
            console.error("Registration failed:", error.message);

            if (error.message.includes("email")) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "Email is already registered.",
                }));
            } else if (error.message.includes("password")) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    password: "Password validation failed.",
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    name: "An unknown error occurred.",
                }));
            }

            setLoading(false);
        }
    };

    const toggleForms = () => {
        setIsLogin(!isLogin);
        setShowPassword(false);
    };

    const isValidEmail = (email) => /^[^\s@]+@gmail\.com$/.test(email);

    const isValidPassword = (password) => {
        const passwordRegex = /^.{8,}$/; // Allows any characters, minimum 6 characters
        return passwordRegex.test(password);
    };

    const isValidUsername = (name) => name && name.length >= 3;


    const handleForgotPassword = async () => {
        if (!formData.email) {
            alert("Please enter your email address first.");
            return;
        }

        try {
            await account.createRecovery(
                formData.email,
                "http://localhost:3000/reset-password"
            );
            alert("Password recovery email sent. Please check your inbox.");
        } catch (error) {
            console.error("Password recovery failed:", error.message);
            alert("Password recovery failed: " + error.message);
        }
    };

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <div className="loginPage-mian">
                    <div className={`wrapper ${!isLogin ? "active" : ""}`}>
                        <span className="rotate-bg"></span>
                        <span className="rotate-bg2"></span>

                        <div
                            className={`form-box login ${
                                !isLogin ? "hide" : ""
                            }`}
                        >
                            <h2
                                className="title animation"
                                style={{ "--i": 0, "--j": 21 }}
                            >
                                Login
                            </h2>
                            <form onSubmit={handleLogin}>
                                <div
                                    className="input-box animation"
                                    style={{ "--i": 1, "--j": 22 }}
                                >
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <label>Email</label>
                                    <i className="bx bxs-envelope"></i>
                                </div>

                                <div
                                    className="input-box animation"
                                    style={{
                                        "--i": 2,
                                        "--j": 23,
                                        position: "relative",
                                    }}
                                >
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <label>Password</label>
                                    <i className="bx bxs-lock-alt"></i>
                                    <span
                                        className="show-password"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        style={{
                                            position: "absolute",
                                            right: "10px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {showPassword ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                class="bi bi-eye-fill"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                class="bi bi-eye-slash-fill"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                                            </svg>
                                        )}
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    className="btn animation"
                                    style={{ "--i": 3, "--j": 24 }}
                                >
                                    Login
                                </button>
                                <p>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleForgotPassword();
                                        }}
                                        className="forgot-password-link"
                                    >
                                        Forgot Password?
                                    </a>
                                </p>

                                <div
                                    className="linkTxt animation"
                                    style={{ "--i": 5, "--j": 25 }}
                                >
                                    <p>
                                        Don't have an account?
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleForms();
                                            }}
                                            className="register-link"
                                        >
                                            Sign Up
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                        <div
                            className={`info-text login ${
                                !isLogin ? "hide" : ""
                            }`}
                        >
                            <h2
                                className="animation"
                                style={{ "--i": 0, "--j": 20 }}
                            >
                                Welcome Back!
                            </h2>
                        </div>

                        {/* Register Form */}
                        <div
                            className={`form-box register ${
                                isLogin ? "hide" : ""
                            }`}
                        >
                            <h2
                                className="title animation"
                                style={{ "--i": 17, "--j": 0 }}
                            >
                                Sign Up
                            </h2>
                            <form onSubmit={handleRegister}>
                                <div
                                    className="input-box animation"
                                    style={{ "--i": 18, "--j": 1 }}
                                >
                                    <input
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <label>Username</label>
                                    <i className="bx bxs-user"></i>
                                    {errors.name && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontSize: "10px",
                                            }}
                                        >
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div
                                    className="input-box animation"
                                    style={{ "--i": 19, "--j": 2 }}
                                >
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <label>Email</label>
                                    <i className="bx bxs-envelope"></i>
                                    {errors.email && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontSize: "10px",
                                            }}
                                        >
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div
                                    className="input-box animation"
                                    style={{ "--i": 20, "--j": 3 }}
                                >
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <label>Password</label>
                                    <i className="bx bxs-lock-alt"></i>
                                    {errors.password && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontSize: "10px",
                                            }}
                                        >
                                            {errors.password}
                                        </p>
                                    )}
                                    <span
                                        className="show-password"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        style={{
                                            position: "absolute",
                                            right: "10px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {showPassword ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                class="bi bi-eye-fill"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                class="bi bi-eye-slash-fill"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                                            </svg>
                                        )}
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    className="btn animation"
                                    style={{ "--i": 21, "--j": 4 }}
                                >
                                    Sign Up
                                </button>

                                <div
                                    className="linkTxt animation"
                                    style={{ "--i": 22, "--j": 5 }}
                                >
                                    <p>
                                        Already have an account?
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleForms();
                                            }}
                                            className="login-link"
                                        >
                                            Login
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>

                        <div
                            className={`info-text register ${
                                isLogin ? "hide" : ""
                            }`}
                        >
                            <h2
                                className="animation"
                                style={{ "--i": 17, "--j": 0 }}
                            >
                                Welcome Friend!
                            </h2>
                        </div>
                    </div>
                    <div>
                        <div className="Logincontainer">
                            <div className="logincontainer-content">
                                <form
                                    className="loginform"
                                    onSubmit={
                                        showLogin ? handleLogin : handleRegister
                                    }
                                >
                                    <div className="logindescr">
                                        {showLogin ? "Login" : "SignUp"}
                                    </div>

                                    {/* Show username field only for sign-up */}
                                    {!showLogin && (
                                        <div className="logininput">
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="Username">
                                                Username
                                            </label>
                                        </div>
                                    )}

                                    <div className="logininput">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="email">Email</label>
                                    </div>

                                    <div className="logininput">
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                    </div>

                                    <div className="button">
                                        <button type="submit">
                                            {showLogin ? "Login" : "Sign Up"}
                                        </button>
                                    </div>

                                    <p className="link">
                                        {showLogin ? (
                                            <>
                                                Don't have an account?
                                                <a onClick={handleSignupClick}>
                                                    Sign up
                                                </a>
                                            </>
                                        ) : (
                                            <>
                                                Already have an account?
                                                <a onClick={handleLoginClick}>
                                                    Login
                                                </a>
                                            </>
                                        )}
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <BottomSection />
        </div>
    );
};

export default App;
