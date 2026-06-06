const metrics = [
  { label: "Revenue", amount: "$275.6k", change: "+18.7%" },
  { label: "Expenses", amount: "$82.3k", change: "-4.2%" },
  { label: "Net profit", amount: "$193.3k", change: "+15.4%" },
  { label: "Growth", amount: "12.8%", change: "+2.6%" },
];

const Dashboardcards = () => {
  return (
    <section className="metric-list">
      {metrics.map((metric) => (
        <div key={metric.label} className="metric-card">
          <p className="metric-label">{metric.label}</p>
          <p className="metric-number">{metric.amount}</p>
          <span className="metric-chip">{metric.change}</span>
        </div>
      ))}
    </section>
  );
};

export default Dashboardcards;
