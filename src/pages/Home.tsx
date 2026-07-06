

import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";
import { blogs } from "../data/Blogs";
import NewsLetter from "../components/NewsLetter";
import FeaturedPosts from "../components/FeaturedPosts";


const Home = () => {
    return (
        <>
           <Hero />

           <FeaturedPosts />


           <section className="text-black dark:text-white bg-white dark:bg-gray-900 max-w-7xl 
           mx-auto px-6 py-16">

                  <h2>
                    Latest Branding Innovation
                  </h2>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {blogs.map((blog) => (
                            <BlogCard
                                 key={blog.id}
                                 blog={blog}
                             />
                        ))}

                        <NewsLetter />
                  </div>

           </section>

        </>
    );
};
export default Home;