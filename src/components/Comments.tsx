

const Comments = () => {
    const comments = [
        {
            id: 1,
            name: "John peter",
            message: "This is a great blog post! I really enjoyed reading it and learned a lot."
        },

        {
            id: 2,
            name: "Jane Doe",
            message: "I completely agree with the points made in this article. Thanks for sharing!"
        },

        {
            id: 3,
            name: "Bob Smith",
            message: "I have a different perspective on this branding innovation, but I appreciate the insights provided here."
        },

        {
            id: 4,
            name: "Alice Johnson",
            message: "This is a well-written and informative post. I look forward to reading more from this author."
        },

        {
            id: 5,
            name: "Charlie Brown",
            message: "I found this article to be very helpful in understanding the latest trends in branding. Thank you!"
        },

        {
            id: 6,
            name: "Emily Davis",
            message: "I appreciate the research and analysis that went into this post. It has given me some new ideas to consider."
        },

        {
            id: 7,
            name: "David Lee",
            message: "I think there are some important points missing from this article, but overall it was a good read."
        },

        {
            id: 8,
            name: "Sarah Kim",
            message: "I really enjoyed the examples provided in this post. They helped me understand the concepts better."
        },

        {
            id: 9,
            name: "Michael Chen",
            message: "I think this article could benefit from more visuals and graphics to illustrate the points being made."
        },

        {
            id: 10,
            name: "Jessica Lee",
            message: "I appreciate the author's perspective on this topic, but I would like to see more data and evidence to support the claims being made."
        },

        {
            id: 11,
            name: "Gen Doe",
            message: "This is a great blog post! I really enjoyed reading it and learned a lot."
        },

        {
            id: 12,
            name: "Erica Tam",
            message: "I completely agree with the points made in this article. Thanks for sharing!"
        },

        {
            id: 13,
            name: "Larry Ka",
            message: "This is a great  vision communicated."
        },

        {
            id: 14,
            name: "Peter",
            message: "This is great ."
        },

        {
           id: 15,
           name: "Gloria",
           message: "Bravo!"
        },
    ];

    return (

   
        <section className="mt-20">

              <h2 className="text-3xl font-bold mb-8 dark:text-white">
                 Comments
              </h2>

              <div className="space-y-6">
                 
                 {comments.map((comments) => (
                    <div 
                       key={comments.id}
                       className="bg-white dark:bg-gray-800
                       rounded-xl shadow-md p-6"
                    >
                      
                      <h3 className="font-bold text-lg
                       dark:text-gray-300"
                       >
                        {comments.name}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300">
                         {comments.message}
                      </p>

                    </div>
                 ))}

              </div>

              <form className="mt-10 space-y-5">

                     <input 
                       type="text"
                       placeholder="Your Name..."
                       className="w-full border rounded-lg p-4"
                    />

                    <textarea
                     rows={5}
                     placeholder="Write a comment...."
                     className="w-full border rounded-lg p-4"
                    />

                    <button className="bg-blue-700 text-white
                    px-8 py-3 rounded-lg"
                    >
                      Post comments
                    </button>

              </form>
        </section>
    ) ;
};
export default Comments;