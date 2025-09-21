// components/TransactionFormModal.tsx
import { useState } from "react";

interface Props {
  type: "credit" | "debit";
  onClose: () => void;
  onSuccess?: () => void;
  showMessage?: (title: string, message: string) => void;
}

export default function TransactionFormModal({ type, onClose, onSuccess }: Props) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          amount: parseFloat(amount),
          description,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Transaction failed");

      onSuccess?.();
      onClose();
      showMessage?.("Transaction Successful", `Your ${type} of ₦${amount} was completed.`);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          {type === "credit" ? "Add Funds" : "Withdraw Funds"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 dark:text-gray-300">Amount (₦)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 dark:text-gray-300">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={type === "credit" ? "e.g. Add funds via bank" : "e.g. Withdraw to bank"}
              className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
            />
          </div>

          {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-700 dark:text-white"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
