

import { useEffect , useState } from "react";

const BackToTop =  () => {
    const [show , setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 300);
        };

        window .addEventListener("Scroll" , handleScroll);

        return () =>
            window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        show && (
            <button 
                onClick={() => 
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    })
                }
                className="fixed bottom-6 right-6 bg-blue-700
                text-white w-12 h-12 rounded-full shadow-lg"
            >
               ⬆️
            </button>
        )
    );
};
export default BackToTop;