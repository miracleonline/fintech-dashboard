// src/pages/ETFChartsPage.tsx

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function ETFChartsPage() {
  const [lineSeries, setLineSeries] = useState<number[]>([10,41,35,51,49,62,69,91,148]);
  const [lineCategories, setLineCategories] = useState<string[]>(['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep']);

  const lineOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: { enabled: false }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'straight' },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      }
    },
    xaxis: {
      categories: lineCategories
    }
  };

  const areaSeries = [
    {
      name: "STOCK ABC",
      data: [
        8107.85,8128.0,8122.9,8165.5,8340.7,8423.7,8423.5,8514.3,8481.85,8487.7,
        8506.9,8626.2,8668.95,8602.3,8607.55,8512.9,8496.25,8600.65,8881.1,9340.85
      ]
    }
  ];
  const areaCategories = [
    "13 Nov 2017","14 Nov 2017","15 Nov 2017","16 Nov 2017","17 Nov 2017","20 Nov 2017",
    "21 Nov 2017","22 Nov 2017","23 Nov 2017","24 Nov 2017","27 Nov 2017","28 Nov 2017",
    "29 Nov 2017","30 Nov 2017","01 Dec 2017","04 Dec 2017","05 Dec 2017","06 Dec 2017",
    "07 Dec 2017","08 Dec 2017"
  ];

  const areaOptions = {
    chart: {
      type: 'area',
      height: 350,
      zoom: { enabled: false }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'straight' },
    labels: areaCategories,
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      opposite: true
    },
    legend: { horizontalAlign: 'left' },
    subtitle: {
      text: 'Price Movements',
      align: 'left'
    }
  };

  const columnSeries = [
    {
      name: 'Net Profit',
      data: [44,55,57,56,61,58,63,60,66]
    },
    {
      name: 'Revenue',
      data: [76,85,101,98,87,105,91,114,94]
    },
    {
      name: 'Free Cash Flow',
      data: [35,41,36,26,45,48,52,53,41]
    }
  ];

  const columnOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      }
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: { categories: ['Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'] },
    yaxis: {
      title: {
        text: '$ (thousands)'
      }
    },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: (val: number) => `$ ${val} thousands`
      }
    }
  };

  return (
    <main className="main">
      {/* Page Title */}
      <div className="pagetitle mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          ETF Charts
        </h1>

        <nav className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          <ol className="breadcrumb flex space-x-2">
            <li>
              <a href="/" className="text-blue-600 hover:underline">Home</a>
            </li>
            <li>/</li>
            <li>Market analysis</li>
            <li>/</li>
            <li className="font-medium text-gray-900 dark:text-white">ETF Charts</li>
          </ol>
        </nav>
      </div>

      <p className="dark:text-white">ETF market charts. You can check the <a href="#" className="text-blue-600 underline">Payday blog</a> for detailed price analysis.</p>

      <section className="section">
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title dark:text-white">iShares Bitcoin Trust (IBIT) Chart</h5>
                <Chart
                  options={lineOptions}
                  series={[{ name: "IBIT", data: lineSeries }]}
                  type="line"
                  height={350}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title dark:text-white">VanEck Ethereum Strategy ETF (EFUT) Chart</h5>
                <Chart
                  options={areaOptions}
                  series={areaSeries}
                  type="area"
                  height={350}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title dark:text-white">Roundhill Bitcoin Covered Call Strategy ETF (YBTC) Chart</h5>
                <Chart
                  options={columnOptions}
                  series={columnSeries}
                  type="bar"
                  height={350}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title dark:text-white">ETF Sector Allocation</h5>
                <Chart
                  options={{
                    chart: { type: "donut" },
                    labels: ["Tech", "Energy", "Finance", "Healthcare"],
                    legend: { position: "bottom" }
                  }}
                  series={[40, 25, 20, 15]}
                  type="donut"
                  height={350}
                />
              </div>
            </div>
          </div>

          {/* Add more cards here */}
        </div>
      </section>
    </main>
  );
}
