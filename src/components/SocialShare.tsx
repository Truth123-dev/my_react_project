

const SocialShare = () => {

    return(
        <div className="mt-12">
             
             <h3 className="text-2xl font-bold dark:text-white">
                Share this post: ElijahVisionBlog++
             </h3>

             <div className="flex  gap-4 space-x-4 mt-4">
                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                     Twitter
                 </button>
                 <button className="bg-facebook hover:bg-facebook text-white font-bold py-2 px-4 rounded">
                     Facebook
                 </button>
                <button className="bg-whatsApp hover:bg-whatsApp text-white font-bold py-2 px-4 rounded">
                     WhatsApp
                 </button>
                 <button className="bg-linkedin hover:bg-linkedin text-white font-bold py-2 px-4 rounded">
                     LinkedIn
                 </button>
             </div>
        </div>
    );
};
export default SocialShare;