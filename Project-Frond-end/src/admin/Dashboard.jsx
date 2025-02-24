// import React, { useContext, useState } from "react";
// import { AdminContext } from "../Context/AdminContext";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


// ChartJS.register(ArcElement, Tooltip, Legend);

// function Dashboard() {
//   const { products, users, totalRevenue } = useContext(AdminContext);

//   const blockedUsersCount = users.filter(
//     (user) => user.status === false
//   ).length;
//   const emptyStockCount = products.filter(
//     (product) => product.stock === 0
//   ).length;

//   const categoryCounts = products.reduce((acc, product) => {
//     if (!acc[product.category]) {
//       acc[product.category] = 1;
//     } else {
//       acc[product.category]++;
//     }
//     return acc;
//   }, {});

//   categoryCounts["All"] = products.length;
//   const categoryColorMap = {
//     cat: "#2196F3",
//     dog: "#4CAF50",
//     bird: "#FF9800",
//     fish: "#9C27B0",
//     default: "#607D8B",
//   };

//   const pieChartData = {
//     labels: Object.keys(categoryCounts),
//     datasets: [
//       {
//         label: "Product Distribution",
//         data: Object.values(categoryCounts),
//         backgroundColor: Object.keys(categoryCounts).map(
//           (category) => categoryColorMap[category] || categoryColorMap.default
//         ),
//         hoverBackgroundColor: Object.keys(categoryCounts).map(
//           (category) => categoryColorMap[category] || categoryColorMap.default
//         ),
//         borderWidth: 1,
//       },
//     ],
//   };

//   const pieChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "right",
//       },
//       tooltip: {
//         callbacks: {
//           label: (tooltipItem) => {
//             const category = pieChartData.labels[tooltipItem.dataIndex];
//             const value = pieChartData.datasets[0].data[tooltipItem.dataIndex];
//             return `${category}: ${value}`;
//           },
//         },
//       },
//       title: {
//         display: true,
//         text: "Category Distribution",
//       },
//     },
//   };

//   return (
//     <div className="p-6 bg-gray-50">
//       <h2 className="mb-6 text-3xl font-bold text-gray-800">Admin Dashboard</h2>

//       {/* Statistics Summary */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//         <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105">
//           <h3 className="text-xl font-semibold text-gray-700">Blocked Users</h3>
//           <p className="text-3xl font-extrabold text-red-500">
//             {blockedUsersCount}
//           </p>
//         </div>
//         <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105">
//           <h3 className="text-xl font-semibold text-gray-700">
//             Empty Stock Products
//           </h3>
//           <p className="text-3xl font-extrabold text-yellow-500">
//             {emptyStockCount}
//           </p>
//         </div>

//         <div className="col-span-1 p-6 transition-transform transform bg-white rounded-lg shadow-lg md:col-span-3 hover:scale-105 hover:shadow-2xl">
//           {" "}
//           <h3 className="text-xl font-semibold text-gray-700">
//             Total Sales
//           </h3>{" "}
//           <p className="text-3xl font-extrabold text-green-500">
//             ₹{totalRevenue}
//           </p>{" "}
//         </div>
//       </div>

//       {/* Category Counts */}
//       <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
//         {Object.keys(categoryCounts).map((category) => (
//           <div
//             key={category}
//             className="p-6 transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl"
//           >
//             <h2 className="text-xl font-semibold text-gray-700 capitalize">
//               {category}
//             </h2>
//             <p className="text-3xl font-extrabold text-blue-500">
//               {categoryCounts[category]}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Pie Chart */}
//       <div className="p-6 mt-10 bg-white rounded-lg shadow-lg">
//         <h3 className="text-xl font-semibold text-gray-700">
//           Category Distribution
//         </h3>
//         <div className="w-2/3 mx-auto">
//           <Pie
//             data={pieChartData}
//             options={{
//               ...pieChartOptions,
//               maintainAspectRatio: true,
//             }}
//           />
//         </div>
//       </div>
//     </div>                                                                                                                                                                                                                                                                                                
//   );
// }

// export default Dashboard;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getTopSellingProducts } from "../Slices/ProductSlice";
// import { TrendingUp, ShoppingCart } from "lucide-react";
// import { fetchRevenue } from "../Slices/OrderSlice";

// function Dashboard() {
//   const dispatch = useDispatch();
//   const { topSellingProducts  } = useSelector((state) => state.products);
//   const { totalRevenue } = useSelector((state) => state.orders)
  
//   useEffect(() => {
//     dispatch(getTopSellingProducts());
//     dispatch(fetchRevenue())
//   }, [dispatch]);

//   // Calculate total sales by summing totalSold from all products
//   const totalSales = topSellingProducts?.reduce((acc, product) => acc + product.totalSold, 0) || 0;

//   return (
//     <div className="min-h-screen p-8 bg-gray-100">
//       {/* Dashboard Header */}
//       <h2 className="mb-6 text-4xl font-extrabold text-gray-800">Admin Dashboard</h2>

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {/* Total Sales Card */}
//         <div className="flex items-center p-6 space-x-4 bg-white shadow-lg rounded-2xl">
//           <div className="p-4 bg-blue-100 rounded-full">
//             <ShoppingCart className="w-8 h-8 text-blue-600" />
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-gray-700">Total Sales</h3>
//             <p className="mt-1 text-2xl font-bold text-blue-600">{totalSales} Units</p>
//           </div>
//         </div>

