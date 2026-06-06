const WalletBalance = () => {
  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="card-title">Wallet balance</p>
          <strong className="card-value">$468,200</strong>
        </div>
        <span className="metric-chip">+7.9%</span>
      </div>

      <div className="budget-list">
        <div className="budget-item">
          <span>Operating cash</span>
          <strong>$218,900</strong>
        </div>
        <div className="budget-item">
          <span>Reserve fund</span>
          <strong>$132,100</strong>
        </div>
        <div className="budget-item">
          <span>Investments</span>
          <strong>$117,200</strong>
        </div>
      </div>
    </section>
  );
};

export default WalletBalance;
