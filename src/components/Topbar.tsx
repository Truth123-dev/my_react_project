const alerts = [
  { label: "Cash flow", value: "+8.2%" },
  { label: "Budget saved", value: "$28.5k" },
];

const Topbar = () => {
  return (
    <section className="card topbar-card">
      <div>
        <p className="topbar-title">Hello, Finance leader</p>
        <p className="topbar-subtitle">
          Your finance workspace is up to date with the latest trends.
        </p>
      </div>
      <div className="topbar-actions">
        <div className="topbar-search">
          <input type="search" placeholder="Search reports" />
        </div>
        <div className="topbar-badges">
          {alerts.map((item) => (
            <div key={item.label} className="topbar-badge">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Topbar;
