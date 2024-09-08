import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navstyles.css";
import { useAuth } from "../utils/AuthContext";

function Navbar() {
    const navigate = useNavigate();

    const { user } = useAuth();

    const logoutClick = () => {
        navigate("/loginpage");
    };
    return (
        <div className="Navbar">
            <div>
                <img className="nav-img" src="Logo.png" alt="" />
            </div>
            <div>
                <ul className="links">
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <Link to="/books">Books</Link>
                    </li>
                    <li>
                        <Link to="about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        {user ? (
                            <>
                                <button onClick={logoutClick}>LOGOUT</button>
                            </>
                        ) : (
                            <Link to="/loginpage">Login</Link>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
