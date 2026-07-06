

interface Props{
    selected: string;
    setSelected:
     React.Dispatch<React.SetStateAction<string>>;
}

const categories =
 [
    "All", 
    "Technology", 
    "Health", 
    "Travel",
    "Food", 
    "Lifestyle"
];

const Categories = ({ selected, setSelected }: Props) => {

    return(
        <div className="flex flex-wrap gap-4 mb-10">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setSelected(category)}
                    className={`px-4 py-2 rounded-full f
                        transition duration-300 ${
                            selected === category
                            ? "bg-blue-700 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-blue-700 hover:text-white"
                        }`}
                >

                {category}
                </button>
            ))}
           
        </div>
    );
};
export default Categories;
