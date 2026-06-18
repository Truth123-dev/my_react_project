

interface Props{
    darkMode: boolean;
    toggleTheme: () => void
}
 function ThemeToggle({darkMode ,toggleTheme, } : Props) {
     return (
               <button  
                   onClick={toggleTheme}
                   className="bg-black text-white px-4 py-2 
                   rounded"
                >
                 {darkMode
                  ? "Light Mode" 
                  : "Dark Mode"
                 }   
               </button>
            );
 }
 export default ThemeToggle;