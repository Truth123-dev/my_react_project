

const NewsLetter = () => {
    return (

        <section className="bg-blue-700 text-white py-20 mt-20">
            <div className="max-w-5xl mx-auto px-6 text-center">
               
               <h2 className="text-4xl font-bold">
                    Subscribe to our Brand NewsLetter
               </h2>

               <p className="mt-4 text-lg">
                 Welcome to the OurVisionBlog Newsletter 
                 — your trusted hub for creativity, innovation, and growth. 
                  Explore Ideas, Inspire Growth, Share Vision is more than a tagline; 
                  it’s the heartbeat of our community. Each edition connects creativity with digital solutions
                  for tomorrow, offering insights that empower individuals and businesses alike. We bring together knowledge, innovation, 
                  and community to spark progress and inspire new perspectives. Join us as we explore, create, and transform ideas 
                  into impactful solutions for the future.
               </p>

               <div className="flex flex-col md:flex-row gap-4 mt-10">

                <input
                     type="email"
                     placeholder="Enter your email...."
                     className="flex-1 p-4 rounded-lg text-black" 
                 />

                 <button className="bg-black px-8 py-4 rounded-lg">
                    Subscribe
                 </button>

               </div>

         </div>
              
        </section>
    );
};
export default NewsLetter;