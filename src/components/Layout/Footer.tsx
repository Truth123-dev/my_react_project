const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16 py-4">
      <div className="max-w-7xl mx-auto px-6 flex py-12">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-2xl font-bold mb-4">
            <h2>OurVisionBlog</h2>

            <p className="text-gray-400 font-light p-10 leading-7">
              ElijahVisionBlog is a modern technology blog, “A creative hub for
              visionary ideas, digital innovation, and professional insights —
              where technology meets storytelling, design meets purpose, and
              every project reflects growth, clarity, and excellence.
              ElijahVisionBlog is dedicated to empowering developers,
              entrepreneurs, and dreamers with knowledge, creativity, and
              solutions that inspire progress and connect communities
              worldwide.”
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>

            <ul className="space-y-3 text-gray-400">
              <li>Home</li>
              <li>Blog</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Contact</h2>

            <p className="text-gray-400">Email: elijah@example.com</p>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <p className="text-center text-gray-500">
          &copy; 2026 OurVisionBlog{" "}
        </p>

        <p className="text-gray-400">Phone: +234 123-456-78</p>

        <p className="text-gray-400">Lagos, Nigeria. All right reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
