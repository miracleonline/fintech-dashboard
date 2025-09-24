import { useState } from "react";

export default function ReferralsRewardsPage() {
  const [referralLink] = useState("https://miracle.com/referral?code=XYZ123");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      alert("Referral link copied!");
    });
  };

  return (
    <main className="main">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Referrals & Rewards
        </h1>
        <nav className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          <ol className="flex space-x-2">
            <li>
              <a href="/" className="text-blue-600 hover:underline">
                Home
              </a>
            </li>
            <li>/</li>
            <li>Dashboard</li>
            <li>/</li>
            <li className="font-medium text-gray-900 dark:text-white">
              Referrals & Rewards
            </li>
          </ol>
        </nav>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Referral Card */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Referral Link
          </h2>

          <div className="flex items-center mb-4">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-r-md hover:bg-blue-700 transition"
              onClick={copyToClipboard}
            >
              Copy Link
            </button>
          </div>

          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
            Refer 4 more friends <span className="text-sm text-gray-500">| Task Level 1</span>
          </h3>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4 overflow-hidden">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-300"
              style={{ width: "25%" }}
            ></div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            Copy your referral link and share it with friends to earn a{" "}
            <strong>35% commission</strong> plus <strong>1025 USDT</strong> rewards for each referral
            who registers using your link.
          </p>
        </div>

        {/* Rewards Card */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Payday Rewards and Bonus
          </h2>

          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>Current Rewards:</strong> $0
            </p>
            <p>
              <strong>Next Payout:</strong> --/--/----
            </p>
            <p>
              <strong>Details:</strong> Earn rewards based on your investment performance. Rewards are
              calculated monthly and credited directly to your account.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
