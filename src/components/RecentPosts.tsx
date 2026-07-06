

import { blogs } from "../data/Blogs"

const RecentPosts = () => {
    return (
        <aside className="bg-white dark:bg-gray-800
        rounded-xl shadow-lg p-6">
            
            <h2 className="text-2xl font-bold mb-6
            dark:text-white">
                 Recent Posts
            </h2>

            <div className="space-y-5">
               {blogs.slice(0 ,5).map((blog) => (
                 <div 
                   key={blog.id}>
                    
                    <h3 className="font-semibold dark:text-white">
                         {blog.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                       {blog.date}
                    </p>

                 </div>

               ))}

            </div>

        </aside>
    );
};
export default RecentPosts;