

const AuthorCard = () => {

    return(
        <div className="bg-white dark:bg-gray-800 p-6 
        rounded-lg shadow-lg flex 
        flex-col items-center">
          
          <img 
             src="https://pravatar.cc/150?img=3" 
             alt="Author"
             className="w-28 h-28 rounded-full mx-auto"
          />

          <h3 className="text-2xl font-bold text-center
          mt-5">
              OurVisionBlog
          </h3>

          <p className="text-gray-600 dark:text-gray-400 text-center mt-3">
              Software Engineer
          </p>

        </div>
           
        
    );
};
export default AuthorCard;