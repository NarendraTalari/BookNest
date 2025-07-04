import React, { useState, useEffect } from 'react';
import Unavbar from './Unavbar';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Products() {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const staticBooks = [
      { _id: "1", title: "1984", author: "George Orwell", genre: "Dystopian", price: 9.99, itemImage: "1984 by George Orwell.jpeg" },
      { _id: "2", title: "A Man Called Ove", author: "Fredrik Backman", genre: "Drama", price: 11.99, itemImage: "A Man Called Ove.jpeg" },
      { _id: "3", title: "A Thousand Boy Kisses", author: "Tillie Cole", genre: "Romance", price: 10.99, itemImage: "A Thousand Boy Kisses.jpeg" },
      { _id: "4", title: "A Thousand Splendid Suns", author: "Khaled Hosseini", genre: "Historical", price: 10.5, itemImage: "A Thousand Splendid Suns.jpeg" },
      { _id: "5", title: "All the Light We Cannot See", author: "Anthony Doerr", genre: "Historical Fiction", price: 13.99, itemImage: "All the Light We Cannot See.jpeg" },
      { _id: "6", title: "Angels & Demons", author: "Dan Brown", genre: "Thriller", price: 12.99, itemImage: "Angels & Demons.jpeg" },
      { _id: "7", title: "Atomic Habits", author: "James Clear", genre: "Self-help", price: 14.99, itemImage: "Atomic Habits.jpeg" },
      { _id: "8", title: "Behind Closed Doors", author: "B.A. Paris", genre: "Thriller", price: 10.49, itemImage: "Behind Closed Doors.jpeg" },
      { _id: "9", title: "Big Little Lies", author: "Liane Moriarty", genre: "Mystery", price: 10.99, itemImage: "Big Little Lies.jpeg" },
      { _id: "10", title: "Brave New World", author: "Aldous Huxley", genre: "Sci-Fi", price: 9.49, itemImage: "brave new world.jpeg" },
      { _id: "11", title: "Deep Work", author: "Cal Newport", genre: "Productivity", price: 13.99, itemImage: "Deep Work.jpeg" },
      { _id: "12", title: "Educated", author: "Tara Westover", genre: "Memoir", price: 12.49, itemImage: "Educated.jpeg" },
      { _id: "13", title: "Everything I Never Told You", author: "Celeste Ng", genre: "Fiction", price: 10.99, itemImage: "Everything I Never Told You.jpeg" },
      { _id: "14", title: "Foundation", author: "Isaac Asimov", genre: "Sci-Fi", price: 9.99, itemImage: "Foundation.jpeg" },
      { _id: "15", title: "Godaan", author: "Munshi Premchand", genre: "Classic", price: 8.99, itemImage: "Godaan.jpeg" },
      { _id: "16", title: "Gone Girl", author: "Gillian Flynn", genre: "Thriller", price: 11.99, itemImage: "Gone Girl.jpeg" },
      { _id: "17", title: "Great Expectations", author: "Charles Dickens", genre: "Classic", price: 7.99, itemImage: "Great Expectations.jpeg" },
      { _id: "18", title: "Harry Potter", author: "J.K. Rowling", genre: "Fantasy", price: 14.99, itemImage: "harry potter and the philosopher's stone.jpg" },
      { _id: "19", title: "Hyperion", author: "Dan Simmons", genre: "Sci-Fi", price: 13.99, itemImage: "Hyperion.jpeg" },
      { _id: "20", title: "I Am Watching You", author: "Teresa Driscoll", genre: "Thriller", price: 9.99, itemImage: "I Am Watching You.jpeg" },
      { _id: "21", title: "I Too Had a Love Story", author: "Ravinder Singh", genre: "Romance", price: 6.99, itemImage: "I Too Had a Love Story.jpeg" },
      { _id: "22", title: "It Ends With Us", author: "Colleen Hoover", genre: "Romance", price: 10.99, itemImage: "it Ends With Us.jpeg" },
      { _id: "23", title: "Life After Life", author: "Kate Atkinson", genre: "Historical", price: 9.49, itemImage: "Life After Life.jpeg" },
      { _id: "24", title: "Life of Pi", author: "Yann Martel", genre: "Adventure", price: 9.99, itemImage: "Life of Pi.jpeg" }
    ];
    // Fetch seller-added books and merge
    fetch('http://localhost:4000/item')
      .then(res => res.json())
      .then(sellerBooks => {
        setItems([...staticBooks, ...sellerBooks]);
      })
      .catch(() => setItems(staticBooks));
  }, []);

  const addToWishlist = (item) => {
    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      alert('Please log in to add items to your wishlist.');
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
  };

  return (
    <div>
      <Unavbar />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">Books List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded shadow">
              <Link to={`/uitem/${item._id}`} style={{ display: 'block', cursor: 'pointer' }}>
                <img
                  src={item.itemImage ? 
                    (item.itemImage.startsWith('http') 
                      ? item.itemImage 
                      : `http://localhost:4000/uploads/${item.itemImage.replace(/^uploads[\/\\]/, '')}`) 
                    : `https://via.placeholder.com/300x350?text=${encodeURIComponent(item.title || 'Book Cover')}`}
                  alt={item.title || 'Book Cover'}
                  className="rounded-t-lg"
                  style={{ height: '350px', width: '300px', objectFit: 'contain', objectPosition: 'center', background: '#f3f3f3' }}
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
                        e.target.src = `https://via.placeholder.com/300x350?text=${encodeURIComponent(item.title || 'Book Cover')}`;
                        e.target.onerror = null; // Prevent infinite loop
                      };
                    } else {
                      e.target.src = `https://via.placeholder.com/300x350?text=${encodeURIComponent(item.title || 'Book Cover')}`;
                    }
                  }}
                />
              </Link>
              <div>
                <Link to={`/uitem/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <p className="text-xl font-bold mb-2 hover:text-purple-700">{item.title}</p>
                </Link>
                <p className="text-gray-700 mb-2">Author: {item.author}</p>
                <p className="text-gray-700 mb-2">Genre: {item.genre}</p>
                <p className="text-blue-500 font-bold mb-3">Price: ${item.price}</p>
                <div className="flex justify-center">
                  <Button
                    style={{ backgroundColor: '#e91e63', border: 'none', width: '100%', padding: '10px' }}
                    onClick={() => addToWishlist(item)}
                  >
                    Add to Wishlist
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
