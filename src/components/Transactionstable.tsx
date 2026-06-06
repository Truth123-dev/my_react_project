const transactions = [
  { id: "T-1001", customer: "Acme Corp", amount: "$24,900", status: "Paid" },
  { id: "T-1002", customer: "Nova Labs", amount: "$8,400", status: "Pending" },
  { id: "T-1003", customer: "Luna Retail", amount: "$3,200", status: "Failed" },
  { id: "T-1004", customer: "Blue Line", amount: "$14,700", status: "Paid" },
];

const statusClass = (status: string) => {
  if (status === "Paid") return "status-pill status-paid";
  if (status === "Pending") return "status-pill status-pending";
  return "status-pill status-failed";
};

const Transactionstable = () => {
  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="card-title">Recent transactions</p>
          <span>Latest payouts and invoices</span>
        </div>
      </div>
      <div className="table-scroll">
        <table className="table">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.customer}</td>
                <td>{record.amount}</td>
                <td>
                  <span className={statusClass(record.status)}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Transactionstable;
