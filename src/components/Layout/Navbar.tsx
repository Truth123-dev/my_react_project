import { Link } from "react-router-dom";
import { useState } from "react";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 p-4 text-whit shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">ElijahVisionBlog</h1>
        <div className="hidden md:flex gap-6 items-center">

          <Link to="/" className="text-white hover:text-gray-400">
            Home
          </Link>

          <Link to="/blogs" className="text-white hover:text-gray-400">
            Blogs
          </Link>

          <Link to="/about" className="text-white hover:text-gray-400">
            About
          </Link>

          <Link to="/contact" className="text-white hover:text-gray-400">
            Contact
          </Link>

       
        </div>
        <button

          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden bg-gray-800 px-6 py-5
             flex flex-col gap-4"
        >
          <Link to="/" className="block text-white py-2 hover:text-gray-400">
            Home
          </Link>

          <Link
            to="/blogs"
            className="block text-white py-2 hover:text-gray-400"
          >
            Blogs
          </Link>

          <Link
            to="/about"
            className="block text-white py-2 hover:text-gray-400"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="block text-white py-2 hover:text-gray-400"
          >
            Contact
          </Link>

       
        </div>
      )}
    </nav>
  );
};
export default Navbar;
