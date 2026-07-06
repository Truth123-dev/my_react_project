

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {
    return (
        <div className="flex justify-center gap-3 mt-16">
             
             {Array.from({ length: totalPages }).map((_, index) =>(
                <button 
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    className={`px-5 py-2 rounded-lg ${
                        currentPage === index + 1
                        ? "bg-blue-700 text-white"
                        : "bg-gray-300"
                    }`}
                    >
                      {index + 1} 
                       
                </button>
             ))}
        </div>
    );
};
export default Pagination;