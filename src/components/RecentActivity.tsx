const activity = [
  { title: "Client payment received", when: "2m ago", amount: "+$24,900" },
  { title: "Subscription renewal", when: "45m ago", amount: "+$8,400" },
  { title: "Expense approved", when: "1h ago", amount: "-$3,200" },
];

const RecentActivity = () => {
  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="card-title">Recent activity</p>
          <span>Latest finance events</span>
        </div>
      </div>

      <div className="activity-list">
        {activity.map((item) => (
          <div key={item.title} className="activity-entry">
            <div className="entry-title">{item.title}</div>
            <div className="entry-meta">
              <span>{item.when}</span>
              <strong>{item.amount}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentActivity;
