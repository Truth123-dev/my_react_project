


interface SearchBarProps {
    search: string;
    setSearch:
    React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ search, setSearch }: SearchBarProps) =>
 {

    return (
        <div className="mb-10">
            <input
                type="text"
                placeholder="Search blogs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-lg p-4
                focus:outline-none focus:ring-2 focus:ring-blue-600"
         />
        </div>
    );
};
export default SearchBar;