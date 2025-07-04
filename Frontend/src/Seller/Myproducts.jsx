import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snavbar from './Snavbar';
import { FaBeer, FaHeart, FaTrash } from "react-icons/fa";

function Myproducts() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios
        .get(`http://localhost:4000/getitem/${user.id}`)
        .then((response) => {
          console.log('Response data:', response.data); // Log the response data
          const taskData = response.data;
          setItems(taskData);
        })
        .catch((error) => {
          console.error('Error fetching tasks: ', error);
        });
    } else {
      console.log('ERROR');
    }
  }, []);

  const deleteItem=((Id)=>{
    axios.delete(`http://localhost:4000/itemdelete/${Id}`);
    window.location.assign('/myproducts');
    alert('Item is deleted');
  })
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Snavbar/>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-800">My Books</h2>
          <a href="/addbook" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Book
          </a>
        </div>
        
        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-xl font-semibold mt-4 mb-2">No books listed yet</h3>
            <p className="text-gray-600 mb-6">Start selling by adding your first book</p>
            <a href="/addbook" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
              Add Your First Book
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
                <div className="relative">
                  <img
                    src={item.itemImage ? 
                      (item.itemImage.startsWith('http') 
                        ? item.itemImage 
                        : `http://localhost:4000/uploads/${item.itemImage.replace(/^uploads[\/\\]/, '')}`) 
                      : `https://via.placeholder.com/350x500?text=${encodeURIComponent(item.title || 'Book Cover')}`}
                    alt={item.title || "Book cover"}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      console.log(`Error loading image for ${item.title || 'book'}`);
                      
                      // Try to extract just the filename if the path is complex
                      if (e.target.src.includes('/uploads/') && !e.target.src.includes('placeholder')) {
                        const originalSrc = e.target.src;
                        const filename = originalSrc.split('/').pop();
                        
                        // Try an alternative path format
                        setTimeout(() => {
                          e.target.src = `http://localhost:4000/uploads/${filename}`;
                        }, 300);
                        
                        // Set a fallback in case the alternative path also fails
                        e.target.onerror = () => {
                          e.target.src = `https://via.placeholder.com/350x500?text=${encodeURIComponent(item.title || 'Book Cover')}`;
                          e.target.onerror = null; // Prevent infinite loop
                        };
                      } else {
                        e.target.src = `https://via.placeholder.com/350x500?text=${encodeURIComponent(item.title || 'Book Cover')}`;
                      }
                    }}
                  />
                  <button 
                    onClick={() => deleteItem(item._id)} 
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                    title="Delete book"
                  >
                    <FaTrash />
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{item.title}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">By {item.author}</span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">{item.genre}</span>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600 mb-3">₹{item.price}</p>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{item.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">ID: {item._id.substring(0, 8)}...</span>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      Edit Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    // </div>
  );
}

export default Myproducts;