//         {/* Top Selling Products Card */}
//         <div className="flex items-center p-6 space-x-4 bg-white shadow-lg rounded-2xl">
//           <div className="p-4 bg-green-100 rounded-full">
//             <TrendingUp className="w-8 h-8 text-green-600" />
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-gray-700">Top Selling Product</h3>
//             <p className="mt-1 text-xl font-bold text-green-600">
//               {topSellingProducts?.[0]?.name || "No data"}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Top Selling Products Table */}
//       <div className="p-6 mt-8 bg-white shadow-lg rounded-2xl">
//         <h3 className="mb-4 text-xl font-semibold text-gray-800">Top Selling Products</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full border border-collapse border-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left border-b">#</th>
//                 <th className="p-3 text-left border-b">Product Name</th>
//                 <th className="p-3 text-left border-b">Total Sold</th>
//               </tr>
//             </thead>
//             <tbody>
//               {topSellingProducts?.slice(0, 5).map((product, index) => (
//                 <tr key={product._id} className="border-b hover:bg-gray-50">
//                   <td className="p-3">{index + 1}</td>
//                   <td className="p-3">{product.name}</td>
//                   <td className="p-3 font-bold text-blue-600">{product.totalSold}</td>
//                 </tr>
//               ))}
//               {topSellingProducts?.length === 0 && (
//                 <tr>
//                   <td colSpan="3" className="p-4 text-center text-gray-500">
//                     No products available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, getTopSellingProducts } from "../Slices/ProductSlice";
import { fetchRevenue } from "../Slices/OrderSlice";
import { TrendingUp, ShoppingCart, DollarSign, PawPrint, Package } from "lucide-react";

function Dashboard() {
  const dispatch = useDispatch();
  const { topSellingProducts, totalCatProducts, totalDogCategory , totalProducts } = useSelector((state) => state.products); 
  const { totalRevenue , loading  } = useSelector((state) => state.orders);
  console.log("Total Revenue in Component:", totalRevenue);
  console.log(loading);
  

  useEffect(() => {
    dispatch(getTopSellingProducts());
    dispatch(fetchRevenue());
    dispatch(fetchProducts({totalCatProducts , totalDogCategory  }))
  }, [dispatch]);

  // Calculate total sales by summing totalSold from all products
  const totalSales = topSellingProducts?.reduce((acc, product) => acc + product.totalSold, 0) || 0;
  // const totalProducts = (allCatProducts?.length || 0) + (allDogProducts?.length || 0);

  
  // if(loading){
  //   <h1>loading</h1>
  // }
  
  // if(error){
  //   <h1>rejected</h1>
  // }
  
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="mb-6 text-4xl font-extrabold text-gray-800">Admin Dashboard</h2>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Total Sales Card */}
        <div className="flex items-center p-6 space-x-4 bg-white shadow-lg rounded-2xl">
          <div className="p-4 bg-blue-100 rounded-full">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Sales</h3>
            <p className="mt-1 text-2xl font-bold text-blue-600">{totalSales} Units</p>
          </div>
        </div>

        {/* Top Selling Product Card */}
        <div className="flex items-center p-6 space-x-4 bg-white shadow-lg rounded-2xl">
          <div className="p-4 bg-green-100 rounded-full">
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Top Selling Product</h3>
            <p className="mt-1 text-xl font-bold text-green-600">
              {topSellingProducts?.[0]?.name || "No data"}
            </p>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="flex items-center p-6 space-x-4 bg-white shadow-lg rounded-2xl">
          <div className="p-4 bg-yellow-100 rounded-full">
            <DollarSign className="w-8 h-8 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
            <p className="mt-1 text-2xl font-bold text-yellow-600">₹{!loading &&totalRevenue }</p>
          </div>
        </div>

        {/* All Cat Products Card */}
        <div className="flex items-center p-6 space-x-4 bg-white shadow-lg rounded-2xl">
          <div className="p-4 bg-pink-100 rounded-full">
            <PawPrint className="w-8 h-8 text-pink-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Cat Products</h3>
            <p className="mt-1 text-2xl font-bold text-pink-600">{totalCatProducts}</p>
          </div>
        </div>

        {/* All Dog Products Card */}
        <div className="flex items-center p-6 space-x-4 bg-white shadow-lg rounded-2xl">
          <div className="p-4 bg-purple-100 rounded-full">
            <PawPrint className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Dog Products</h3>
            <p className="mt-1 text-2xl font-bold text-purple-600">{totalDogCategory}</p>
          </div>
        </div>

        {/* Total Products (Cat + Dog) Card */}
        <div className="flex items-center p-6 space-x-4 bg-white shadow-lg rounded-2xl">
          <div className="p-4 bg-orange-100 rounded-full">
            <Package className="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
            <p className="mt-1 text-2xl font-bold text-orange-600">{totalProducts}</p>
          </div>
        </div>
      </div>

      {/* Top Selling Products Table */}
      <div className="p-6 mt-8 bg-white shadow-lg rounded-2xl">
        <h3 className="mb-4 text-xl font-semibold text-gray-800">Top Selling Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-collapse border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left border-b">#</th>
                <th className="p-3 text-left border-b">Product Name</th>
                <th className="p-3 text-left border-b">Total Sold</th>
              </tr>
            </thead>
            <tbody>
              {topSellingProducts?.slice(0, 5).map((product, index) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3 font-bold text-blue-600">{product.totalSold}</td>
                </tr>
              ))}
              {topSellingProducts?.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    No products available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
