
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../Vendor/List.css';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Snavbar from './Snavbar';
// import Footer from '../Components/Footer';
// import Vnavbar from './Vnavbar';

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    // Fetch items data
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    if (user) {
      axios.get(`http://localhost:4000/getsellerorders/${user.id}`)
  .then((response) => {
    setOrders(response.data);
  })
  .catch((error) => {
    console.error('Error fetching bookings: ', error);
  });
    }

    // Fetch orders data
  
}, []);




  // Function to calculate the status based on the delivery date
  const calculateStatus = (Delivery) => {
    const currentDate = new Date();
    const formattedDeliveryDate = new Date(Delivery);

    if (formattedDeliveryDate >= currentDate) {
      return "ontheway";
    } else {
      return "delivered";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Snavbar/>
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-800">Customer Orders</h2>
        
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 className="text-xl font-semibold mt-4 mb-2">No orders yet</h3>
            <p className="text-gray-600">When customers purchase your books, their orders will appear here</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((item) => {
              const status = calculateStatus(item.Delivery);
              const statusColor = status === "delivered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
              
              return (
                <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 px-6 py-4 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-medium text-indigo-100">ORDER ID</span>
                      <h3 className="text-lg font-semibold text-white">{item._id.slice(0,10)}</h3>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                      {status === "delivered" ? "Delivered" : "On the way"}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden bg-gray-100">
                          <img 
                            src={item.itemImage ? 
                              (item.itemImage.startsWith('http') 
                                ? item.itemImage 
                                : `http://localhost:4000/uploads/${item.itemImage.replace(/^uploads[\/\\]/, '')}`) 
                              : `https://via.placeholder.com/300x400?text=${encodeURIComponent(item.booktitle || item.itemname || 'Book Cover')}`} 
                            alt={`${item.booktitle || item.itemname || 'Book'} Cover`} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.log(`Error loading image for order ${item._id}`);
                              e.target.src = `https://via.placeholder.com/300x400?text=${encodeURIComponent(item.booktitle || item.itemname || 'Book Cover')}`;
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="md:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">{item.booktitle || item.itemname || "Book"}</h4>
                            
                            <div className="space-y-2">
                              <div>
                                <span className="text-sm font-medium text-gray-500">Customer</span>
                                <p className="text-gray-900">{item.userName}</p>
                              </div>
                              
                              <div>
                                <span className="text-sm font-medium text-gray-500">Shipping Address</span>
                                <p className="text-gray-900">
                                  {item.flatno}, {item.city}, {item.state} - {item.pincode}
                                </p>
                              </div>
                              
                              <div>
                                <span className="text-sm font-medium text-gray-500">Order Amount</span>
                                <p className="text-xl font-bold text-indigo-600">₹{item.totalamount}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="space-y-2">
                              <div>
                                <span className="text-sm font-medium text-gray-500">Order Date</span>
                                <p className="text-gray-900">{new Date(item.BookingDate).toLocaleDateString('en-IN', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}</p>
                              </div>
                              
                              <div>
                                <span className="text-sm font-medium text-gray-500">Delivery Date</span>
                                <p className="text-gray-900">{new Date(item.Delivery).toLocaleDateString('en-IN', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}</p>
                              </div>
                              
                              <div className="pt-4">
                                <button className="inline-flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  Contact Customer
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
