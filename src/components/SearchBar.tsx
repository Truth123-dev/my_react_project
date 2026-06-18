

interface Props {
  search: string;
  setSearch: (Value: string) => void;
}

function SearchBar({ search, setSearch }: Props) {
  return (
    <input
      type="text"
      placeholder="Search Todo........"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border p-3 rounded"
    />
  );
}
export default SearchBar;
