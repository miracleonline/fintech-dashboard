// src/pages/Auth/LoanApplication.tsx

import { useEffect, useState } from "react";
import Modal from "../../components/Modal";

interface LoanFormData {
  // Step 1: Loan Details
  amount: string;
  purpose: string;
  repaymentPeriod: string; // in months

  // Step 2: Financial Info
  employmentStatus: string;
  monthlyIncome: string;
  collateral?: string;
}

interface Loan {
  _id: string;
  amount: number;
  purpose: string;
  repaymentPeriod: number;
  employmentStatus: string;
  monthlyIncome: number;
  collateral?: string;
  status: string;
  createdAt: string;
}

export default function LoanApplication() {
  const [form, setForm] = useState<LoanFormData>({
    amount: "",
    purpose: "",
    repaymentPeriod: "",
    employmentStatus: "",
    monthlyIncome: "",
    collateral: "",
  });

  const [step, setStep] = useState<number>(1);
  const totalSteps = 3; 

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [tab, setTab] = useState<"list" | "apply">("list");
  const [loans, setLoans] = useState<Loan[]>([]);

  // Validation errors per step
  const [errors, setErrors] = useState<Partial<Record<keyof LoanFormData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = (): boolean => {
    const newErrors: typeof errors = {};

    if (step === 1) {
      // Validate loan details
      if (!form.amount.trim()) {
        newErrors.amount = "Amount is required";
      } else if (isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
        newErrors.amount = "Amount must be a number greater than 0";
      }

      if (!form.purpose.trim()) {
        newErrors.purpose = "Purpose is required";
      }

      if (!form.repaymentPeriod.trim()) {
        newErrors.repaymentPeriod = "Repayment period is required";
      } else if (!Number.isInteger(Number(form.repaymentPeriod)) || Number(form.repaymentPeriod) <= 0) {
        newErrors.repaymentPeriod = "Repayment period must be a whole number of months";
      }
    } else if (step === 2) {
      // Validate financial info
      if (!form.employmentStatus.trim()) {
        newErrors.employmentStatus = "Employment status is required";
      }
      if (!form.monthlyIncome.trim()) {
        newErrors.monthlyIncome = "Monthly income is required";
      } else if (isNaN(Number(form.monthlyIncome)) || Number(form.monthlyIncome) < 0) {
        newErrors.monthlyIncome = "Monthly income must be a valid number";
      }
      // collateral is optional
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // On final step, validate again
    if (!validateStep()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const body = {
        amount: Number(form.amount),
        purpose: form.purpose,
        repaymentPeriod: Number(form.repaymentPeriod),
        employmentStatus: form.employmentStatus,
        monthlyIncome: Number(form.monthlyIncome),
        collateral: form.collateral?.trim() || undefined,
      };

      const res = await fetch("https://fintech-dashboard-p1y7.onrender.com/api/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        setModalTitle("Error");
        setModalMessage(data.message || "Unable to apply for loan, please try again.");
      } else {
        setModalTitle("Success");
        setModalMessage("Loan application submitted successfully!"); 
        setForm({
          amount: "",
          purpose: "",
          repaymentPeriod: "",
          employmentStatus: "",
          monthlyIncome: "",
          collateral: "",
        });

        setStep(1);
        setTab("list"); 
        await fetchLoans();
      }
    } catch (err: any) {
      setModalTitle("Error");
      setModalMessage(err.message || "Network error, please try again.");
    } finally {
      setLoading(false);
      setModalOpen(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const fetchLoans = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://fintech-dashboard-p1y7.onrender.com/api/loans", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) setLoans(data.loans || []);
    } catch (err) {
      console.error("Failed to fetch loans", err);
    }
  };

  // Fetch loans when the page mounts
  useEffect(() => {
    fetchLoans();
  }, []);

  // UI for the steps
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Loan Amount</label>
              <input
                type="text"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              />
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Purpose</label>
              <input
                type="text"
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              />
              {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Repayment Period (months)</label>
              <input
                type="text"
                name="repaymentPeriod"
                value={form.repaymentPeriod}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              />
              {errors.repaymentPeriod && <p className="text-red-500 text-sm mt-1">{errors.repaymentPeriod}</p>}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Employment Status</label>
              <select
                name="employmentStatus"
                value={form.employmentStatus}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select status</option>
                <option value="Employed">Employed</option>
                <option value="Self-Employed">Self‑Employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Student">Student</option>
                <option value="Other">Other</option>
              </select>
              {errors.employmentStatus && <p className="text-red-500 text-sm mt-1">{errors.employmentStatus}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Monthly Income</label>
              <input
                type="text"
                name="monthlyIncome"
                value={form.monthlyIncome}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              />
              {errors.monthlyIncome && <p className="text-red-500 text-sm mt-1">{errors.monthlyIncome}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Collateral (optional)</label>
              <input
                type="text"
                name="collateral"
                value={form.collateral}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Review your application</h5>
            <div className="bg-gray-100 dark:bg-gray-800 text-gray-200 p-4 rounded-lg space-y-2">
              <p><span className="font-medium">Loan Amount:</span> {form.amount}</p>
              <p><span className="font-medium">Purpose:</span> {form.purpose}</p>
              <p><span className="font-medium">Repayment Period (months):</span> {form.repaymentPeriod}</p>
              <p><span className="font-medium">Employment Status:</span> {form.employmentStatus}</p>
              <p><span className="font-medium">Monthly Income:</span> {form.monthlyIncome}</p>
              <p><span className="font-medium">Collateral:</span> {form.collateral || "None"}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Page Title */}
      <div className="pagetitle mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Loan Application</h1>
        <nav className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          <ol className="breadcrumb flex space-x-2">
            <li>
              <a href="/" className="text-blue-600 hover:underline">
                Home
              </a>
            </li>
            <li>/</li>
            <li>Financial Overview</li>
            <li>/</li>
            <li className="font-medium text-gray-900 dark:text-white">
              Loans & Credit
            </li>
          </ol>
        </nav>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        <button
          className={`px-4 py-2 ${
            tab === "list"
              ? "border-b-2 border-blue-600 font-semibold text-gray-800 dark:text-white"
              : "text-gray-500"
          }`}
          onClick={() => setTab("list")}
        >
          All Loans
        </button>
        <button
          className={`px-4 py-2 ${
            tab === "apply"
              ? "border-b-2 border-blue-600 font-semibold text-gray-800 dark:text-white"
              : "text-gray-500"
          }`}
          onClick={() => setTab("apply")}
        >
          Apply for Loan
        </button>
      </div>

      {/* List loans */}
      {tab === "list" && (
        <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-900">
          {loans.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">No loan applications found.</p>
          ) : (
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-100">
                  <th className="p-2">Amount</th>
                  <th className="p-2">Purpose</th>
                  <th className="p-2">Repayment</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr
                    key={loan._id}
                    className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700"
                  >
                    <td className="p-2 dark:text-white">₦{loan.amount.toLocaleString()}</td>
                    <td className="p-2 dark:text-white">{loan.purpose}</td>
                    <td className="p-2 dark:text-white">{loan.repaymentPeriod} months</td>
                    <td className="p-2 dark:text-white">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          loan.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : loan.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {loan.status}
                      </span>
                    </td>
                    <td className="p-2 dark:text-white">
                      {new Date(loan.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

    {/* Apply for a loan */}
      {tab === "apply" && (
        <section className="section">
          <div className="card bg-white dark:bg-gray-900 shadow rounded-xl">
            <div className="card-body p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {renderStepContent()}
                <div className="flex justify-between items-center">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:opacity-80"
                      disabled={loading}
                    >
                      Back
                    </button>
                  )}
                  {step < totalSteps && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      disabled={loading}
                    >
                      Next
                    </button>
                  )}
                  {step === totalSteps && (
                    <button
                      type="submit"
                      className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit Application"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Modal for success/error */}
      <Modal
        open={modalOpen}
        title={modalTitle}
        message={modalMessage}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
