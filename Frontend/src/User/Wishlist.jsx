// Wishlist.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Unavbar from './Unavbar';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          setError('Please log in to view your wishlist');
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
          return;
        }

        const response = await axios.get(`http://localhost:4000/wishlist/${user.id}`);
        const wishlistData = response.data;
        
        if (Array.isArray(wishlistData)) {
          setWishlist(wishlistData);
        } else {
          console.error('Expected array but received:', typeof wishlistData);
          setWishlist([]);
          setError('Received invalid wishlist data format');
        }
      } catch (error) {
        console.error('Error fetching wishlist items: ', error);
        setError('Failed to load wishlist. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (itemId) => {
    try {
      if (!window.confirm('Are you sure you want to remove this item from your wishlist?')) {
        return;
      }
      
      // Show loading state for the specific item
      setWishlist(prev => 
        prev.map(item => 
          item.itemId === itemId || item._id === itemId 
            ? {...item, isRemoving: true} 
            : item
        )
      );
      
      // Remove item from the wishlist
      await axios.post(`http://localhost:4000/wishlist/remove`, { itemId });
      
      // Refresh the wishlist items
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const response = await axios.get(`http://localhost:4000/wishlist/${user.id}`);
        setWishlist(response.data);
      } else {
        setError('User session expired. Please log in again.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    } catch (error) {
      console.error('Error removing item from wishlist: ', error);
      setError('Failed to remove item. Please try again.');
      
      // Reset the removing state
      setWishlist(prev => 
        prev.map(item => 
          item.itemId === itemId || item._id === itemId 
            ? {...item, isRemoving: false} 
            : item
        )
      );
    }
  };

  const handleImageError = (e, title) => {
    console.log(`Error loading image for ${title || 'book'}`);
    
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
        e.target.src = `https://via.placeholder.com/350x500?text=${encodeURIComponent(title || 'Book Cover')}`;
        e.target.onerror = null; // Prevent infinite loop
      };
    } else {
      e.target.src = `https://via.placeholder.com/350x500?text=${encodeURIComponent(title || 'Book Cover')}`;
    }
  };

  if (loading) {
    return (
      <div>
        <Unavbar />
        <div className="container mx-auto p-8 text-center">
          <h2 className="text-3xl font-semibold mb-4">Loading your wishlist...</h2>
          <div className="animate-pulse flex justify-center">
            <div className="h-8 w-8 bg-purple-600 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Unavbar />
        <div className="container mx-auto p-8 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
          <button 
            onClick={() => window.location.href = '/uhome'} 
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Unavbar/>
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">My Wishlist</h2>
        
        {wishlist.length === 0 ? (
          <div className="text-center p-8 bg-gray-100 rounded">
            <p className="text-xl text-gray-600">Your wishlist is empty</p>
            <button 
              onClick={() => window.location.href = '/uhome'} 
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Browse Books
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((item) => (
              <div key={item._id || item.itemId} className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow duration-300">
                <div className="relative overflow-hidden" style={{ height: '350px' }}>
                  <img
                    src={item.itemImage ? 
                      (item.itemImage.startsWith('http') 
                        ? item.itemImage 
                        : `http://localhost:4000/uploads/${item.itemImage.replace(/^uploads[\/\\]/, '')}`) 
                      : `https://via.placeholder.com/350x500?text=${encodeURIComponent('Book Cover')}`}
                    alt={`${item.title || 'Book'} Cover`}
                    className="rounded-t-lg w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    onError={(e) => handleImageError(e, item.title)}
                  />
                  {item.isRemoving && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>
                
                <div className="p-3">
                  <p className="text-xl font-bold mb-2 truncate">{item.title}</p>
                  <p className="text-gray-700 mb-2">Author: {item.author}</p>
                  <p className="text-gray-700 mb-2">Genre: {item.genre}</p>
                  <p className="text-blue-500 font-bold mb-3">Price: ₹{item.price}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Button
                      style={{ backgroundColor: 'red', border: 'none' }}
                      onClick={() => removeFromWishlist(item.itemId || item._id)}
                      disabled={item.isRemoving}
                      className="flex-1"
                    >
                      {item.isRemoving ? 'Removing...' : 'Remove'}
                    </Button>
                    
                    <Button style={{ backgroundColor: 'rebeccapurple', border: 'none' }} className="flex-1">
                      <Link to={`/uitem/${item.itemId || item._id}`} style={{ color: 'white', textDecoration: 'none' }}>
                        View Details
                      </Link>
                    </Button>
                    
                    <Button style={{ backgroundColor: '#4CAF50', border: 'none' }} className="w-full mt-2">
                      <Link to={`/orderitem/${item.itemId || item._id}`} style={{ color: 'white', textDecoration: 'none' }}>
                        Order Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
