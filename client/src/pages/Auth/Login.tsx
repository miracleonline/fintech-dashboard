import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginFormData } from "../../types/auth";
import ThemeToggle from "../../components/ThemeToggle";
import Modal from "../../components/Modal";

export default function Login() {
  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setModalTitle("Login Failed");
        setModalMessage(data.message || "Invalid email or password.");
        setIsSuccess(false);
        setModalOpen(true);
        return;
      }

      // Save token & user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setModalTitle("Welcome Back!");
      setModalMessage("You have successfully logged in.");
      setIsSuccess(true);
      setModalOpen(true);
    } catch (err: any) {
      setModalTitle("Error");
      setModalMessage(err.message || "Network error, please try again.");
      setIsSuccess(false);
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleModalConfirm = () => {
    setModalOpen(false);
    if (isSuccess) {
      navigate("/dashboard");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
                 bg-gray-100 dark:bg-gradient-to-br dark:from-gray-900 
                 dark:via-gray-800 dark:to-black px-4 relative"
    >
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>


      <div
        className="w-full max-w-md 
                   bg-white dark:bg-white/10 dark:backdrop-blur-lg
                   rounded-2xl shadow-2xl border 
                   border-gray-200 dark:border-white/20 overflow-hidden p-6"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-brand">Login</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back! Please login to your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g johndoe@example.com"
              className="w-full p-3 border rounded-lg 
                         bg-gray-50 dark:bg-gray-900/50 
                         border-gray-300 dark:border-gray-600 
                         focus:outline-none focus:ring-2 focus:ring-brand"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg 
                         bg-gray-50 dark:bg-gray-900/50 
                         border-gray-300 dark:border-gray-600 
                         focus:outline-none focus:ring-2 focus:ring-brand"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-brand-dark to-brand 
                       text-white rounded-lg font-semibold shadow-md 
                       hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-300">
          Don’t have an account?{" "}
          <a href="/register" className="text-brand hover:underline">
            Register here
          </a>
        </p>
      </div>

      {/* Modal */}
      <Modal
        open={modalOpen}
        title={modalTitle}
        message={modalMessage}
        onClose={() => setModalOpen(false)}
        onConfirm={isSuccess ? handleModalConfirm : undefined}
        confirmText={isSuccess ? "Continue" : "OK"}
      />
    </div>
  );
}
