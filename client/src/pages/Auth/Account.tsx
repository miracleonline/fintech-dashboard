// src/pages/Auth/Account.tsx
import { useEffect, useState } from "react";

interface AccountInfo {
  id: string;
  name: string;
  email: string;
  status: string;
  address: string;
  phoneNumber: string;
  countryCode: string;
  currentPlan: string;
}

export default function Account() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) setUser(data.user);
      } catch (err) {
        console.error("Error fetching account", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, []);

  return (
    <div>
      {/* Page Title */}
      <div className="pagetitle mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          My Account
        </h1>
        <nav className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          <ol className="breadcrumb flex space-x-2">
            <li>
              <a href="/" className="text-blue-600 hover:underline">
                Home
              </a>
            </li>
            <li>/</li>
            <li>Users</li>
            <li>/</li>
            <li className="font-medium text-gray-900 dark:text-white">
              Account
            </li>
          </ol>
        </nav>
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Card */}
        <div className="col-span-1">
          <div className="card bg-white dark:bg-gray-900 shadow rounded-xl p-6 text-center">
            <img
              src="/assets/img/user.jpg"
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-3"
            />
            {loading ? (
              <p className="text-gray-500 dark:text-gray-400">Loading...</p>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {user?.name}
                </h2>
                <h3 className="text-gray-500 dark:text-gray-400">
                  {user?.email}
                </h3>
                <div className="flex justify-center gap-3 mt-3 text-lg text-gray-500 dark:text-gray-400">
                  <a href="#" className="hover:text-blue-500">
                    <i className="bi bi-twitter" />
                  </a>
                  <a href="#" className="hover:text-blue-600">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="#" className="hover:text-pink-500">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="#" className="hover:text-blue-700">
                    <i className="bi bi-linkedin" />
                  </a>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Card */}
        <div className="col-span-2">
          <div className="card bg-white dark:bg-gray-900 shadow rounded-xl p-6">
            <ul className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              <li className="mr-4">
                <button className="pb-2 text-blue-600 border-b-2 border-blue-600">
                  Overview
                </button>
              </li>
              <li>
                <button className="pb-2 text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  Preferences
                </button>
              </li>
            </ul>

            {loading ? (
              <p className="text-gray-500 dark:text-gray-400">Loading...</p>
            ) : (
              <>
                <h5 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Account Information
                </h5>
                <div className="space-y-3 text-sm">
                  <div className="flex">
                    <span className="w-40 font-medium">Account Name:</span>
                    <span>{user?.name}</span>
                  </div>
                  <div className="flex">
                    <span className="w-40 font-medium">Account Number:</span>
                    <span>{user?._id}</span>
                  </div>
                  <div className="flex">
                    <span className="w-40 font-medium">Account Type:</span>
                    <span>Single Brokerage</span>
                  </div>
                  <div className="flex">
                    <span className="w-40 font-medium">Investment Plan:</span>
                    <span>Starter</span>
                  </div>
                  <div className="flex">
                    <span className="w-40 font-medium">Status:</span>
                    <span>{user?.status}</span>
                  </div>
                  <div className="flex">
                    <span className="w-40 font-medium">Address:</span>
                    <span>{user?.address}</span>
                  </div>
                  <div className="flex">
                    <span className="w-40 font-medium">Phone:</span>
                    <span>
                      {user?.countryCode} {user?.phoneNumber}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-40 font-medium">Email:</span>
                    <span>{user?.email}</span>
                  </div>
                </div>

                <h5 className="text-lg font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                  Account Analysis
                </h5>
                <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">
                  Dive into a detailed analysis of your account investments.
                  Click the buttons below to begin.
                </p>
                <div className="flex gap-3">
                  <a
                    href="/Transfer"
                    className="btn btn-outline-primary px-4 py-2 rounded-lg border text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    Transfer
                  </a>
                  <a
                    href="/assets-chart"
                    className="btn btn-outline-primary px-4 py-2 rounded-lg border text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    View Analysis
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
