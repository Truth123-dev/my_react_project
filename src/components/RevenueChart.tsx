const RevenueChart = () => {
  const months = [
    { label: "Jan", value: 42 },
    { label: "Feb", value: 48 },
    { label: "Mar", value: 56 },
    { label: "Apr", value: 63 },
    { label: "May", value: 74 },
    { label: "Jun", value: 81 },
    { label: "Jul", value: 92 },
    { label: "Aug", value: 87 },
    { label: "Sep", value: 79 },
    { label: "Oct", value: 90 },
    { label: "Nov", value: 98 },
    { label: "Dec", value: 107 },
  ];

  const maxValue = Math.max(...months.map((item) => item.value));

  return (
    <section className="card chart-card">
      <div className="card-header">
        <div>
          <p className="card-title">Revenue trend</p>
          <h2>$1,120,400</h2>
        </div>
        <div className="metric-chip">+18.2%</div>
      </div>

      <div className="chart-bars">
        {months.map((month) => {
          const height = (month.value / maxValue) * 100;
          return (
            <div key={month.label} className="chart-column">
              <div
                className="bar"
                style={{ height: `${height}%` }}
                data-value={`${month.value}k`}
              />
              <span className="bar-label">{month.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RevenueChart;
