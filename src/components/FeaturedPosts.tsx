

import BlogCard from "./BlogCard";
import { blogs} from "../data/Blogs";


const FeaturedPosts = () => {
    const featured = blogs.slice(0, 3);

    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-4xl font-bold mb-10">
                Featured Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featured.map((blog) => (
                    <BlogCard 
                        key={blog.id} 
                        blog={blog} 
                    />
                ))}
            </div>
        </section>
    );
};

export default FeaturedPosts;