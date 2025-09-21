import React from "react";

export default function TermsConditionsPage() {
  return (
    <main className="main">
      {/* Page Title */}
      <div className="pagetitle mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Terms and Conditions</h1>
        <nav className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          <ol className="breadcrumb flex space-x-2">
            <li>
              <a href="/" className="text-blue-600 hover:underline">Home</a>
            </li>
            <li>/</li>
            <li>Dashboard</li>
            <li>/</li>
            <li className="font-medium text-gray-900 dark:text-white">Terms & Conditions</li>
          </ol>
        </nav>
      </div>

      {/* Terms & Conditions Section */}
      <section className="section">
        <div className="row grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="card bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="card-body space-y-4 text-gray-700 dark:text-gray-300">
              <h5 className="card-title text-xl font-semibold">1.0 Introduction</h5>
              <p>
                1.1 Welcome to Pinnacles Financial Services ("Pinnacles," "we," "us," or "our"). These Terms and Conditions ("Terms") govern your use of our website, services, and platforms.<br />
                1.2 By accessing or using Pinnacles's services, you agree to be bound by these Terms. If you are using our products and services, you agree to these terms.
              </p>

              <h5 className="card-title text-xl font-semibold">2.0 Services</h5>
              <p>
                2.1 Pinnacles provides comprehensive financial services designed to help you achieve your financial goals, including:<br />
                2.1.1 Crypto Trading and Investment Management: Our expert team manages and trades cryptocurrencies on your behalf, utilizing advanced strategies to maximize returns and minimize risks.<br />
                2.1.2 Financial Planning: We offer personalized financial planning services to help you plan for your future, manage your wealth, and achieve your long-term financial objectives.<br />
                2.1.3 Daily Profit Generation: Our innovative trading algorithms, bots and market analysis aim to generate profits on a daily basis, providing you with consistent growth of your investments.<br />
                2.1.4 Financial Advice: Our experienced financial advisors provide tailored advice to help you make informed decisions about your investments and overall financial strategy.<br />
                2.1.5 Loans: We offer competitive loan products to meet your financial needs, whether it's for personal use, business expansion, or investment opportunities.<br />
                2.2 Pinnacles's services are provided on an "as-is" and "as-available" basis. We strive to ensure the accuracy, completeness, and timeliness of information provided, and fully guarantee it.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="card-body space-y-4 text-gray-700 dark:text-gray-300">
              <h5 className="card-title text-xl font-semibold">3.0 Eligibility</h5>
              <p>
                3.1 You must be at least 18 years old and legally capable of entering into contracts to use Pinnacles's services.<br />
                3.2 By using our services, you represent and warrant that you meet the eligibility criteria.
              </p>

              <h5 className="card-title text-xl font-semibold">4.0 Registration and Accounts</h5>
              <p>
                4.1 To access certain features of Pinnacles's services, you may need to register and create an account.<br />
                4.2 You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.<br />
                4.3 You agree to provide accurate and complete information during the registration process and to update such information as necessary to keep it accurate and complete.
              </p>

              <h5 className="card-title text-xl font-semibold">5.0 Investor Protection and Risk Management</h5>
              <p>
                5.1 At Pinnacles, we prioritize your financial security. In the unlikely event that you lose all your investments, you are entitled to 50% reimbursement of your total losses. This reflects our commitment to mitigating your risk and supporting your financial well-being.<br />
                5.2 We have implemented robust risk management strategies to protect your investments. Our team uses advanced risk assessment tools and techniques to monitor market conditions and make informed decisions, aiming to minimize potential losses while maximizing returns.<br />
                While we employ thorough risk management practices, it is important to understand that cryptocurrency trading and investment involve significant risk. Prices can fluctuate rapidly, and you may lose most or part of your investment. You should carefully consider your risk tolerance before engaging in cryptocurrency trading and investment.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="card-body space-y-4 text-gray-700 dark:text-gray-300">
              <h5 className="card-title text-xl font-semibold">6.0 Financial Regulations</h5>
              <p>
                6.1 Pinnacles operates in compliance with applicable financial regulations in the United States and other jurisdictions where we conduct business.<br />
                6.2 You agree to comply with all applicable laws, regulations, and reporting requirements related to your use of Pinnacles's services.
              </p>

              <h5 className="card-title text-xl font-semibold">7.0 Privacy Policy</h5>
              <p>
                7.1 Pinnacles respects your privacy and is committed to protecting your personal information. Our Privacy Policy explains how we collect, use, and disclose your information.<br />
                7.2 By using Pinnacles's services, you consent to the collection and use of your information as described in our Privacy Policy.
              </p>

              <h5 className="card-title text-xl font-semibold">8.0 Intellectual Property</h5>
              <p>
                8.1 All content, trademarks, logos, and other intellectual property displayed on Pinnacles's platforms are the property of Pinnacles or its licensors.<br />
                8.2 You may not use, reproduce, modify, or distribute any content from Pinnacles's platforms without prior written permission.
              </p>

              <h5 className="card-title text-xl font-semibold">9.0 Limitation of Liability</h5>
              <p>
                9.1 To the fullest extent permitted by law, Pinnacles and its affiliates shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with your use of our services, except as explicitly stated in Section 5.1.<br />
                9.2 Pinnacles's total liability for any claims arising under these Terms shall not exceed the amount paid by you, if any, for the use of our services.
              </p>

              <h5 className="card-title text-xl font-semibold">10.0 Indemnification</h5>
              <p>
                10.1 You agree to indemnify and hold harmless Pinnacles, its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way related to your use of our services, except where such claims or liabilities are a direct result of Pinnacles's gross negligence or willful misconduct.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="card-body space-y-4 text-gray-700 dark:text-gray-300">
              <h5 className="card-title text-xl font-semibold">11.0 Modification of Terms</h5>
              <p>
                11.1 Pinnacles reserves the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website.<br />
                11.2 By continuing to use Pinnacles's services after changes to these Terms, you agree to be bound by the updated Terms.
              </p>

              <h5 className="card-title text-xl font-semibold">12.0 Governing Law and Dispute Resolution</h5>
              <p>
                12.1 These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflicts of law provisions.<br />
                12.2 Any dispute arising out of or in connection with these Terms shall be resolved through arbitration administered by the American Arbitration Association in New York, NY.
              </p>

              <h5 className="card-title text-xl font-semibold">13.0 Severability</h5>
              <p>
                13.1 If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>

              <h5 className="card-title text-xl font-semibold">14.0 Client Support and Feedback</h5>
              <p>
                14.1 At Pinnacles, we value our clients' feedback and strive to provide exceptional support. If you have any questions, concerns, or feedback, please contact our support team at <a href="mailto:support@pinnaclesfinancialservice.com" className="text-blue-600 hover:underline">support@pinnaclesfinancialservice.com</a><br />
                14.2 We are committed to resolving any issues promptly and fairly, ensuring a positive experience
                14.2 We are committed to resolving any issues promptly and fairly, ensuring a positive experience with our services.
              </p>

              <h5 className="card-title text-xl font-semibold">15.0 Commitment to Transparency</h5>
              <p>
                15.1 Pinnacles is committed to maintaining transparency in our operations. We provide clear and comprehensive information about our fees, services, and policies to help you make informed decisions.
              </p>

              <h5 className="card-title text-xl font-semibold">16.0 Contact Us</h5>
              <p>
                16.1 If you have any questions or concerns about these Terms, please contact us at <a href="mailto:support@pinnaclesfinancialservice.com" className="text-blue-600 hover:underline">support@pinnaclesfinancialservice.com</a><br />
                16.2 You can also reach out to us by sending a message through our website using the "contact us" option.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
