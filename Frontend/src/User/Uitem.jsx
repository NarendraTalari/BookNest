import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Unavbar from './Unavbar';
import { Button } from 'react-bootstrap';

const Uitem = () => {
    const [item, setItem] = useState(null); // Initialize item as null

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4000/item/${id}`)
            .then((resp) => {
                console.log(resp);
                setItem(resp.data); // Set item to the fetched data (an object, not an array)
            })
            .catch(() => {
                console.log("Did not get data");
            });
    }, [id]); // Include 'id' as a dependency to re-fetch data when the ID changes

    return (
        <div>
            <Unavbar />
            <br />
            {item && (
                <div>
                    <div style={{ display: "flex", justifyContent: "center", height: "450px", maxWidth: "350px", margin: "0 auto", overflow: "hidden" }} >
                        <img 
                            src={item?.itemImage ? 
                              (item.itemImage.startsWith('http') 
                                ? item.itemImage 
                                : `http://localhost:4000/uploads/${item.itemImage.replace(/^uploads[\/\\]/, '')}`) 
                              : `https://via.placeholder.com/350x450?text=${encodeURIComponent(item.title || 'Book Cover')}`} 
                            alt={`${item.title || 'Book'} Cover`} 
                            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
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
                                    e.target.src = `https://via.placeholder.com/350x450?text=${encodeURIComponent(item.title || 'Book Cover')}`;
                                    e.target.onerror = null; // Prevent infinite loop
                                  };
                                } else {
                                  e.target.src = `https://via.placeholder.com/350x450?text=${encodeURIComponent(item.title || 'Book Cover')}`;
                                }
                            }}
                        />
                    </div>
                    <h1 className='text-center' style={{ fontSize: "28px", fontWeight: "bold", margin: "20px 0" }}>{item.title}</h1>
                    <p className='text-center text-gray-500' style={{ marginBottom: "20px" }}>Book ID: {item._id.slice(0, 8)}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div style={{ width: '38%', marginLeft: "150px" }}>
                            <h2 style={{ color: "grey" }}><strong>Description</strong></h2>
                            <hr style={{ height: "3px", backgroundColor: "black" }} />
                            <p style={{ fontSize: "20px" }}>{item.description}</p>
                        </div>
                        <div style={{ marginRight: '300px' }}>
                            <h2 style={{ color: "grey" }}><strong>Info</strong></h2>

                            <hr style={{ height: "3px", backgroundColor: "black" }} />
                            <p style={{ fontSize: "20px" }}>Title:  {item.title}</p>
                            <p style={{ fontSize: "20px" }}>Author:  {item.author}</p>
                            <p style={{ fontSize: "20px" }}>Genre:  {item.genre}</p>
                            <p style={{ fontSize: "20px" }}>Price:  {item.price}</p>
                            {/* <p style={{ fontSize: "20px" }}>Warranty:  1 year</p> */}
                            <p style={{ fontSize: "20px" }}>Seller:  {item.userName}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-8 mb-10 gap-4">
                        <button
                            type="button"
                            onClick={() => window.location.href = `/orderitem/${item._id}`}
                            style={{ backgroundColor: "rebeccapurple", padding: "12px 30px" }}
                            className="text-white font-semibold px-6 py-3 rounded hover:bg-purple-800 transition-colors duration-300 text-lg">
                            Buy Now
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                const user = JSON.parse(localStorage.getItem('user'));
                                
                                if (!user) {
                                    alert('Please login to add to wishlist');
                                    window.location.href = '/login';
                                    return;
                                }
                                
                                // Use either id or _id, whichever is available
                                const userId = user.id || user._id;
                                const userName = user.name || user.userName || 'User';
                                
                                // Create the wishlist item data
                                const wishlistData = {
                                    itemId: item._id,
                                    title: item.title,
                                    itemImage: item.itemImage,
                                    userId: userId,
                                    userName: userName,
                                    author: item.author,
                                    genre: item.genre,
                                    price: item.price
                                };
                                
                                console.log('Adding to wishlist with data:', wishlistData);
                                
                                // Make API request using fetch for simplicity
                                fetch('http://localhost:4000/wishlist/add', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(wishlistData),
                                })
                                .then(response => {
                                    if (!response.ok) {
                                        if (response.status === 400) {
                                            return response.json().then(data => {
                                                throw new Error(data.msg || 'This item is already in your wishlist.');
                                            });
                                        }
                                        throw new Error('Failed to add item to wishlist. Status: ' + response.status);
                                    }
                                    return response.json();
                                })
                                .then(data => {
                                    console.log('Success:', data);
                                    alert('Item added to wishlist successfully!');
                                    if (confirm('Would you like to view your wishlist?')) {
                                        window.location.href = '/wishlist';
                                    }
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                    alert(error.message);
                                });
                            }}
                            style={{ backgroundColor: "#e91e63", padding: "12px 30px" }}
                            className="text-white font-semibold px-6 py-3 rounded hover:bg-pink-700 transition-colors duration-300 text-lg">
                            Add to Wishlist
                        </button>
                    </div>
                </div>


            )}


        </div>
    );
};

export default Uitem;
