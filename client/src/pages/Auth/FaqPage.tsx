import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
  {
    question: "What is Pinnacles Financial Services?",
    answer:
      "Pinnacles Financial Services is a global investment management company dedicated to helping individuals and organizations achieve their financial goals through personalized investment strategies.",
  },
  {
    question: "How do I create an account?",
    answer:
      "You can create an account by clicking the Sign Up button on our homepage and following the registration process. Make sure to provide accurate information.",
  },
  {
    question: "What types of investments do you offer?",
    answer:
      "We offer a diverse portfolio including stocks, cryptocurrency, bonds, real estate, commodities, and alternative investments tailored to your financial objectives.",
  },
  {
    question: "Is my investment safe?",
    answer:
      "While we employ advanced risk management techniques and reimburse 50% of losses under certain conditions, all investments carry risks. Please review our risk disclosures carefully.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact our support team via email at support@pinnaclesfinancialservice.com or use the Live Chat option on our website for instant assistance.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="main">
      {/* Page Title */}
      <div className="pagetitle mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Frequently Asked Questions</h1>
        <nav className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          <ol className="breadcrumb flex space-x-2">
            <li>
              <a href="/" className="text-blue-600 hover:underline">Home</a>
            </li>
            <li>/</li>
            <li>Dashboard</li>
            <li>/</li>
            <li className="font-medium text-gray-900 dark:text-white">F.A.Q</li>
          </ol>
        </nav>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                {faq.question}
              </span>
              <span className="ml-4 text-blue-600">
                {openIndex === index ? (
                  <FiChevronUp size={24} />
                ) : (
                  <FiChevronDown size={24} />
                )}
              </span>
            </button>

            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-96 py-4" : "max-h-0"
              }`}
            >
              <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
