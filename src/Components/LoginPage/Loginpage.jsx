import React, { useEffect, useRef, useState } from "react";
import "./Login-style.css";
import BottomSection from "../BottomSection/BottomSection";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
// import Background from "../Background/Background";

function Loginpage() {
    // const [login, setLogin] = useState(true);
    const navigate = useNavigate();
    const { user, loginUser } = useAuth();
    const loginForm = useRef(null);
    const registerForm = useRef(null);

    useEffect(() => {
        if (user) {
            navigate("/books");
        }
    });

    const [isActive, setIsActive] = useState(true);
    // const [email, setEmail] = useState(""); // State to store the email

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = loginForm.current.email.value;
        const password = loginForm.current.password.value;

        const userInfo = { email, password };
        // loginUser(userInfo)
        loginUser(userInfo);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const name = registerForm.current.name.value;
        const email = registerForm.current.email.value;
        const password = registerForm.current.password.value;

        const userInfo = { name, email, password };
        registerUser(userInfo);
    };
    // const handleSubmit = (e, type) => {
    //     e.preventDefault();
    //     const enteredEmail = e.target.email.value;
    //     const enteredPassword = e.target.password.value;

    //     if (type === "signup") {
    //         createUserWithEmailAndPassword(
    //             database,
    //             enteredEmail,
    //             enteredPassword
    //         )
    //             .then((data) => {
    //                 // Store the email in state
    //                 alert("Successfully signed Up");
    //                 setEmail(enteredEmail);

    //                 // Navigate to the sign-in page
    //                 setLogin(true);
    //                 setIsActive(false);
    //             })
    //             .catch((err) => {
    //                 if (err.code === "auth/email-already-in-use") {
    //                     // Redirect to login page if email is already in use
    //                     setLogin(true);
    //                     setIsActive(false);
    //                 } else {
    //                     alert(err.code);
    //                 }
    //             });
    //     } else {
    //         signInWithEmailAndPassword(database, enteredEmail, enteredPassword)
    //             .then((data) => {
    //                 // Navigate to the books component
    //                 history("/books");
    //                 console.log(data, "authData");
    //             })
    //             .catch((err) => {
    //                 alert(err.code);
    //             });
    //     }
    // };

    const SignUp = (e) => {
        e.preventDefault();
    };

    const SignIn = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <div className="main-login-cont">
                <div
                    className={`container ${isActive ? "active" : ""}`}
                    id="container"
                >
                    <div className="form-container sign-up">
                        <form
                            // onSubmit={(e) => {
                            //     handleSubmit(e, login ? "signin" : "signup");
                            // }}
                            ref={registerForm}
                            onSubmit={handleRegisterSubmit}
                        >
                            <h1>Create Account</h1>
                            <span> use your email for registration</span>
                            <input type="text" placeholder="Name" name="name" />
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                            />
                            <button>Sign Up</button>
                        </form>
                    </div>

                    <div className="form-container sign-in">
                        <form
                            // onSubmit={(e) => {
                            //     handleSubmit(e);
                            // }}
                            ref={loginForm}
                            onSubmit={handleSubmit}
                        >
                            <h1>Sign In</h1>
                            <span> use your email password</span>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                // value={email} // Use the stored email in the input field
                                // onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                            />
                            <a href="#">Forget Your Password?</a>
                            <button>Sign In</button>
                        </form>
                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div
                                className={`toggle-panel toggle-left ${
                                    !isActive ? "active" : ""
                                }`}
                            >
                                <h1>Welcome Back!</h1>
                                <p>
                                    Enter your personal details to use all site
                                    features
                                </p>
                                <button
                                    onClick={handleLoginClick}
                                    className="hidden"
                                    id="login"
                                >
                                    Sign In
                                </button>
                            </div>
                            <div
                                className={`toggle-panel toggle-right ${
                                    isActive ? "active" : ""
                                }`}
                            >
                                <h1>Welcome, Friend!</h1>
                                <p>
                                    Enter your personal details to use all site
                                    features
                                </p>
                                <button
                                    onClick={handleRegisterClick}
                                    className="hidden"
                                    id="register"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <BottomSection />
            </div>
        </div>
    );
}

export default Loginpage;
