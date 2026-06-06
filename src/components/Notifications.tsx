const notifications = [
  {
    title: "Weekly performance is ahead",
    detail: "Revenue is 14% above forecast.",
  },
  { title: "Invoice overdue", 
    detail: "Invoices totaling $12.4k need review." },
  {
    title: "Budget alert",
    detail: "Marketing spend is nearing the monthly cap.",
  },
];

const Notifications = () => {
  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="card-title">Notifications</p>
          <span>Alerts worth reviewing</span>
        </div>
      </div>

      <div className="notification-list">
        {notifications.map((item) => (
          <div key={item.title} className="notification-entry">
            <div className="entry-title">{item.title}</div>
            <span>{item.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Notifications;
