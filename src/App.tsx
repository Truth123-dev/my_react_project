import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BackToTop from "./components/BackToTop";
import ScrollProgress from "./components/ScrollProgress";
import NotFound from "./pages/NotFound";
import BlogDetails from "./pages/BlogDetails";

function App() {
  return (
    <BrowserRouter>
      <ScrollProgress />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/blog" element={<Blog />} />

        <Route path="/blog/:id" element={<BlogDetails />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>

      <Footer />

      <BackToTop />
    </BrowserRouter>
  );
}

export default App;
