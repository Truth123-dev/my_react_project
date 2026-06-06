const navigation = [
  { label: "Dashboard", icon: "📊", active: true },
  { label: "Transactions", icon: "💸" },
  { label: "Invoices", icon: "🧾" },
  { label: "Customers", icon: "👥" },
  { label: "Reports", icon: "📈" },
  { label: "Settings", icon: "⚙️" },
];

const Sidebar = () => {
  return (
    <aside className="card sidebar-card">
      <div className="sidebar-brand">
        <div className="sidebar-logo">F</div>
        <div>
          <strong>Finance HQ</strong>
          <p>Profit insights</p>
        </div>
      </div>

      <div className="sidebar-account">
        <div className="account-avatar">FH</div>
        <div>
          <strong>Finance Admin</strong>
          <p>Team lead</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navigation.map((item) => (
          <button
            key={item.label}
            type="button"
            className={item.active ? "nav-item active" : "nav-item"}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-summary">
        <p>Total balance</p>
        <strong>$4.8M</strong>
        <span>+12.4% this month</span>
      </div>
    </aside>
  );
};

export default Sidebar;
