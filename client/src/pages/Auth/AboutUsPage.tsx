
export default function AboutUsPage() {
  return (
    <main className="main">
      {/* Page Title */}
      <div className="pagetitle mb-4">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">About Us</h1>
        <nav className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          <ol className="breadcrumb flex space-x-2">
            <li>
              <a href="/" className="text-blue-600 hover:underline">Home</a>
            </li>
            <li>/</li>
            <li>Dashboard</li>
            <li>/</li>
            <li className="font-medium text-gray-900 dark:text-white">About Us</li>
          </ol>
        </nav>
      </div>

      {/* About Us Section */}
      <section className="section">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6 text-gray-700 dark:text-gray-300">
          <p>
            We are the leading global investment management company dedicated to empowering individuals and organizations in achieving their financial goals. At <strong className="text-blue-600 dark:text-blue-400">Pinnacles Financial</strong>, we understand that successful investing requires a combination of astute decision-making, in-depth market analysis, and a forward-thinking approach. With a team of seasoned financial experts, we provide our clients with personalized investment strategies tailored to their unique needs and aspirations.
          </p>

          <p>
            Our diverse portfolio spans across various asset classes, including stocks, cryptocurrency, bonds, real estate, commodities, and alternative investments. We pride ourselves on the use of cutting-edge technology and data analytics to enhance our investment strategies. Our global reach enables us to identify and capitalize on investment opportunities around the world, delivering comprehensive solutions that align with our clients' return objectives. We actively integrate environmental, social, and governance (ESG) factors into our investment decisions, aiming to generate sustainable returns while making a positive impact on society and the environment.
          </p>

          <p>
            We prioritize the interests of our clients above all else and strive to foster long-lasting partnerships based on mutual respect and shared success. Beyond our dedication to financial growth, <strong className="text-blue-600 dark:text-blue-400">Pinnacles InCo</strong> is committed to responsible investing. By understanding global economic trends, regulatory environments, and emerging opportunities, we ensure our clients are well-equipped to make informed investment decisions. Experience our unwavering commitment to excellence, personalized service, and a relentless pursuit of your financial success. Together, we will navigate the global markets and embark on a journey towards prosperity.
          </p>
        </div>
      </section>
    </main>
  );
}
