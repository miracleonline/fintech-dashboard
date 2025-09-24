// src/pages/Auth/AccountHistory.tsx
import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description?: string;
  occurredAt: string;
  status: "Completed" | "Pending" | "Failed";
}

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function AccountHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(false);

  // filters
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });
        if (type) params.append("type", type);
        if (status) params.append("status", status);
        if (start) params.append("start", start);
        if (end) params.append("end", end);
        if (search) params.append("search", search);

        const token = localStorage.getItem("token");

        const res = await fetch(`https://fintech-dashboard-p1y7.onrender.com/api/transactions?${params.toString()}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
        });
        const data = await res.json();

        if (data.success) {
          // Mock transactions
        const mockTransactions: Transaction[] = [
          {
            id: "mock-1",
            type: "credit",
            amount: 1500,
            description: "Mock Salary Payment",
            occurredAt: new Date().toISOString(),
            status: "Completed",
          },
          {
            id: "mock-2",
            type: "debit",
            amount: 200,
            description: "Mock Grocery Shopping",
            occurredAt: new Date().toISOString(),
            status: "Completed",
          },
          {
            id: "mock-3",
            type: "credit",
            amount: 500,
            description: "Mock Refund from Vendor",
            occurredAt: new Date().toISOString(),
            status: "Pending",
          },
          {
            id: "mock-4",
            type: "debit",
            amount: 300,
            description: "Mock Utility Bill",
            occurredAt: new Date().toISOString(),
            status: "Failed",
          },
        ];

        // Include mock data to fetched transactions
        setTransactions([...data.transactions, ...mockTransactions]);
        setMeta({
          ...data.meta,
          total: data.meta.total + mockTransactions.length,
        });
      }
      } catch (err) {
        console.error("Error fetching transactions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [page, limit, type, status, start, end, search]);

  const clearFilter = (filter: string) => {
    if (filter === "search") setSearch("");
    if (filter === "type") setType("");
    if (filter === "status") setStatus("");
    if (filter === "date") {
      setStart("");
      setEnd("");
    }
    setPage(1);
  };

  return (
    <div>
      {/* Page Title */}
      <div className="pagetitle mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Account History</h1>
        <nav className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          <ol className="breadcrumb flex space-x-2">
            <li>
              <a href="/" className="text-blue-600 hover:underline">Home</a>
            </li>
            <li>/</li>
            <li>Financial Overview</li>
            <li>/</li>
            <li className="font-medium text-gray-900 dark:text-white">Transaction History</li>
          </ol>
        </nav>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-3">
        <input
          type="text"
          placeholder="Search description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
        >
          <option value="">All Types</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
        >
          <option value="">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
        />
        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Active Filter Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {search && (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            Search: {search}
            <button onClick={() => clearFilter("search")} className="ml-1 text-blue-500 hover:text-blue-700">×</button>
          </span>
        )}
        {type && (
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            Type: {type}
            <button onClick={() => clearFilter("type")} className="ml-1 text-purple-500 hover:text-purple-700">×</button>
          </span>
        )}
        {status && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            Status: {status}
            <button onClick={() => clearFilter("status")} className="ml-1 text-green-500 hover:text-green-700">×</button>
          </span>
        )}
        {(start || end) && (
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            Start Date - End Date: {start || "…"} → {end || "…"}
            <button onClick={() => clearFilter("date")} className="ml-1 text-gray-500 hover:text-gray-700">×</button>
          </span>
        )}
      </div>

      {/* Transaction Table */}
      <section className="section">
        <div className="card bg-white text-gray-800 dark:text-gray-200 dark:bg-gray-900 shadow rounded-xl">
          <div className="card-body p-6">
            <h5 className="card-title text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Transaction history <span className="text-sm">| This month</span>
            </h5>

            {loading ? (
              <p className="text-gray-500 dark:text-gray-400">Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="py-2 px-3">Id</th>
                      <th className="py-2 px-3">Type</th>
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3">Amount</th>
                      <th className="py-2 px-3">Status</th>
                      <th className="py-2 px-3">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length > 0 ? (
                      transactions.map((t) => (
                        <tr key={t.id} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 px-3">#{t.id}</td>
                          <td className="py-2 px-3 capitalize">{t.type}</td>
                          <td className="py-2 px-3">{new Date(t.occurredAt).toLocaleDateString()}</td>
                          <td className="py-2 px-3">${t.amount}</td>
                          <td
                            className={`py-2 px-3 font-medium ${
                              t.status === "Completed"
                                ? "text-green-500"
                                : t.status === "Pending"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            {t.status}
                          </td>
                          <td className="py-2 px-3">{t.description || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-4 px-3 text-center text-gray-500 dark:text-gray-400">
                          No transactions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {meta && transactions.length > 0 && (
              <div className="flex items-center justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  Showing {(page - 1) * limit + 1} to{" "}
                  {Math.min(page * limit, meta.total)} of {meta.total} entries
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1);
                    }}
                    className="border rounded-lg px-2 py-1 dark:bg-gray-800 dark:text-white"
                  >
                    {[10, 25, 50, 100].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50 dark:bg-gray-800 dark:text-white"
                  >
                    Prev
                  </button>
                  <span>
                    Page {page} of {meta.totalPages}
                  </span>
                  <button
                    disabled={page === meta.totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50 dark:bg-gray-800 dark:text-white"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
