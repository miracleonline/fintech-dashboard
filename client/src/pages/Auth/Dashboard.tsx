import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Sidebar from "../../components/Sidebar";
import StatCard from "../../components/StatCard";
import ThemeToggle from "../../components/ThemeToggle";
import ReportsChart from "../../components/charts/ReportsChart";
import TransactionTable from "../../components/TransactionTable"; 
import TransactionFormModal from "../../components/TransactionFormModal"; 
import { BsPieChart, BsWallet2, BsCashStack, BsPeople } from "react-icons/bs";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [profileProgress] = useState(70);
  const [showModal, setShowModal] = useState<null | "credit" | "debit">(null);
  const [messageModal, setMessageModal] = useState<{
    title: string;
    message: string;
    confirmText?: string;
  } | null>(null);

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json();
      setUser({
        ...data.user,
        balance: (data.user.balanceCents / 100).toFixed(2), 
      });


      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (err) {
      console.error("Failed to fetch /me:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);


  const assetsData = [
    { name: "Bonds", value: 1048 },
    { name: "Dividends", value: 735 },
    { name: "Savings", value: 580 },
    { name: "Expenses", value: 484 },
  ];

  const budgetData = [
    { subject: "Sales", A: 120, B: 110, fullMark: 150 },
    { subject: "Admin", A: 98, B: 130, fullMark: 150 },
    { subject: "IT", A: 86, B: 130, fullMark: 150 },
    { subject: "Support", A: 99, B: 100, fullMark: 150 },
    { subject: "Dev", A: 85, B: 90, fullMark: 150 },
    { subject: "Marketing", A: 65, B: 85, fullMark: 150 },
  ];

  const COLORS = ["#4154f1", "#2eca6a", "#ff771d", "#e84545"];

  return (
    <>

      {/* Main Content */}

        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white" id="dynamicText">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Welcome back, {user?.name || "User"} 👋
              </p>
            </div>
            {/* <ThemeToggle /> */}
          </div>

          {/* Breadcrumb */}
          <nav className="mt-1">
            <ol className="flex text-sm text-gray-600 dark:text-gray-400 space-x-1">
              <li className="breadcrumb-item">
                <a href="/" className="hover:underline text-blue-600 dark:text-blue-400">Home</a>
              </li>
              <li>/</li>
              <li className="breadcrumb-item active text-gray-900 dark:text-white">Dashboard</li>
            </ol>
          </nav>
        </div>

        {/* Top Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
            <StatCard
              title="Balance"
              subtitle="Revenue"
              value={`$${user?.balance || "0.00"}`}
              percentage="93%"
              percentageType="increase"
              icon={<i className="bi bi-coin text-xl" />}
              action={
                <button
                  onClick={() => setShowModal("credit")}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                >
                  Add Funds
                </button>
              }
            />
            <StatCard
              title="Dividend"
              subtitle="Profits"
              value="$3,264"
              percentage="100%"
              percentageType="increase"
              icon={<i className="bi bi-database-gear text-xl" />}
              action={
                <button
                  onClick={() => setShowModal("debit")}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
                >
                  Withdraw
                </button>
              }
            />
            <StatCard
              title="Portfolio"
              subtitle="Value"
              value="$1,500"
              percentage="5%"
              percentageType="decrease"
              icon={<i className="bi bi-briefcase text-xl" />}
              action={
                <button
                  onClick={() => alert("Bills clicked!")}
                  className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition text-sm"
                >
                  Pay Bills
                </button>
              }
            />
          </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Reports Chart */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow">
            <h5 className="mb-4 font-semibold text-gray-800 dark:text-gray-200">
              Reports
            </h5>
            <ReportsChart />
          </div>

          {/* Assets Pie Chart */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow">
            <h5 className="mb-4 font-semibold text-gray-800 dark:text-gray-200">
              Assets
            </h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetsData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {assetsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget Radar Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow mb-6">
          <h5 className="mb-4 font-semibold text-gray-800 dark:text-gray-200">
            Budget Report
          </h5>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={budgetData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                name="Allocated"
                dataKey="A"
                stroke="#4154f1"
                fill="#4154f1"
                fillOpacity={0.6}
              />
              <Radar
                name="Used"
                dataKey="B"
                stroke="#ff771d"
                fill="#ff771d"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Profile Progress & News */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Profile Progress */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Complete Your Profile
            </h2>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
              <div
                className="bg-red-600 h-3 rounded-full transition-all"
                style={{ width: `${profileProgress}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              {profileProgress}% completed. Update your details to unlock full
              features.
            </p>
          </div>

          {/* News */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              News & Updates
            </h2>
            <ul className="space-y-3">
              <li className="border-b border-gray-200 dark:border-gray-700 pb-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Market hitting new highs
                </h3>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </li>
              <li className="border-b border-gray-200 dark:border-gray-700 pb-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Insurance updates for Q3
                </h3>
                <p className="text-xs text-gray-500">1 day ago</p>
              </li>
            </ul>
          </div>

          {/* Top Selling Plans */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Top Selling Plans
            </h2>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Pinnacle Gold</span>
                <span className="font-semibold text-gray-800 dark:text-white">$12,000</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Growth Plus</span>
                <span className="font-semibold text-gray-800 dark:text-white">$9,500</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Plan Swiper (Horizontal Cards) */}
        <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl shadow p-6">

        {/* Tier & Plan Badges */}
        <div className="flex justify-between items-center mb-4">
          <span className="badge bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
            <i className="bi bi-star me-1"></i> Tier 1
          </span>
          <span className="badge bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
            <i className="bi bi-folder me-1"></i> Basic Plan
          </span>
        </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Investment Plans
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700">
            <div className="min-w-[220px] bg-red-50 dark:bg-red-950 text-gray-800 dark:text-white rounded-xl p-4 shadow">
              <h3 className="font-semibold">Starter</h3>
              <p className="text-sm">From $500</p>
            </div>
            <div className="min-w-[220px] bg-red-100 dark:bg-red-900 text-gray-800 dark:text-white rounded-xl p-4 shadow">
              <h3 className="font-semibold">Premium</h3>
              <p className="text-sm">From $5,000</p>
            </div>
            <div className="min-w-[220px] bg-red-200 dark:bg-red-800 text-gray-800 dark:text-white rounded-xl p-4 shadow">
              <h3 className="font-semibold">Enterprise</h3>
              <p className="text-sm">From $20,000</p>
            </div>
            <div className="min-w-[220px] bg-red-200 dark:bg-red-800 text-gray-800 dark:text-white rounded-xl p-4 shadow">
              <h3 className="font-semibold">Lifetime</h3>
              <p className="text-sm">From $50,000+</p>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-8">
          <TransactionTable />
        </div>

        {showModal && (
        <TransactionFormModal
          type={showModal}
          onClose={() => setShowModal(null)}
          onSuccess={() => {
          fetchUser(); 
          setShowModal(null);
          setMessageModal({
            title: "Transaction Successful",
            message: `Your ${showModal === "credit" ? "deposit" : "withdrawal"} was successful.`,
          });
          }}
        />
      )}

      {messageModal && (
        <Modal
          open={true}
          title={messageModal.title}
          message={messageModal.message}
          confirmText={messageModal.confirmText || "OK"}
          onClose={() => setMessageModal(null)}
        />
      )}
    </>
  );
}
