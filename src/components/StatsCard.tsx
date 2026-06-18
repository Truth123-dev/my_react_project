interface Props {
  total: number;
  completed: number;
  pending: number;
}

function StatsCard({ total, completed, pending }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-blue-500 text-white p-4 rounded">
        Total
        <h2>{total}</h2>
      </div>

      <div className="bg-green-500 text-white p-4 rounded">
        Completed
        <h2>{completed}</h2>
      </div>

      <div
        className="bg-red-500 text-white p-4 
                 rounded"
      >
        <h2>{pending}</h2>
      </div>
    </div>
  );
}
export default StatsCard;
