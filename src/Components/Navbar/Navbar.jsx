import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navstyles.css";
import { account } from "../../appwriteConfig";

function Navbar() {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const currentUser = await account.get();
                setUser(currentUser);
                localStorage.setItem("user", JSON.stringify(currentUser));
            } catch {
                setUser(null);
                localStorage.removeItem("user");
            }
        };

        // Check session only if user state is null
        if (!user) checkUserSession();
    }, [user]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
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
        <header className={`Navbar ${isScrolled ? "scrolled" : ""}`}>
            <div className="Nav-logo">
                <img className="nav-img" src="Logo.png" alt="Logo" />
                <div className="shine">NARAD</div>
            </div>
            <input type="checkbox" id="checkbox" />
            <label
                htmlFor="checkbox"
                className="toggle"
                aria-label="Toggle navigation"
            >
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
                    <li
                        className="log-btn"
                        onClick={user ? handleLogout : handleLogin}
                    >
                        {user ? "Logout" : "Login"}
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
