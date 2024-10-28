import { useNavigate } from "react-router-dom";
import { account } from "../../appwriteConfig";
import React, { useState } from "react";
import "./Login-style.css"; // Link to your CSS file
import BottomSection from "../BottomSection/BottomSection";

const App = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });
    const [isLogin, setIsLogin] = useState(true);

    const navigate = useNavigate();

    const [showLogin, setShowLogin] = useState(true);

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleSignupClick = () => {
        setShowLogin(false);
    };

    // Handle input changes for all fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await account.createEmailPasswordSession(
                formData.email,
                formData.password
            );
            navigate("/books");
        } catch (error) {
            console.error("Login failed:", error.message);
            alert("Login failed: " + error.message); // Display error message to the user
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await account.create(
                formData.name,
                formData.email,
                formData.password
            );
            await handleLogin(e); // Automatically login after registration
        } catch (error) {
            console.error("Registration failed:", error.message);
            alert("Registration failed: " + error.message); // Display error message to the user
        }
    };

    // State to manage login/register toggle

    // Function to toggle forms
    const toggleForms = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div>
            <div className={`wrapper ${!isLogin ? "active" : ""}`}>
                <span className="rotate-bg"></span>
                <span className="rotate-bg2"></span>

                {/* Login Form */}
                <div className={`form-box login ${!isLogin ? "hide" : ""}`}>
                    <h2
                        className="title animation"
                        style={{ "--i": 0, "--j": 21 }}
                    >
                        Login
                    </h2>
                    <form action="#" onSubmit={handleLogin}>
                        <div
                            className="input-box animation"
                            style={{ "--i": 1, "--j": 22 }}
                        >
                            <input
                                type=""
                                // placeholder="Email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <label htmlFor="">Email</label>
                            <i className="bx bxs-envelope"></i>
                        </div>

                        <div
                            className="input-box animation"
                            style={{ "--i": 2, "--j": 23 }}
                        >
                            <input
                                type="password"
                                // placeholder="Password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <label htmlFor="">Password</label>
                            <i className="bx bxs-lock-alt"></i>
                        </div>

                        <button
                            type="submit"
                            className="btn animation"
                            style={{ "--i": 3, "--j": 24 }}
                        >
                            Login
                        </button>
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

                {/* Info Text for Login */}
                <div className={`info-text login ${!isLogin ? "hide" : ""}`}>
                    <h2 className="animation" style={{ "--i": 0, "--j": 20 }}>
                        Welcome Back!
                    </h2>
                    <p className="animation" style={{ "--i": 1, "--j": 21 }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Deleniti, rem?
                    </p>
                </div>

                {/* Register Form */}
                <div className={`form-box register ${isLogin ? "hide" : ""}`}>
                    <h2
                        className="title animation"
                        style={{ "--i": 17, "--j": 0 }}
                    >
                        Sign Up
                    </h2>
                    <form action="#" onSubmit={handleRegister}>
                        <div
                            className="input-box animation"
                            style={{ "--i": 18, "--j": 1 }}
                        >
                            <input
                                type="text"
                                // placeholder="Name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <label htmlFor="">Username</label>
                            <i className="bx bxs-user"></i>
                        </div>

                        <div
                            className="input-box animation"
                            style={{ "--i": 19, "--j": 2 }}
                        >
                            <input
                                type="email"
                                // placeholder="Email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <label htmlFor="">Email</label>
                            <i className="bx bxs-envelope"></i>
                        </div>

                        <div
                            className="input-box animation"
                            style={{ "--i": 20, "--j": 3 }}
                        >
                            <input
                                type="password"
                                // placeholder="Password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <label htmlFor="">Password</label>
                            <i className="bx bxs-lock-alt"></i>
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

                {/* Info Text for Register */}
                <div className={`info-text register ${isLogin ? "hide" : ""}`}>
                    <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>
                        Welcome Friend!
                    </h2>
                    <p className="animation" style={{ "--i": 18, "--j": 1 }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Deleniti, rem?
                    </p>
                </div>
            </div>
            <div>
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
                                    <label htmlFor="password">Password</label>
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
            <BottomSection />
        </div>
    );
};

export default App;
