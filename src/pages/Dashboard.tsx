import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Dashboardcards from "../components/Dashboardcards";
import RevenueChart from "../components/RevenueChart";
import WalletBalance from "../components/WalletBalance";
import RecentActivity from "../components/RecentActivity";
import Transactionstable from "../components/Transactionstable";
import CustomersTable from "../components/CustomersTable";
import QuickActions from "../components/QuickActions";
import Notifications from "../components/Notifications";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar />

        <section className="page-head">
          <div>
            <p className="page-kicker">Daily finance overview</p>
            <h1>Smart finance dashboard</h1>
            <p className="page-copy">
              Track performance, monitor spending, and keep your cash flow in
              control.
            </p>
          </div>
          <div className="hero-summary">
            <span>Monthly target</span>
            <strong>$1.2M</strong>
          </div>
        </section>

        <Dashboardcards />

        <section className="dashboard-grid">
          <RevenueChart />
          <div className="dashboard-widgets">
            <WalletBalance />
            <RecentActivity />
          </div>
        </section>

        <section className="dashboard-bottom">
          <Transactionstable />
          <div className="dashboard-tall-column">
            <CustomersTable />
            <QuickActions />
          </div>
          <Notifications />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
