

import { Link } from "react-router-dom";

const Hero = () => {
    return(
         <section className="bg-linear-to-r from-blue-700
         to-indigo-900 text-white">

             <div className="max-w-7xl mx-auto px-6 py-24">

                 <h2 className="text-5xl font-bold leading-tight">
                      Welcome to 
                      <br />
                      ElijahVisionBlog
                 </h2>

                 <p className="mt-6 text-lg max-w-2xl leading-8 text-gray-200">
                    Visionary tone: Words like innovation, 
                    excellence, empower, progress make it 
                    sound professional.

                    Broad appeal: It covers tech, creativity, 
                    and community — so it’s flexible for freelancing, blogging, 
                    or branding.

                    Memorable: It positions ElijahVisionBlog as more than just a blog,
                    but a brand identity.
                 </p>

                 <Link 
                     to="/blog"
                     className="inline-block mt-8 bg-white text-blue-800
                     px-8 py-4 rounded-lg font-semibold
                      hover:bg-gray-200"
                >
                   Explore Article , Stay memorable and keep it versatile.
                 </Link>
             </div>

         </section>
        );

};
export default Hero;