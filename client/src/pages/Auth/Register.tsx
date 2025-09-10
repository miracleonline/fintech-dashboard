import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle";
import Modal from "../../components/Modal";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: "",
    contactNumber: "",
    accountType: "Single",
    secondaryEmail: "",
    password: "",
    referral: "",
  });

  const [loading, setLoading] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setModalTitle("Registration Failed");
        setModalMessage(data.message || "Something went wrong.");
        setIsSuccess(false);
        setModalOpen(true);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setModalTitle("Success!");
        setModalMessage("Your account has been created successfully.");
        setIsSuccess(true);
        setModalOpen(true);
      }
    } catch (error: any) {
      setModalTitle("Error");
      setModalMessage(error.message || "Network error.");
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
                 dark:via-gray-800 dark:to-black px-4 pt-16 pb-10 relative"
    >
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div
        className="w-full max-w-lg 
                   bg-white dark:bg-white/10 dark:backdrop-blur-lg
                   rounded-2xl shadow-2xl border 
                   border-gray-200 dark:border-white/20 overflow-hidden p-6"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-brand">Sign Up</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Fill out this form for registration
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g John Doe"
              className="w-full p-3 border rounded-lg 
                         bg-gray-50 dark:bg-gray-900/50 
                         border-gray-300 dark:border-gray-600 
                         focus:outline-none focus:ring-2 focus:ring-brand"
              required
            />
          </div>

          {/* Email */}
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

          {/* Phone Number with Country Code */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Phone Number</label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                className="p-3 border rounded-lg 
                           bg-gray-50 dark:bg-gray-900/50 
                           border-gray-300 dark:border-gray-600 
                           focus:outline-none focus:ring-2 focus:ring-brand"
                required
              >
                <option value="">Country</option>
                <option value="234">Nigeria +234</option>
                <option value="1">USA +1</option>
                <option value="44">UK +44</option>
                <option value="91">India +91</option>
                {/* Add more as needed */}
              </select>
              <input
                type="text"
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
                placeholder="000-000-0000"
                className="flex-1 p-3 border rounded-lg 
                           bg-gray-50 dark:bg-gray-900/50 
                           border-gray-300 dark:border-gray-600 
                           focus:outline-none focus:ring-2 focus:ring-brand"
                required
              />
            </div>
          </div>

          {/* Account Type */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Account Type</label>
            <select
              name="accountType"
              value={form.accountType}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg 
                         bg-gray-50 dark:bg-gray-900/50 
                         border-gray-300 dark:border-gray-600 
                         focus:outline-none focus:ring-2 focus:ring-brand"
            >
              <option value="Single">Single (1 Individual)</option>
              <option value="Joint">Joint (2 Individuals)</option>
              <option value="Corporate">Corporate</option>
            </select>
          </div>

          {/* Second Email for Joint */}
          {form.accountType === "Joint" && (
            <div className="mb-4">
              <label className="block text-sm mb-1">Second Email</label>
              <input
                type="email"
                name="secondaryEmail"
                value={form.secondaryEmail}
                onChange={handleChange}
                placeholder="Enter second email"
                className="w-full p-3 border rounded-lg 
                           bg-gray-50 dark:bg-gray-900/50 
                           border-gray-300 dark:border-gray-600 
                           focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          )}

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Choose a strong password"
              className="w-full p-3 border rounded-lg 
                         bg-gray-50 dark:bg-gray-900/50 
                         border-gray-300 dark:border-gray-600 
                         focus:outline-none focus:ring-2 focus:ring-brand"
              required
            />
          </div>

          {/* Referral */}
          <div className="mb-6">
            <label className="block text-sm mb-1">Referral (Optional)</label>
            <input
              type="text"
              name="referral"
              value={form.referral}
              onChange={handleChange}
              placeholder="Enter referral ID or name"
              className="w-full p-3 border rounded-lg 
                         bg-gray-50 dark:bg-gray-900/50 
                         border-gray-300 dark:border-gray-600 
                         focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-brand-dark to-brand 
                       text-white rounded-lg font-semibold shadow-md 
                       hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-brand hover:underline">
            Login here
          </a>
        </p>
      </div>

      {/* Modal for success/error */}
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
