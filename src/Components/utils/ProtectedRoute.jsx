// import React from "react";
// import { Navigate } from "react-router-dom";
// import { account } from "../../appwriteConfig";

// const ProtectedRoute = ({ children }) => {
//     const [user, setUser] = React.useState(null);

//     React.useEffect(() => {
//         const checkSession = async () => {
//             try {
//                 const session = await account.getSession("current");
//                 setUser(session);
//             } catch (error) {
//                 console.error("No active session:", error);
//                 setUser(null);
//             }
//         };
//         checkSession();
//     }, []);

//     if (user) {
//         console.log(user.providerUid);
//         console.log(`current user `);
//         console.log(user);
//         // <Navigate to="/books" />;
//         console.log("user");
//     } else {
//         // <Navigate to="/loginpage" />;
//         console.log("no user");
//     }

//     return children;
// };

// export default ProtectedRoute;
