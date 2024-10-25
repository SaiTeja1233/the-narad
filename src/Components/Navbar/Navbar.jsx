import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navstyles.css";
import { account } from "../../appwriteConfig";

function Navbar() {
    const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const currentUser = await account.get();
                setUser(currentUser);
                localStorage.setItem("user", JSON.stringify(currentUser));
            } catch (error) {
                console.log("No active session:", error);
                setUser(null);
                localStorage.removeItem("user");
            }
         
            
        };

        checkUserSession();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
            localStorage.removeItem("user");
            navigate("/loginpage");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleLogin = () => {
        navigate("/loginpage");
    };

    return (
        <div className={`Navbar ${isScrolled ? "scrolled" : ""}`}>
            <div className="Navbar">
                <div className="Nav-logo">
                    <img className="nav-img" src="Logo.png" alt="Logo" />
                    <div className="shine">NARAD</div>
                </div>
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox" className="toggle">
                    <div className="bars" id="bar1"></div>
                    <div className="bars" id="bar2"></div>
                    <div className="bars" id="bar3"></div>
                </label>
                <nav className="nav-links">
                    <ul className="links">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {user && (
                            <li>
                                <Link to="/books">Library</Link>
                            </li>
                        )}
                        <li>
                            <Link to="/about">About</Link>
                        </li>

                        <div className="log-btn">
                            {user ? (
                                <li className="visible" onClick={handleLogout}>
                                    Logout
                                </li>
                            ) : (
                                <li className="visible" onClick={handleLogin}>
                                    Login
                                </li>
                            )}
                        </div>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
