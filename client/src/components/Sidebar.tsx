import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../utils/cn"; // className helper
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Auto-open parent menu if route matches one of its children
  useEffect(() => {
    if (
      location.pathname.startsWith("/staking") ||
      location.pathname.startsWith("/portfolio") ||
      location.pathname.startsWith("/performance") ||
      location.pathname.startsWith("/planning")
    ) {
      setOpenMenu("investment");
    } else if (
      location.pathname.startsWith("/insurance") ||
      location.pathname.startsWith("/policy-coverage") ||
      location.pathname.startsWith("/payment-history") ||
      location.pathname.startsWith("/claims")
    ) {
      setOpenMenu("insurance");
    } else if (
      location.pathname.startsWith("/historyx") ||
      location.pathname.startsWith("/statusx") ||
      location.pathname.startsWith("/logsx") ||
      location.pathname.startsWith("/statementx")
    ) {
      setOpenMenu("transactions");
    } else if (
      location.pathname.startsWith("/history") ||
      location.pathname.startsWith("/cards") ||
      location.pathname.startsWith("/loan") ||
      location.pathname.startsWith("/statement")
    ) {
      setOpenMenu("overview");
    } else if (
      location.pathname.startsWith("/settings") ||
      location.pathname.startsWith("/update") ||
      location.pathname.startsWith("/upgrade") ||
      location.pathname.startsWith("/beneficiaries")
    ) {
      setOpenMenu("settings");
    } else if (location.pathname.startsWith("/charts")) {
      setOpenMenu("market");
    } else {
      setOpenMenu(null); // close all if no match
    }
  }, [location.pathname]);

  const toggleMenu = (menu: string) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const navItem = (to: string, icon: string, label: string) => (
    <li>
      <Link
        to={to}
        onClick={onClose}
        className={cn(
          "flex items-center p-2 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-800",
          location.pathname === to ? "bg-gray-100 dark:bg-gray-800 font-semibold" : ""
        )}
      >
        <i className={`bi ${icon} me-2`}></i>
        <span>{label}</span>
      </Link>
    </li>
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside
      className={`sidebar-scroll w-[280px] h-[calc(100vh-70px)] bg-white dark:bg-gray-900 border-r border-gray-200 
                  dark:border-gray-700 fixed top-[70px] left-0 z-40 overflow-y-auto transition-transform duration-300 
                  ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >
      <ul className="pt-5 space-y-1 px-3 text-sm text-brand dark:text-brand-light">
        {navItem("/dashboard", "bi-grid", "Dashboard")}

        {/* Investment Overview 
        <li>
          <button
            onClick={() => toggleMenu("investment")}
            className="flex items-center w-full p-2 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <i className="bi bi-graph-up-arrow me-2"></i>
            <span>Investment Overview</span>
            <i
              className={cn(
                "bi bi-chevron-down ms-auto transition-transform duration-700",
                openMenu === "investment" ? "rotate-180" : ""
              )}
            />
          </button>
          {openMenu === "investment" && (
            <ul className="ml-6 mt-1 space-y-1">
              {navItem("/staking", "bi-circle", "Staking & Trading")}
              {navItem("/portfolio", "bi-circle", "Portfolio & Assets")}
              {navItem("/performance", "bi-circle", "Performance Analysis")}
              {navItem("/planning", "bi-circle", "Investment Management")}
            </ul>
          )}
        </li>
        */}
        {/* Insurance Overview 
        <li>
          <button
            onClick={() => toggleMenu("insurance")}
            className="flex items-center w-full p-2 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <i className="bi bi-shield-check me-2"></i>
            <span>Insurance Overview</span>
            <i
              className={cn(
                "bi bi-chevron-down ms-auto transition-transform duration-700",
                openMenu === "insurance" ? "rotate-180" : ""
              )}
            />
          </button>
          {openMenu === "insurance" && (
            <ul className="ml-6 mt-1 space-y-1">
              {navItem("/insurance", "bi-circle", "Insurance Policies")}
              {navItem("/policy-coverage", "bi-circle", "Active Coverage")}
              {navItem("/payment-history", "bi-circle", "Payment History")}
              {navItem("/claims", "bi-circle", "Claims & Status")}
            </ul>
          )}
        </li>
        */}
        {/* Transaction History 
        <li>
          <button
            onClick={() => toggleMenu("transactions")}
            className="flex items-center w-full p-2 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <i className="bi bi-file-text me-2"></i>
            <span>Transaction History</span>
            <i
              className={cn(
                "bi bi-chevron-down ms-auto transition-transform duration-700",
                openMenu === "transactions" ? "rotate-180" : ""
              )}
            />
          </button>
          {openMenu === "transactions" && (
            <ul className="ml-6 mt-1 space-y-1">
              {navItem("/historyx", "bi-circle", "History")}
              {navItem("/statusx", "bi-circle", "Check Status")}
              {navItem("/statementx", "bi-circle", "Account Statement")}
              {navItem("/logsx", "bi-circle", "Log transaction dispute")}
            </ul>
          )}
        </li>
        */}
        {/* Financial Overview */}
        <li>
          <button
            onClick={() => toggleMenu("overview")}
            className="flex items-center w-full p-2 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <i className="bi bi-file-text me-2"></i>
            <span>Financial Overview</span>
            <i
              className={cn(
                "bi bi-chevron-down ms-auto transition-transform duration-700",
                openMenu === "overview" ? "rotate-180" : ""
              )}
            />
          </button>
          {openMenu === "overview" && (
            <ul className="ml-6 mt-1 space-y-1">
              {navItem("/history", "bi-circle", "Transaction History")}
              {navItem("/statement", "bi-circle", "Account Statement")}
              {navItem("/loan", "bi-circle", "Pinnacles Loans & Credit")}
              {navItem("/cards", "bi-circle", "Pinnacles Cards & Wallet")}
            </ul>
          )}
        </li>
        {/* Account Settings */}
        <li>
          <button
            onClick={() => toggleMenu("settings")}
            className="flex items-center w-full p-2 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <i className="bi bi-gear me-2"></i>
            <span>Account Settings</span>
            <i
              className={cn(
                "bi bi-chevron-down ms-auto transition-transform duration-700",
                openMenu === "settings" ? "rotate-180" : ""
              )}
            />
          </button>
          {openMenu === "settings" && (
            <ul className="ml-6 mt-1 space-y-1">
              {navItem("/update", "bi-circle", "Update Account Info")}
              {navItem("/upgrade", "bi-circle", "Upgrade Account Plan")}
              {navItem("/settings", "bi-circle", "Settings & Preferences")}
              {navItem("/beneficiaries", "bi-circle", "Signatories & Beneficiaries")}
            </ul>
          )}
        </li>

        {/* Market Analysis */}
        <li>
          <button
            onClick={() => toggleMenu("market")}
            className="flex items-center w-full p-2 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <i className="bi bi-bar-chart me-2"></i>
            <span>Market Analysis</span>
            <i
              className={cn(
                "bi bi-chevron-down ms-auto transition-transform duration-700",
                openMenu === "market" ? "rotate-180" : ""
              )}
            />
          </button>
          {openMenu === "market" && (
            <ul className="ml-6 mt-1 space-y-1">
              {navItem("/charts/fractional", "bi-circle", "Fractional Charts")}
              {navItem("/charts/etf", "bi-circle", "ETF Charts")}
              {navItem("/charts/crypto", "bi-circle", "Crypto Charts")}
            </ul>
          )}
        </li>

        {/* Quick Links */}
        <li className="px-2 mt-4 text-xs uppercase text-gray-500 dark:text-gray-400">
          Quick Links
        </li>
        {navItem("/account", "bi-person", "Account Information")}
        {navItem("/refer", "bi-bag-check", "Referrals & Reward")}
        {navItem("/live-chat", "bi-chat-dots", "Live Chat")}
        {navItem("/about", "bi-info-square", "About Us")}
        {navItem("/faq", "bi-question-circle", "F.A.Q")}
        {navItem("/terms", "bi-file-earmark-code", "T.&.C")}
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-2 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-800 text-left"
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            <span>Log Out</span>
          </button>
        </li>
      </ul>
    </aside>
  );
}
