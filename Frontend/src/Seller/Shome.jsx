import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell
} from 'recharts';
import { Link } from 'react-router-dom';
import Snavbar from './Snavbar';
import Footer from '../Componenets/Footer';

function Shome() {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.id) {
      axios.get(`http://localhost:4000/getitem/${storedUser.id}`)
        .then((res) => setItems(res.data || []))
        .catch((err) => console.error('Error fetching items:', err));

      axios.get(`http://localhost:4000/getsellerorders/${storedUser.id}`)
        .then((res) => setOrders(res.data || []))
        .catch((err) => console.error('Error fetching orders:', err));
    }
  }, []);

  const totalItems = items.length;
  const totalOrders = orders.length;

  const data = [
    { name: 'Items', value: totalItems, fill: '#6366f1' },   // Indigo
    { name: 'Orders', value: totalOrders, fill: '#f97316' }  // Orange
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Snavbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-800">Seller Dashboard</h2>

        {/* Overview Cards */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">Overview</h3>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Books */}
            <Link to="/myproducts" className="transition transform hover:scale-105 duration-300">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg shadow-md p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-100 text-sm font-medium">Total Books</p>
                    <p className="text-4xl font-bold mt-1">{totalItems}</p>
                  </div>
                  <div className="bg-white bg-opacity-30 p-3 rounded-full">
                    <div className="w-8 h-8 bg-indigo-300 rounded-full"></div>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="text-sm bg-white bg-opacity-20 hover:bg-opacity-30 py-1 px-3 rounded-full text-white font-medium transition">View Books</button>
                </div>
              </div>
            </Link>

            {/* Total Orders (Bright Orange) */}
            <Link to="/orders" className="transition transform hover:scale-105 duration-300">
              <div className="bg-gradient-to-br from-orange-600 to-orange-500 rounded-lg shadow-md p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">Total Orders</p>
                    <p className="text-4xl font-bold mt-1">{totalOrders}</p>
                  </div>
                  <div className="bg-white bg-opacity-30 p-3 rounded-full">
                    <div className="w-8 h-8 bg-orange-300 rounded-full"></div>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="text-sm bg-white bg-opacity-20 hover:bg-opacity-30 py-1 px-3 rounded-full text-white font-medium transition">View Orders</button>
                </div>
              </div>
            </Link>
          </div>

          {/* Statistics Chart */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Statistics</h4>
            <div className="flex justify-center overflow-x-auto">
              <BarChart width={600} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </div>
          </div>
        </div>

        {/* Quick Actions + Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-sky-700 to-sky-500 px-6 py-4">
              <h3 className="text-xl font-semibold text-white">Quick Actions</h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <Link to="/addbook" className="flex flex-col items-center justify-center p-4 bg-sky-100 rounded-lg hover:bg-sky-200 transition">
                <div className="w-8 h-8 bg-sky-400 rounded-full mb-2"></div>
                <span className="text-sm font-medium text-sky-800">Add New Book</span>
              </Link>
              <Link to="/myproducts" className="flex flex-col items-center justify-center p-4 bg-lime-100 rounded-lg hover:bg-lime-200 transition">
                <div className="w-8 h-8 bg-lime-400 rounded-full mb-2"></div>
                <span className="text-sm font-medium text-lime-800">Manage Books</span>
              </Link>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-500 px-6 py-4">
              <h3 className="text-xl font-semibold text-white">Tips</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-gray-700 list-disc list-inside">
                <li>Add high-quality images of your books</li>
                <li>Write detailed descriptions to attract buyers</li>
                <li>Respond quickly to customer orders</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Shome;
