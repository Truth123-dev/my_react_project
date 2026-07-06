import { useState } from "react";
import BlogCard from "../components/BlogCard";
import { blogs } from "../data/Blogs";
import SearchBar from "../components/SearchBar";
import Category from "../components/Category";
import Pagination from "../components/Pagination";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const filteredBlogs = blogs.filter((blog) => {
    const matchesTitle = blog.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;

    return matchesTitle && matchesCategory;
  });

  const lastBlog = currentPage * blogsPerPage;
  const firstBlog = lastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(firstBlog, lastBlog);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold text-center mb-12">Our Blog Brands</h1>

      <SearchBar search={search} setSearch={setSearch} />

      <Category selected={selectedCategory} setSelected={setSelectedCategory} />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
        {currentBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredBlogs.length / blogsPerPage)}
          onPageChange={setCurrentPage}
        />
      </div>

      <p
        className="text-center text-gray-600 max-w-3xl 
               mx-auto"
      >
        ElijahVisionBlog is a space to explore ideas that inspire creativity and
        innovation. We believe in exploring digital solutions that connect
        people and empower growth. Our mission is to explore new perspectives in
        technology, design, and storytelling. Through exploration, we share
        knowledge that sparks progress and builds community. ElijahVisionBlog
        invites everyone to explore vision, passion, and excellence together.
      </p>
    </section>
  );
};
export default Blog;
