// src/pages/FractionalChartsPage.tsx

import React from "react";
import Chart from "react-apexcharts";

export default function FractionalChartsPage() {
  const areaOptions = {
    chart: { type: 'area' },
    xaxis: { categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'] }
  };
  const areaSeries = [
    { name: 'AAPL Fractional', data: [120, 125, 123, 130] },
    { name: 'TSLA Fractional', data: [240, 250, 248, 255] }
  ];

  const donutOptions = {
    chart: { type: 'donut' },
    labels: ['AAPL', 'TSLA', 'AMZN', 'GOOG'],
    legend: { position: 'bottom' }
  };
  const donutSeries = [30, 25, 20, 25];

  const columnOptions = {
    chart: { type: 'bar' },
    xaxis: { categories: ['AAPL', 'TSLA', 'AMZN', 'GOOG'] }
  };
  const columnSeries = [{ name: 'Ownership (%)', data: [45, 35, 55, 25] }];

  const radarOptions = {
    chart: { type: 'radar' },
    labels: ['Growth', 'Dividends', 'Stability', 'Liquidity']
  };
  const radarSeries = [
    { name: 'AAPL', data: [85, 70, 90, 95] },
    { name: 'TSLA', data: [95, 40, 70, 85] }
  ];

  return (
    <main className="main">
      <div className="pagetitle mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Fractional Charts</h1>
        <nav className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          <ol className="breadcrumb flex space-x-2">
            <li><a href="/" className="text-blue-600 hover:underline">Home</a></li>
            <li>/</li>
            <li>Market Analysis</li>
            <li>/</li>
            <li className="font-medium text-gray-900 dark:text-white">Fractional Charts</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="row">
          {/* Area Chart */}
          <div className="col-lg-6">
            <div className="card"><div className="card-body">
              <h5 className="card-title dark:text-white">Fractional Price Trend</h5>
              <Chart options={areaOptions} series={areaSeries} type="area" height={350} />
            </div></div>
          </div>

          {/* Donut Chart */}
          <div className="col-lg-6">
            <div className="card"><div className="card-body">
              <h5 className="card-title dark:text-white">User Portfolio Allocation</h5>
              <Chart options={donutOptions} series={donutSeries} type="donut" height={350} />
            </div></div>
          </div>

          {/* Bar Chart */}
          <div className="col-lg-6">
            <div className="card"><div className="card-body">
              <h5 className="card-title dark:text-white">Ownership Percentages</h5>
              <Chart options={columnOptions} series={columnSeries} type="bar" height={350} />
            </div></div>
          </div>

          {/* Radar Chart */}
          <div className="col-lg-6">
            <div className="card"><div className="card-body">
              <h5 className="card-title dark:text-white">Fractional Comparison</h5>
              <Chart options={radarOptions} series={radarSeries} type="radar" height={350} />
            </div></div>
          </div>
        </div>
      </section>
    </main>
  );
}
