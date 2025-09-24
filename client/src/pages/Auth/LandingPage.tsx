import { Link } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-800 dark:text-gray-100 flex flex-col items-center justify-between px-6 py-10">
      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-brand dark:text-white">Pinnacles Fintech</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            to="/login"
            className="px-4 py-2 border border-brand text-brand dark:text-white dark:border-white rounded hover:bg-brand hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-brand text-white rounded hover:opacity-90 transition"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="text-center flex-1 flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Your All-In-One Fintech Dashboard
        </h2>
        <p className="text-lg max-w-xl mb-8 text-gray-600 dark:text-gray-300">
          Manage your finances, track transactions, and handle beneficiaries with ease. Secure and fast.
        </p>

        <div className="flex gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-brand text-white rounded-lg text-lg hover:opacity-90 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-brand text-brand dark:text-white dark:border-white rounded-lg text-lg hover:bg-brand hover:text-white transition"
          >
            Login
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Pinnacles Fintech Company. All Rights Reserved.
      </footer>
    </div>
  );
}
