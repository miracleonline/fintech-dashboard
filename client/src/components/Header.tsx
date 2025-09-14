import ThemeToggle from "./ThemeToggle";

export default function Header({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header
      className="fixed shadow-md top-0 left-0 right-0 h-[70px] flex items-center justify-between
                 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 z-50"
    >
      {/* Left side: Sidebar toggle + Logo + Site Name */}
      <div className="flex items-center space-x-4">
        {/* Sidebar toggle (hamburger) - visible on mobile */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-gray-700 dark:text-white text-2xl"
          aria-label="Toggle sidebar"
        >
          <i className="bi bi-list" />
        </button>

        {/* Logo + Site Name */}
        <a href="/" className="flex items-center space-x-2">
          <img src="/src/assets/images/fintech.jpg" alt="logo" className="h-8 w-8" />
          <span className="hidden lg:block font-bold text-gray-800 dark:text-white text-lg">
            Pinnacles
          </span>
        </a>
      </div>

      {/* Optional: Center area for search on desktop */}
      <div className="hidden md:flex flex-1 max-w-md px-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600
                     bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
        <button className="ml-2 text-gray-600 dark:text-gray-300">
          <i className="bi bi-search"></i>
        </button>
      </div>

      {/* Right side: Icons, Theme Toggle, User */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative hidden md:block">
          <i className="bi bi-bell text-xl text-gray-700 dark:text-gray-200"></i>
          <span className="absolute -top-1 -right-1 bg-brand text-white text-xs px-1 rounded-full">
            4
          </span>
        </div>

        {/* Chat */}
        <div className="relative hidden md:block">
          <i className="bi bi-chat-left-text text-xl text-gray-700 dark:text-gray-200"></i>
          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </div>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Profile */}
        <div className="flex items-center space-x-2 mr-4">
          <img
            src={`http://localhost:5000${user?.profileImage}`}
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
