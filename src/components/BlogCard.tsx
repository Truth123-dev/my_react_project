

import type { Blog } from "../types/Blog";
import { Link } from "react-router-dom";

interface Props{
    blog: Blog;
}

const  BlogCard = ({ blog }: Props) => {
    return (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden
              hover:shadow-2xl duration300">

                  <img 
                     src={blog.image} 
                     alt={blog.title}
                     className="w-full h-600 object-cover"
                  />
                    <div className="p-6">

                       <p className="text-blue-600 text-sm">
                           {blog.category}
                       </p>

                       <h2 className="text-2xl font-bold mt-2">
                           {blog.title}
                       </h2>

                       <p className="text-gray-600 mt-4">
                           {blog.description}
                       </p>

                       <div className="flex justify-between mt-6 text-sm
                        text-gray-500 ">
                          
                          <span>
                              {blog.author}
                          </span>

                          <span>
                               {blog.date}
                          </span>

                       </div>

                       <Link 
                           to={`/blog/${blog.id}`}
                           className="inline-block mt-6 bg-blue-700 text-white
                           px-5 py-3 rounded-lg hover:bg-blue-900 duration-300"
                        >
                            Read More
                       </Link>
                    </div>

              </div>
          );
};
export default BlogCard;

