

const Contact = () => {
    return (

           <section className="max-w-7xl mx-auto px-6 py-16">

               <h1>Contact Us</h1>
               <p>Get in touch with us!</p>

               <form className="mt-6 space-y-4">

                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border-4 rounded-lg"
                 />

                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full border-4 rounded-lg"
                 />

                <input
                    type="text"
                    placeholder="Subject"
                    className="w-full border p-4 rounded-lg"
                 />
                <textarea
                    rows={6}
                    placeholder=" Write your message here..."
                    className="w-full border p-4 rounded-lg"
                 />

                <button
                    className="bg-blue-700 text-white px-8 py-4
                     rounded-lg hover:bg-blue-900 
                     transition-colors duration-300"
                >
                Send Message
                </button>
                   
               </form>
           </section>
        );
};
export default Contact;