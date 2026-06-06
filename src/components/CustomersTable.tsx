const customers = [
  { name: "Ava Holdings", revenue: "$92.1k", status: "Premium" },
  { name: "Zenith Co.", revenue: "$74.3k", status: "Growth" },
  { name: "Pulse LLC", revenue: "$63.7k", status: "Active" },
];

const CustomersTable = () => {
  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="card-title">Top customers</p>
          <span>Revenue contribution</span>
        </div>
      </div>
      <div className="table-scroll">
        <table className="table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Revenue</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.name}>
                <td>
                  <div className="customer-cell">
                    <span className="customer-avatar">
                      {customer.name.charAt(0)}
                    </span>
                    <span>{customer.name}</span>
                  </div>
                </td>
                <td>{customer.revenue}</td>
                <td>
                  <span className="status-pill status-paid">
                    {customer.status}
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

export default CustomersTable;
