import React, { useContext, useState } from "react";
import { AdminContext } from "../Context/AdminContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const { products, users, totalRevenue } = useContext(AdminContext);

  const blockedUsersCount = users.filter(
    (user) => user.status === false
  ).length;
  const emptyStockCount = products.filter(
    (product) => product.stock === 0
  ).length;

  const categoryCounts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = 1;
    } else {
      acc[product.category]++;
    }
    return acc;
  }, {});

  categoryCounts["All"] = products.length;
  const categoryColorMap = {
    cat: "#2196F3",
    dog: "#4CAF50",
    bird: "#FF9800",
    fish: "#9C27B0",
    default: "#607D8B",
  };

  const pieChartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Product Distribution",
        data: Object.values(categoryCounts),
        backgroundColor: Object.keys(categoryCounts).map(
          (category) => categoryColorMap[category] || categoryColorMap.default
        ),
        hoverBackgroundColor: Object.keys(categoryCounts).map(
          (category) => categoryColorMap[category] || categoryColorMap.default
        ),
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const category = pieChartData.labels[tooltipItem.dataIndex];
            const value = pieChartData.datasets[0].data[tooltipItem.dataIndex];
            return `${category}: ${value}`;
          },
        },
      },
      title: {
        display: true,
        text: "Category Distribution",
      },
    },
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Admin Dashboard</h2>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-700">Blocked Users</h3>
          <p className="text-3xl font-extrabold text-red-500">
            {blockedUsersCount}
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-700">
            Empty Stock Products
          </h3>
          <p className="text-3xl font-extrabold text-yellow-500">
            {emptyStockCount}
          </p>
        </div>

        <div className="col-span-1 p-6 transition-transform transform bg-white rounded-lg shadow-lg md:col-span-3 hover:scale-105 hover:shadow-2xl">
          {" "}
          <h3 className="text-xl font-semibold text-gray-700">
            Total Sales
          </h3>{" "}
          <p className="text-3xl font-extrabold text-green-500">
            ₹{totalRevenue}
          </p>{" "}
        </div>
      </div>

      {/* Category Counts */}
      <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
        {Object.keys(categoryCounts).map((category) => (
          <div
            key={category}
            className="p-6 transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl"
          >
            <h2 className="text-xl font-semibold text-gray-700 capitalize">
              {category}
            </h2>
            <p className="text-3xl font-extrabold text-blue-500">
              {categoryCounts[category]}
            </p>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="p-6 mt-10 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-700">
          Category Distribution
        </h3>
        <div className="w-2/3 mx-auto">
          <Pie
            data={pieChartData}
            options={{
              ...pieChartOptions,
              maintainAspectRatio: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
