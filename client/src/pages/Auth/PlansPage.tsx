// src/pages/PlansPage.tsx
import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter Plan",
    price: "$500",
    features: [
      "Sign-up bonus included",
      "Weekly ROI 5%",
      "24/7 Support",
      "Withdrawal anytime",
    ],
    popular: false,
  },
  {
    name: "Premium Plan",
    price: "$5,000",
    features: [
      "Higher weekly ROI 8%",
      "Personal account manager",
      "Priority withdrawals",
      "Exclusive webinars",
    ],
    popular: true,
  },
  {
    name: "Enterprise Plan",
    price: "$20,000",
    features: [
      "Premium ROI 12%",
      "VIP support access",
      "Market insights",
      "Dedicated advisor",
    ],
    popular: false,
  },
];

export default function PlansPage() {
  return (
    <div>
      {/* Page Title */}
      <div className="pagetitle mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Account Plan
        </h1>
        <nav className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          <ol className="breadcrumb flex space-x-2">
            <li>
              <a href="/" className="text-blue-600 hover:underline">
                Home
              </a>
            </li>
            <li>/</li>
            <li>Account Settings</li>
            <li>/</li>
            <li className="font-medium text-gray-900 dark:text-white">
              Upgrade Plan
            </li>
          </ol>
        </nav>
      </div>

      {/* Page Content Container */}
      <section className="section">
        <div className="card bg-white dark:bg-gray-900 shadow rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Upgrade Your Investment Plan
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Choose a plan that fits your financial goals.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-2xl shadow border transition-transform hover:scale-105 p-6 flex flex-col h-full
                  ${
                    plan.popular
                      ? "border-blue-600 dark:border-blue-500 scale-105"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
              >
                {/* Title */}
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                  {plan.name}
                </h2>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  {plan.price}
                </p>

                {/* Features */}
                <ul className="space-y-2 flex-1">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center text-gray-700 dark:text-gray-300"
                    >
                      <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className="mt-6 w-full flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                  Select Plan <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-4 mt-8">
        © {new Date().getFullYear()} Payday Investment Company. All Rights Reserved. Powered by{" "}
        <a href="https://paydayfinancialservice.com/" className="text-blue-600 hover:underline">
          Technology
        </a>
      </footer>
    </div>
  );
}
