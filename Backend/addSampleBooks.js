const mongoose = require('mongoose');
require('./db/config');
const Book = require('./db/Seller/Additem');

const sampleBooks = [
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian Fiction',
    itemImage: 'uploads/1984 by George Orwell.jpeg',
    description: 'A dystopian novel set in a totalitarian society where critical thought is suppressed.',
    price: '12.99',
    userName: 'Admin'
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    itemImage: 'uploads/Atomic Habits.jpeg',
    description: 'A guide to building good habits and breaking bad ones.',
    price: '15.99',
    userName: 'Admin'
  },
  {
    title: 'A Thousand Splendid Suns',
    author: 'Khaled Hosseini',
    genre: 'Fiction',
    itemImage: 'uploads/A Thousand Splendid Suns.jpeg',
    description: 'A novel set in Afghanistan that depicts the lives of two women.',
    price: '14.99',
    userName: 'Admin'
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    genre: 'Memoir',
    itemImage: 'uploads/Educated.jpeg',
    description: 'A memoir about a woman who leaves her survivalist family and goes on to earn a PhD.',
    price: '13.99',
    userName: 'Admin'
  },
  {
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    genre: 'Fantasy',
    itemImage: 'uploads/harry potter and the philosopher\'s stone.jpg',
    description: 'The first book in the Harry Potter series.',
    price: '11.99',
    userName: 'Admin'
  },
  {
    title: 'Life of Pi',
    author: 'Yann Martel',
    genre: 'Adventure Fiction',
    itemImage: 'uploads/Life of Pi.jpeg',
    description: 'A novel about a boy who survives a shipwreck and is stranded on a lifeboat with a Bengal tiger.',
    price: '10.99',
    userName: 'Admin'
  },
  {
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    genre: 'Thriller',
    itemImage: 'uploads/Gone Girl.jpeg',
    description: 'A thriller novel about a woman who disappears on her fifth wedding anniversary.',
    price: '9.99',
    userName: 'Admin'
  },
  {
    title: 'It Ends With Us',
    author: 'Colleen Hoover',
    genre: 'Romance',
    itemImage: 'uploads/it Ends With Us.jpeg',
    description: 'A romance novel that tackles difficult subjects like domestic violence.',
    price: '8.99',
    userName: 'Admin'
  }
];

async function addSampleBooks() {
  try {
    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared existing books');

    // Add sample books
    const result = await Book.insertMany(sampleBooks);
    console.log(`Added ${result.length} sample books`);
    
    // Log the IDs of the added books
    result.forEach(book => {
      console.log(`${book.title}: ${book._id}`);
    });
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding sample books:', error);
    mongoose.connection.close();
  }
}

addSampleBooks();