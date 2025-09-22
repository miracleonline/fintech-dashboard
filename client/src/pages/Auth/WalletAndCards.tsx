import { useEffect, useState } from "react";

interface User {
  name: string;
  balance: number;
}

export default function WalletAndCards() {
  const [tab, setTab] = useState<"credit" | "debit">("credit");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUser({
            name: data.user.name,
            balance: data.user.balanceCents / 100,
          });
        } else {
          console.error("Failed to fetch user data", data.message);
        }
      } catch (err) {
        console.error("Error fetching user data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const renderCard = (type: "Credit" | "Debit") => (
    <div className="relative max-w-sm mx-auto mt-6 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl shadow-xl p-6">
      <div className="text-lg font-semibold">{type} Card</div>
      <div className="mt-6 text-xl tracking-widest font-mono">**** **** **** {type === "Credit" ? "1234" : "5678"}</div>
      <div className="flex justify-between mt-4 text-sm">
        <div>
          <p className="uppercase text-gray-200">Card Holder</p>
          <p className="font-semibold">{user?.name || "Loading..."}</p>
        </div>
        <div>
          <p className="uppercase text-gray-200">Expires</p>
          <p className="font-semibold">{type === "Credit" ? "12/27" : "08/26"}</p>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm uppercase text-gray-200">Wallet Balance</p>
        <p className="text-2xl font-bold">
          {user ? `₦${user.balance.toLocaleString()}` : "Loading..."}
        </p>
      </div>
    </div>
  );

  return (
    <div>
      {/* Page Title */}
      <div className="pagetitle mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Wallet & Cards</h1>
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
            <li className="font-medium text-gray-900 dark:text-white">Wallet & Cards</li>
          </ol>
        </nav>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        <button
          className={`px-4 py-2 ${
            tab === "credit"
              ? "border-b-2 border-blue-600 font-semibold text-gray-800 dark:text-white"
              : "text-gray-500"
          }`}
          onClick={() => setTab("credit")}
        >
          Credit Card
        </button>
        <button
          className={`px-4 py-2 ${
            tab === "debit"
              ? "border-b-2 border-blue-600 font-semibold text-gray-800 dark:text-white"
              : "text-gray-500"
          }`}
          onClick={() => setTab("debit")}
        >
          Debit Card
        </button>
      </div>

      {/* Loading State */}
      {loading && <p className="text-center text-gray-500 dark:text-gray-300">Loading wallet info...</p>}

      {/* Card Content */}
      {!loading && tab === "credit" && renderCard("Credit")}
      {!loading && tab === "debit" && renderCard("Debit")}
    </div>
  );
}
