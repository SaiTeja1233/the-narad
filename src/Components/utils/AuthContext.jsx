import { useContext, useState, useEffect, createContext } from "react";
import { account } from "../../appwriteConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoding] = useState(true);
    const [user, setUser] = useState(false);

    useEffect(() => {
        setLoding(false);
    }, []);
    const loginUser = async (userInfo) => {
        setLoding(true);
        try {
            // Check if a session is already active
            const session = await account.getSession("current");
            if (session) {
                console.log("SESSION IS ALREADY ACTIVE:", session);
                // If a session is already active, you can update the user data
                setUser(session);
            } else {
                // If no session is active, create a new one
                let promise = await account.createEmailPasswordSession(
                    userInfo.email,
                    userInfo.password
                );
                promise.then(
                    function (response) {
                        console.log(response); // Success
                    },
                    function (error) {
                        console.log(error); // Failure
                    }
                );
                console.log("SESSION CREATED:");
                // Get the current session
                const newSession = await account.getSession("current");
                console.log("SESSION:", newSession);
                // Set the user data
                setUser(newSession);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoding(false);
        }
    };
    const logoutUser = () => {};

    const registerUser = async (userInfo) => {
        setLoding(true);
        try {
            // Create a new user account
            const response = await account.create(
                userInfo.email,
                userInfo.password,
                userInfo.name
            );
            console.log(response); // Success
            console.log("USER CREATED:");
            // Get the current user
            const newUser = await account.get();
            console.log("USER:", newUser);
            // Set the user data
            setUser(newUser);
        } catch (error) {
            console.error(error);
        } finally {
            setLoding(false);
        }
    };

    const chaeckUserStatus = () => {};

    const contextData = {
        user,
        loginUser,
        logoutUser,
        registerUser,
    };
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
export default AuthContext;
