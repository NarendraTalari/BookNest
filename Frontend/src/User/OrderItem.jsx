// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// import '../Vendor/List.css'
// import Unavbar from './Unavbar';

// function OrderItem() {
//   const [item, setItem] = useState([]);
//   const [formData, setFormData] = useState({
//     flatno: '',
//     city: '',
//     pincode: '',
//     state: '',
//     totalamount: '',
//     seller:'',
//     totalamount:'',
//     description:''
//   });


//   const { id } = useParams();

//   useEffect(() => {
//     axios.get(`http://localhost:8000/item/${id}`)
//       .then((resp) => {
//         console.log(resp);
//         setItem(resp.data); // Set item to the fetched data (an object, not an array)
//       })
//       .catch(() => {
//         console.log("Did not get data");
//       });
//   }, [id]);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value});
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Update formData with user input
//       const updatedFormData = { ...formData };
      
      
//       const selectedItem = item[0]; // Assuming you're using the first item in the array
//       const seller=selectedItem.userName;
//       const description=selectedItem.description; 
//       const price = selectedItem.price;

//       const totalAmount = price /100 *5  + +price; // Calculate the total amount
  
     
//       updatedFormData.totalamount = totalAmount;
//       updatedFormData.userName=seller
//       updatedFormData.description=description

  
      
  
//       // Now you can post the updatedFormData
//       const userId = JSON.parse(localStorage.getItem('user')).id;
//       const userName = JSON.parse(localStorage.getItem('user')).name;
//       updatedFormData.userId=userId
//       updatedFormData.userName=userName
      
//       await axios.post('http://localhost:8000/userorder', updatedFormData);
//       console.log(updatedFormData);
//       alert('ordered successfully');
//       navigate('/uhome');
//     } catch (error) {
//       console.error('Error adding bike insurance: ', error);
//     }
//   };
  

//   return (
//     <div  style={{backgroundColor:"",}}>
//         <Unavbar/>
//      <div style={{ display: 'flex ' }} >
//         <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-lg bg-white">
//           <h2 className="text-2xl font-semibold" >Your order is almost Done! </h2>
//           <p>We just need a few more details before payment</p>
//           {/* <p>item name:{item.itemtype}</p> */}
//           <form onSubmit={handleSubmit}>
//           <label className="block text-gray-600" style={{paddingBottom:"5px"}}>Address:</label>
        
