import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Books from "./Components/Books/Books";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import PagenotFound from "./Components/Pagenotfound/PagenotFound";
import Navbar from "./Components/Navbar/Navbar";
import FlipBook from "./flipBook";
import BooksScroll from "./Components/Books/BooksScroll";
import Background from "./Components/Background/Background";
import RippleEffect from "./Components/Navbar/RippleEffect";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Navbar />
            <RippleEffect />
            <Routes>
                <Route index element={<Home />} />
                <Route path="/flipbook" element={<FlipBook />} />
                <Route path="/booksscroll" element={<BooksScroll />} />
                <Route path="/home" element={<Home />} />
                <Route path="/books" element={<Books />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/loginpage" element={<Background />} />
                <Route path="*" element={<PagenotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
