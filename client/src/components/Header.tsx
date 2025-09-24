import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/images/fintech.jpg";

export default function Header({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const msgRef = useRef<HTMLDivElement>(null);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (msgRef.current && !msgRef.current.contains(e.target as Node)) {
        setShowMessages(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed shadow-md top-0 left-0 right-0 h-[70px] flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 z-50">
      {/* Left: Logo */}
      <div className="flex items-center space-x-4">
        <button onClick={onToggleSidebar} className="lg:hidden text-gray-700 dark:text-white text-2xl">
          <i className="bi bi-list" />
        </button>
        <a href="/" className="flex items-center space-x-2">
          <img src={logo} alt="logo" className="h-8 w-8" />
          <span className="hidden lg:block font-bold text-gray-800 dark:text-white text-lg">Pinnacles</span>
        </a>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex flex-1 max-w-md px-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
        <button className="ml-2 text-gray-600 dark:text-gray-300">
          <i className="bi bi-search"></i>
        </button>
      </div>

      {/* Right: Icons & Profile */}
      <div className="flex items-center space-x-4 relative">

        {/* Notifications */}
        <div ref={notifRef} className="relative hidden md:block">
          <button onClick={() => setShowNotifications(!showNotifications)}>
            <i className="bi bi-bell text-xl text-gray-700 dark:text-gray-200"></i>
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs px-1 rounded-full">4</span>
          </button>
          {showNotifications && (
            <ul className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50">
              <li className="px-4 py-2 font-semibold border-b border-gray-200 dark:border-gray-600">
                You have 4 new notifications
                <a href="#" className="ml-2 text-blue-600 hover:underline text-sm">View all</a>
              </li>

              {[
                {
                  icon: "bi-exclamation-circle text-warning",
                  title: "Sign-up bonus",
                  message: `Congratulations ${user?.name || "User"}! You've just received $100 for signing up.`,
                  time: "1 min ago",
                },
                {
                  icon: "bi-x-circle text-danger",
                  title: "Update your account",
                  message: "Verify your account to qualify for weekly bonus.",
                  time: "1 hr ago",
                },
                {
                  icon: "bi-check-circle text-success",
                  title: "Support available",
                  message: "24/7 support is online. Let us know if you need anything.",
                  time: "2 hrs ago",
                },
                {
                  icon: "bi-info-circle text-primary",
                  title: "Welcome to Pinnacles Financial",
                  message: "Empowering investors to access their financial rights.",
                  time: "4 hrs ago",
                },
              ].map((notif, idx) => (
                <li key={idx} className="px-4 py-3 flex border-b border-gray-100 dark:border-gray-700">
                  <i className={`bi ${notif.icon} text-xl mr-3`}></i>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800 dark:text-white">{notif.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                  </div>
                </li>
              ))}

              <li className="text-center py-2">
                <a href="#" className="text-sm text-blue-600 hover:underline">Show all notifications</a>
              </li>
            </ul>
          )}
        </div>

        {/* Messages */}
        <div ref={msgRef} className="relative hidden md:block">
          <button onClick={() => setShowMessages(!showMessages)}>
            <i className="bi bi-chat-left-text text-xl text-gray-700 dark:text-gray-200"></i>
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1 rounded-full">3</span>
          </button>
          {showMessages && (
            <ul className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50">
              <li className="px-4 py-2 font-semibold border-b border-gray-200 dark:border-gray-600">
                You have 3 new messages
                <a href="#" className="ml-2 text-blue-600 hover:underline text-sm">View all</a>
              </li>

              {[
                {
                  img: "/src/assets/images/messages-1.jpg",
                  name: "Pinnacles",
                  message: `Welcome ${user?.name || "User"}! We're excited to support your financial goals.`,
                  time: "4 hrs ago",
                },
                {
                  img: "/src/assets/images/messages-2.jpg",
                  name: "Walter White",
                  message: "As a pro manager, I offer top-tier investment guidance. Ready to help!",
                  time: "6 hrs ago",
                },
                {
                  img: "/src/assets/images/messages-3.jpg",
                  name: "Pinnacles",
                  message: `Hello ${user?.name || "User"}! Your sign-up was successful.`,
                  time: "8 hrs ago",
                },
              ].map((msg, idx) => (
                <li key={idx} className="px-4 py-3 flex border-b border-gray-100 dark:border-gray-700">
                  <img src={msg.img} className="h-10 w-10 rounded-full mr-3" alt="msg" />
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800 dark:text-white">{msg.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{msg.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
                  </div>
                </li>
              ))}

              <li className="text-center py-2">
                <a href="#" className="text-sm text-blue-600 hover:underline">Show all messages</a>
              </li>
            </ul>
          )}
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User */}
        <div className="flex items-center space-x-2 mr-4">
          <img
            src={`https://fintech-dashboard-p1y7.onrender.com${user?.profileImage}`}
            alt="profile"
            className="h-8 w-8 rounded-full"
          />
          <span className="hidden md:block ml-4 text-gray-800 dark:text-white whitespace-nowrap">
            {user?.name || "User"} 👋
          </span>
        </div>
      </div>
    </header>
  );
}