//   <div >
//     <div class="input-container">
//       <input type="text" id="myInput"  class="w-48 p-2 border border-gray-300 rounded focus:outline-none" placeholder=" "style={{width:"340px"}} 
//       name="flatno"
//       value={formData.flatno}
//       onChange={handleChange}
//      />
//       <label for="myInput"  class="absolute left-2 transform -translate-y-1/2 bg-white px-1 pointer-events-none transition-transform">
//         Flat no
//       </label>
//     </div>
//   </div><br/>
//  <div style={{display:"flex",justifyContent:"space-between"}}>
//  <div >
//     <div class="input-container">
//       <input type="text" id="myInput"  class="w-48 p-2 border border-gray-300 rounded focus:outline-none" placeholder=" "
//       style={{width:"140px"}} 
//      name="city"
//       value={formData.city}
//       onChange={handleChange}
//      />
//       <label for="myInput"  class="absolute left-2 transform -translate-y-1/2 bg-white px-1 pointer-events-none transition-transform">
//         City
//       </label>
//     </div>
//   </div> 
//   <div >
//     <div class="input-container">
//       <input type="text" id="myInput"  class="w-48 p-2 border border-gray-300 rounded focus:outline-none" placeholder=" "
//       style={{width:"140px"}} 
//       name="pincode"
//       value={formData.pincode}
//       onChange={handleChange}
//      />
//       <label for="myInput"  class="absolute left-2 transform -translate-y-1/2 bg-white px-1 pointer-events-none transition-transform">
//         Pincode
//       </label>
//     </div>
//   </div>
//  </div>
//   <br/>
//   <div >
//     <div class="input-container">
//       <input type="text" id="myInput"  class="w-48 p-2 border border-gray-300 rounded focus:outline-none" placeholder=" "style={{width:"340px"}} 
//       name="state"
//       value={formData.state}
//       onChange={handleChange}
//      />
//       <label for="myInput"  class="absolute left-2 transform -translate-y-1/2 bg-white px-1 pointer-events-none transition-transform">
//         State
//       </label>
//     </div>
//   </div> <br/>
//             {/* {item  && ((item, index) => (
//               <div key={index}>
//                 <div style={{ display: "flex", justifyContent: "space-between" }}>
//                   <p>Net premium </p>
//                   <p>₹{item.price}</p>
//                 </div>
//                 <div style={{ display: "flex", justifyContent: "space-between" }}>
//                   <p>GST </p>
//                   <p>₹{item.price/100 * 5}</p>
//                 </div>
//                 <div style={{borderBottom:"2px solid black"}}></div>
//                 <div style={{ display: "flex", justifyContent: "space-between" }}>
//                   <p>Total Amount</p>
//                   <p>₹ {item.price /100 *5  + +item.price}</p>
//                 </div>
//                 <div className='d-flex'>
//                   <input type='checkbox' />
//                   <p className='mt-3 pl-3'>I agree to the terms & conditions </p>
//                 </div>
//               </div>
//             ))} */}
//              {item && (
//                 <div>
//                     <div style={{ display: "flex", justifyContent: "center", height: "100px",width:"100px" }} >
//                         <img src={`http://localhost:8000/${item?.itemImage}`} alt={`${item.itemtype} Image`} />
//                     </div>
//                     {/* <h1 className='text-center'> {item.itemtype}-{item._id.slice(3, 7)}</h1> */}
//                     {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}> */}
                      
//                         <div style={{ display:'flex',justifyContent:"space-between" }}>
//                             <p style={{ fontSize: "20px" }}>Price:</p>
//                             <p>{item.price}</p>
                       
//                         {/* </div> */}
//                     </div>
                    
//                 </div>


//             )}


//             <button
//               type="submit"
//               style={{ width: "340px" }}
//               className="bg-blue-400 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Order
//             </button>
//           </form>
//         </div>
//       </div> 
//       <div> 
        
        
//       </div>
//     </div>
//   );
// }

// export default  OrderItem

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../Seller/List.css';
import Unavbar from './Unavbar';

