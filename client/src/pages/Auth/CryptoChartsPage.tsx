// src/pages/CryptoChartsPage.tsx

import React from "react";
import Chart from "react-apexcharts";

export default function CryptoChartsPage() {
  const pieOptions = {
    chart: { type: 'pie' },
    labels: ['Bitcoin', 'Ethereum', 'Solana', 'Other'],
    legend: { position: 'bottom' }
  };
  const pieSeries = [55, 25, 10, 10];

  const barOptions = {
    chart: { type: 'bar' },
    xaxis: { categories: ['BTC', 'ETH', 'SOL', 'XRP'] }
  };
  const barSeries = [{ name: 'Market Cap ($B)', data: [800, 350, 70, 50] }];

  const radarOptions = {
    chart: { type: 'radar' },
    labels: ['Volatility', 'Liquidity', 'Adoption', 'Security', 'Utility']
  };
  const radarSeries = [
    { name: 'Bitcoin', data: [90, 95, 85, 98, 60] },
    { name: 'Ethereum', data: [85, 90, 88, 92, 85] }
  ];

  const lineOptions = {
    chart: { type: 'line' },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] }
  };
  const lineSeries = [{ name: 'BTC Price', data: [27100, 27550, 26900, 27350, 28000] }];

  return (
    <main className="main">
      <div className="pagetitle mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Crypto Charts</h1>
        <nav className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          <ol className="breadcrumb flex space-x-2">
            <li><a href="/" className="text-blue-600 hover:underline">Home</a></li>
            <li>/</li>
            <li>Market Analysis</li>
            <li>/</li>
            <li className="font-medium text-gray-900 dark:text-white">Crypto Charts</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="row">
          {/* Pie Chart */}
          <div className="col-lg-6">
            <div className="card"><div className="card-body">
              <h5 className="card-title">Crypto Market Share</h5>
              <Chart options={pieOptions} series={pieSeries} type="pie" height={350} />
            </div></div>
          </div>

          {/* Bar Chart */}
          <div className="col-lg-6">
            <div className="card"><div className="card-body">
              <h5 className="card-title">Top Crypto Market Cap</h5>
              <Chart options={barOptions} series={barSeries} type="bar" height={350} />
            </div></div>
          </div>

          {/* Radar Chart */}
          <div className="col-lg-6">
            <div className="card"><div className="card-body">
              <h5 className="card-title">Crypto Feature Comparison</h5>
              <Chart options={radarOptions} series={radarSeries} type="radar" height={350} />
            </div></div>
          </div>

          {/* Line Chart */}
          <div className="col-lg-6">
            <div className="card"><div className="card-body">
              <h5 className="card-title">BTC Price (Last 5 Days)</h5>
              <Chart options={lineOptions} series={lineSeries} type="line" height={350} />
            </div></div>
          </div>
        </div>
      </section>
    </main>
  );
}
