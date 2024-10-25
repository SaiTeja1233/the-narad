// import { useContext, useState, useEffect, createContext } from "react";
// import { account, ID } from "../../appwriteConfig";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [loading, setLoding] = useState(true);
//     const [user, setUser] = useState(false);



//     const chaeckUserStatus = () => {};

//     const contextData = {
//         user,
//         loginUser,
//         logoutUser,
//         registerUser,
//     };
//     return (
//         <AuthContext.Provider value={contextData}>
//             {loading ? <p>Loading...</p> : children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     return useContext(AuthContext);
// };
// export default AuthContext;
