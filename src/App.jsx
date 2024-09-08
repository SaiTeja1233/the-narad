import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Books from "./Components/Books/Books";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Loginpage from "./Components/LoginPage/Loginpage";
import PagenotFound from "./Components/Pagenotfound/PagenotFound";
import Navbar from "./Components/Navbar/Navbar";
import FlipBook from "./flipBook";
import BooksScroll from "./Components/Books/BooksScroll";
import Background from "./Components/Background/Background";
import PrivateRoutes from "./Components/utils/PrivateRoutes";
import { AuthProvider } from "./Components/utils/AuthContext";
export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/flipbook" element={<FlipBook />} />
                    <Route path="/booksscroll" element={<BooksScroll />} />
                    <Route path="/home" element={<Home />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/books" element={<Books />} />
                    </Route>
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/loginpage" element={<Background />} />
                    <Route path="*" element={<PagenotFound />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
