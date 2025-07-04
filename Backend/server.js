const express = require('express')
const PORT = 4000
const cors = require('cors')
require('./db/config')
const multer = require('multer'); // Import multer
const Admin = require('./db/Admin/Admin')
const users = require('./db/User/userschema')
const seller = require('./db/Seller/Sellers')
const items = require('./db/Seller/Additem')
const myorders = require('./db/User/myorders')
const WishlistItem = require('./db/User/Wishlist')     

const app = express()

app.use(express.json())

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}));

const storage = multer.diskStorage({
    destination: 'uploads', // The directory where uploaded files will be stored
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname); // Set the file name
    },
});

const upload = multer({ storage });
// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));
console.log('Serving static files from:', require('path').resolve('uploads'));


                                          //  Admin  //
// Login
app.post('/alogin', (req, resp) => {  
    const { email, password } = req.body;   
    Admin.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    return resp.json({ Status: "Success", user: { id:user.id,name: user.name, email: user.email } })
                } else {
                    resp.json("login fail")
                }
            } else {
                resp.json("no user")
            }
        })
  })
  
  // Register Api
  app.post('/asignup', (req, resp) => {
    const { name, email, password } = req.body;
    Admin.findOne({ email: email })
        .then(use => {
            if (use) {
                resp.json("Already have an account")
            } else {
                Admin.create({ email: email, name: name, password: password })
                    .then(result => resp.json("  Account Created"))
                    .catch(err => resp.json(err))
            }
        }).catch(err => resp.json("failed "))
  })

app.get('/users',(req,res)=>{
    users.find()
    .then((user)=>{
        res.status(200).json(user)
    })
    .catch(() => {
        res.sendStatus(500)
    })
})
app.delete('/userdelete/:id',(req,res)=>{
    const { id }=req.params
     users.findByIdAndDelete(id)
     .then(() => {
        res.sendStatus(200);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Internal server error' });
    });
  })
  app.delete('/userorderdelete/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await myorders.findByIdAndDelete(id);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
app.delete('/useritemdelete/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await items.findByIdAndDelete(id);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.get('/sellers',(req,res)=>{
    seller.find()
    .then((seller)=>{
        res.status(200).json(seller)
    })
    .catch(() => {
        res.sendStatus(500)
    })
})

app.delete('/sellerdelete/:id',(req,res)=>{
    const { id }=req.params
     seller.findByIdAndDelete(id)
     .then(() => {
        res.sendStatus(200);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Internal server error' });
    });
  })
    app.get('/orders', (req, res) => {
    myorders.find()
        .then((orders) => {
            res.status(200).json(orders)
        })
        .catch(() => {
            res.sendStatus(500)
        })
});


                                                    // Seller //
//  login api
app.post('/slogin', (req, resp) => {
    const { email, password } = req.body;
    seller.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    return resp.json({ Status: "Success", user: { id: user.id, name: user.name, email: user.email } })
                } else {
                    resp.json("login fail")
                }
            } else {
                resp.json("no user")
            }
        })
})

// Register Api
app.post('/ssignup', (req, resp) => {
    const { name, email, password } = req.body;
    seller.findOne({ email: email })
        .then(use => {
            if (use) {
                resp.json("Already have an account")
            } else {
                seller.create({ email: email, name: name, password: password })
                    .then(result => resp.json("  Account Created"))
                    .catch(err => resp.json(err))
            }
        }).catch(err => resp.json("failed "))
})
// addBook
app.post('/items', upload.single('itemImage'), async (req, res) => {
    const { title, author, genre, description, price, userId, userName } = req.body;
    const itemImage = req.file.path; // The path to the uploaded image

    try {
        const item = new items({ itemImage, title, author, genre, description, price, userId, userName });
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create item' });
    }
});
//getbooks
app.get('/getitem/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const tasks = await items.find({ userId }).sort('position');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});
//delete book
app.delete('/itemdelete/:id', (req, res) => {
    const { id } = req.params;
    items.findByIdAndDelete(id)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Internal server error' });
        });
})
//getorders
app.get('/getsellerorders/:userId', async (req, res) => {
    const sellerId = req.params.userId;
    try {
        const tasks = await myorders.find({ sellerId }).sort('position');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});



                                            // users  //
// login
app.post('/login', (req, res) => {
const { email, password } = req.body;
    users.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    return res.json({ Status: "Success", user: { id: user.id, name: user.name, email: user.email } })
                }
                else {
                    res.json("Invalid Password")
                }
            }
            else {
                res.json("User not found")
            }
        })
})

app.post('/signup', (req, resp) => {
    const { name, email, password } = req.body;
    users.findOne({ email: email })
        .then(use => {
            if (use) {
                resp.json("Already have an account")
            } else {
                users.create({ email: email, name: name, password: password })
                    .then(result => resp.json("  Account Created"))
                    .catch(err => resp.json(err))
            }
        }).catch(err => resp.json("failed "))
})