function OrderItem() {
  const [item, setItem] = useState({});
  const [formData, setFormData] = useState({
    flatno: '',
    city: '',
    pincode: '',
    state: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const deliveryFee = 99; // Consistent delivery fee
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    console.log("Fetching item with ID:", id);
    
    // First try to fetch from the regular items endpoint
    axios.get(`http://localhost:4000/item/${id}`)
      .then((resp) => {
        console.log("Item data received:", resp.data);
        if (resp.data && (resp.data.title || resp.data.price)) {
          setItem(resp.data);
          setLoading(false);
        } else {
          throw new Error("Invalid item data received");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch from items endpoint, trying wishlist:", error);
        
        // If that fails, try to get it from the user's wishlist
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
          setLoading(false);
          alert("Error loading book data and you're not logged in. Please log in and try again.");
          navigate('/login');
          return;
        }
        
        // Try to find the item in the user's wishlist
        axios.get(`http://localhost:4000/wishlist/${user.id}`)
          .then(wishlistResp => {
            const wishlistItems = wishlistResp.data;
            if (!Array.isArray(wishlistItems)) {
              throw new Error("Invalid wishlist data");
            }
            
            // Find the item in the wishlist
            const wishlistItem = wishlistItems.find(item => 
              item.itemId === id || item._id === id
            );
            
            if (wishlistItem) {
              console.log("Item found in wishlist:", wishlistItem);
              setItem(wishlistItem);
              setLoading(false);
            } else {
              throw new Error("Item not found in wishlist");
            }
          })
          .catch(wishlistError => {
            console.error("Failed to fetch from wishlist:", wishlistError);
            setLoading(false);
            alert("Error loading book data. Please try again or return to the home page.");
            navigate('/uhome');
          });
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setSubmitting(true);

    try {
      // Validate form data
      if (!formData.flatno || !formData.city || !formData.pincode || !formData.state) {
        setSubmitting(false);
        alert('Please fill in all address fields');
        return;
      }

      // Check if item exists
      if (!item) {
        throw new Error('Item data not found');
      }
      
      // Extract properties with fallbacks for missing data
      const userName = item.userName || item.seller || 'Unknown Seller';
      const userId = item.userId || item.sellerId || '';
      const description = item.description || 'No description available';
      const price = item.price || '0';
      const title = item.title || item.booktitle || 'Unknown Book';
      const author = item.author || item.bookauthor || 'Unknown Author';
      const genre = item.genre || item.bookgenre || 'Unspecified';
      const itemImage = item.itemImage || '';
      
      // If this is from wishlist, we might need the original item ID
      const originalItemId = item.itemId || item._id || '';
     
      const totalAmount = parseInt(price, 10) + deliveryFee;

      // Get user from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) {
        alert('Please log in to place an order');
        navigate('/login');
        return;
      }

      // Create the order data
      const orderData = {
        flatno: formData.flatno,
        city: formData.city,
        pincode: formData.pincode,
        state: formData.state,
        totalamount: totalAmount.toString(),
        seller: userName,
        sellerId: userId,
        description: description,
        booktitle: title,
        bookauthor: author,
        bookgenre: genre,
        itemImage: itemImage,
        userId: user.id,
        userName: user.name,
        originalItemId: originalItemId // Include the original item ID for reference
      };

      console.log('Sending order data:', orderData);

      // Post the order data
      const response = await axios.post('http://localhost:4000/userorder', orderData);
      console.log('Order response:', response.data);
      
      alert('Order placed successfully!');
      
      // If the item was from the wishlist, ask if the user wants to remove it from wishlist
      if (item.itemId) {
        if (window.confirm('Would you like to remove this item from your wishlist now that you\'ve ordered it?')) {
          try {
            await axios.post('http://localhost:4000/wishlist/remove', { 
              itemId: item.itemId || originalItemId,
              userId: user.id 
            });
            console.log('Item removed from wishlist after ordering');
          } catch (removeError) {
            console.error('Error removing item from wishlist after ordering:', removeError);
          }
        }
      }
      
      navigate('/myorders');
    } catch (error) {
      console.error('Error placing order:', error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server response error:', error.response.data);
        alert(`Error: ${error.response.data.error || 'Failed to place order'}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        alert('Network error. Please check your connection and try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request setup error:', error.message);
        alert(`Error: ${error.message || 'Failed to place order'}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <Unavbar />
        <div className="container mx-auto p-8 text-center">
          <h2 className="text-3xl font-semibold mb-4">Loading book details...</h2>
          <div className="animate-pulse flex justify-center">
            <div className="h-8 w-8 bg-purple-600 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Unavbar />
       <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }} >
         <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg bg-white">
           <h2 className="text-2xl font-semibold text-center mb-4" >Your order is almost Done! </h2>
           <p className="text-center text-gray-600 mb-4">We just need your delivery details</p>
           <form onSubmit={handleSubmit}>
        
   <div >
   <label className="block text-gray-600 text-center" style={{paddingTop:"10px"}}>Address:</label>
     <div class="input-container">
   
       <input type="text" id="myInput"  class="w-48 p-2 border border-gray-300 rounded focus:outline-none" placeholder=" "style={{width:"340px"}} 
      name="flatno"
      value={formData.flatno}
      onChange={handleChange}
     />
      <label for="myInput"  class="absolute left-2 transform -translate-y-1/2 bg-white px-1 pointer-events-none transition-transform">
        Flat no
      </label>
    </div>
  </div><br/>
 <div style={{display:"flex",justifyContent:"space-between"}}>
 <div >
    <div class="input-container">
      <input type="text" id="myInput"  class="w-48 p-2 border border-gray-300 rounded focus:outline-none" placeholder=" "
      style={{width:"140px"}} 
     name="city"
      value={formData.city}
      onChange={handleChange}
     />
      <label for="myInput"  class="absolute left-2 transform -translate-y-1/2 bg-white px-1 pointer-events-none transition-transform">
        City
      </label>
    </div>
  </div> 
  <div >
    <div class="input-container">
      <input type="text" id="myInput"  class="w-48 p-2 border border-gray-300 rounded focus:outline-none" placeholder=" "
      style={{width:"140px"}} 
      name="pincode"
      value={formData.pincode}
      onChange={handleChange}
     />
      <label for="myInput"  class="absolute left-2 transform -translate-y-1/2 bg-white px-1 pointer-events-none transition-transform">
        Pincode
      </label>
    </div>
  </div>
 </div>
  <br/>
  <div >
    <div class="input-container">
      <input type="text" id="myInput"  class="w-48 p-2 border border-gray-300 rounded focus:outline-none" placeholder=" "style={{width:"340px"}} 
      name="state"
      value={formData.state}
      onChange={handleChange}
     />
      <label for="myInput"  class="absolute left-2 transform -translate-y-1/2 bg-white px-1 pointer-events-none transition-transform">
        State
      </label>
    </div>
  </div> <br/>
             {item && (
                <div>
                  <div style={{ display: "flex", justifyContent: "center", height: "150px", width:"100%", marginBottom: "15px" }} >
                    <div style={{ height: "150px", width:"120px", overflow: "hidden" }} >
                        <img 
                          src={item?.itemImage ? 
                            (item.itemImage.startsWith('http') 
                              ? item.itemImage 
                              : `http://localhost:4000/uploads/${item.itemImage.replace(/^uploads[\/\\]/, '')}`) 
                            : 'https://via.placeholder.com/120x150?text=Book+Cover'} 
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
                                e.target.src = `https://via.placeholder.com/120x150?text=${encodeURIComponent(item.title || 'Book Cover')}`;
                                e.target.onerror = null; // Prevent infinite loop
                              };
                            } else {
                              e.target.src = `https://via.placeholder.com/120x150?text=${encodeURIComponent(item.title || 'Book Cover')}`;
                            }
                          }}
                        />
                        <p className='text-center'>{item.title} {item._id ? `(ID: ${item._id.slice(0, 6)})` : ''}</p>
                    </div>
                  </div>
                  
                    <div style={{ display:'flex',justifyContent:"space-between" }}>
                            <p style={{ fontSize: "17px" }}>Price:</p>
                            <p>₹{item.price}</p>
                    </div>  
                        <div style={{ display:'flex',justifyContent:"space-between" }}>
                            <p style={{ fontSize: "17px" }}>Delivery:</p>
                            <p>₹{deliveryFee}</p>
                        </div>
                        <div style={{ display:'flex',justifyContent:"space-between" }}>
                            <p style={{ fontSize: "17px" }}>Total Amount:</p>
                            <p>₹{parseInt(item.price, 10) + deliveryFee}</p>
                        </div>
                </div>
            )}
            <button
              type="submit"
              disabled={submitting}
              style={{ 
                width: "100%", 
                backgroundColor: submitting ? "#9f7aea" : "rebeccapurple", 
                border: "none",
                cursor: submitting ? "not-allowed" : "pointer"
              }}
              className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2">Processing...</span>
                  <span className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></span>
                </span>
              ) : "Place Order"}
            </button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-purple-600 hover:text-purple-800 underline"
              >
                Cancel and go back
              </button>
            </div>
          </form>
        </div>
      </div>         
    </div>
  );
}

export default OrderItem;
