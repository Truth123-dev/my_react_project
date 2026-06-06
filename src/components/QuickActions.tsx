const actions = [
  { label: "Generate invoice", style: "primary" },
  { label: "Review budgets", style: "secondary" },
  { label: "Add new customer", style: "secondary" },
];

const QuickActions = () => {
  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="card-title">Quick actions</p>
          <span>Move fast on finance tasks</span>
        </div>
      </div>

      <div className="quick-actions">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            className={action.style === "primary" ? "" : "secondary"}
          >
            {action.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