app.get('/item', async (req, res) => {
    try {
        const images = await items.find();
        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
// Single item
app.get('/item/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const item = await items.findById({ _id: id });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/userorder', async (req, res) => {
    const { flatno, city, state, pincode, totalamount, seller, sellerId, BookingDate, description, Delivery, userId, userName, booktitle, bookauthor, bookgenre, itemImage } = req.body;

    try {
        const order = new myorders({ 
            flatno, 
            city, 
            state, 
            pincode, 
            totalamount, 
            seller, 
            sellerId, 
            BookingDate, 
            description, 
            userId, 
            Delivery, 
            userName, 
            booktitle, 
            bookauthor, 
            bookgenre, 
            itemImage 
        });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(400).json({ error: 'Failed to create order' });
    }
});

app.get('/getorders/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const tasks = await myorders.find({ userId }).sort('position');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Cancel order endpoint
app.post('/cancelorder', async (req, res) => {
    const { orderId } = req.body;
    
    if (!orderId) {
        return res.status(400).json({ error: 'Order ID is required' });
    }
    
    try {
        const result = await myorders.findByIdAndDelete(orderId);
        
        if (!result) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        res.status(200).json({ message: 'Order cancelled successfully' });
    } catch (err) {
        console.error('Error cancelling order:', err);
        res.status(500).json({ error: 'Failed to cancel order' });
    }
});

app.get('/wishlist', async (req, res) => {
    try {
      const wishlistItems = await WishlistItem.find();
      res.json(wishlistItems);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  app.get('/wishlist/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const tasks = await WishlistItem.find({ userId }).sort('position');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

app.post('/wishlist/add', async (req, res) => {
    try {
        console.log('Received wishlist add request with data:', req.body);
        
        // Extract data from request body
        const { itemId, title, itemImage, userId, userName, author, genre, price } = req.body;
        
        // Simple validation
        if (!itemId || !userId) {
            return res.status(400).json({ error: 'Item ID and User ID are required' });
        }
        
        // Check if item already exists in wishlist
        const existingItem = await WishlistItem.findOne({ itemId, userId });
        if (existingItem) {
            return res.status(400).json({ msg: 'Item already in wishlist' });
        }
        
        // Create new wishlist item with all available data
        const wishlistItem = {
            itemId,
            userId,
            title: title || 'Unknown Title',
            itemImage: itemImage || '',
            userName: userName || 'Unknown User',
            author: author || 'Unknown Author',
            genre: genre || 'Unknown Genre',
            price: price ? parseFloat(price) : 0
        };
        
        // Save to database
        const newItem = new WishlistItem(wishlistItem);
        const savedItem = await newItem.save();
        
        console.log('Item added to wishlist successfully:', savedItem);
        res.status(200).json({ msg: 'Item added to wishlist successfully', item: savedItem });
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        res.status(500).json({ error: error.message || 'Server Error' });
    }
});

  app.post('/wishlist/remove', async (req, res) => {
    try {
      console.log('Received wishlist remove request with data:', req.body);
      const { itemId, userId } = req.body;
      
      // Simple validation
      if (!itemId) {
        return res.status(400).json({ error: 'Item ID is required' });
      }
  
      // Create query based on available data
      let query = { itemId };
      if (userId) {
        query.userId = userId;
      }
      
      console.log('Using query for deletion:', query);
      
      // Find and remove the item
      const result = await WishlistItem.findOneAndDelete(query);
      
      if (!result) {
        return res.status(404).json({ msg: 'Wishlist item not found' });
      }
      
      console.log('Item removed from wishlist successfully');
      res.status(200).json({ msg: 'Item removed from wishlist successfully' });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      res.status(500).json({ error: error.message || 'Server Error' });
    }
  });





// Add a test route to check if the server is running
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running correctly' });
});

// Add a route to list all available books
app.get('/books/list', async (req, res) => {
    try {
        const books = await items.find().select('title author genre price itemImage');
        res.json({ count: books.length, books });
    } catch (error) {
        console.error('Error listing books:', error);
        res.status(500).json({ error: 'Failed to list books' });
    }
});

const fs = require('fs');
const path = require('path');

// Endpoint to list all images in public and uploads folders
app.get('/all-images', (req, res) => {
    const publicDir = path.join(__dirname, '../Frontend/public');
    const uploadsDir = path.join(__dirname, '../uploads');
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

    function getImagesFromDir(dir, urlPrefix) {
        if (!fs.existsSync(dir)) return [];
        return fs.readdirSync(dir)
            .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
            .map(file => `${urlPrefix}/${file}`);
    }

    const publicImages = getImagesFromDir(publicDir, 'public');
    const uploadsImages = getImagesFromDir(uploadsDir, 'uploads');
    const allImages = [...publicImages, ...uploadsImages];
    res.json({ count: allImages.length, images: allImages });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Test the server at: http://localhost:${PORT}/test`);
    console.log(`List all books at: http://localhost:${PORT}/books/list`);
})