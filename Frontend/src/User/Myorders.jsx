// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../Vendor/List.css'
// import { Card } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import Unavbar from './Unavbar';

// function Myorders() {
//   const [cars, setCars] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     // if (user) {
//       axios
//         .get(`http://localhost:8000/getorders/${user.id}`)
//         .then((response) => {
//           const taskData = response.data;
//           setCars(taskData);
//           console.log(taskData)
//         })
//         .catch((error) => {
//           console.error('Error fetching tasks: ', error);
//         });
//     // } 
//     // else {
//     //   console.log('ERROR');
//     // }
//   }, []);


  

//   return (
//     <div>
//       <Unavbar/>

//       <div>
//         <h1>My Booking</h1>
//         <div>
//           {cars.map((item) => {
//              return (
//               <Card
//                 key={item._id}
//                 style={{
//                   width: '90%',
//                   marginLeft: '65px',
//                   backgroundColor: '#fff',
//                   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                   borderRadius: '8px',
//                   paddingTop: '15px',
//                   marginBottom: '35px',
//                 }}
//               >
//                 <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//                  <div >
//                  <img src={`http://localhost:8000/${item?.itemImage}`} alt={`${item.itemtype} Image`} style={{height:"80px"}} />
//                  </div>
//                 <div>
//                 <p>ProductName:</p>
//                 <p>{item.itemname}</p>
//                 </div>
        
//                 <div>
//                 <p>Address:</p>
//                 {item.flatno},<br/>{item.city},({item.pincode}),<br/>{item.state}.
//                 </div>
//                 <div>
//               <p>Seller</p>
//                 <p>{item.seller}</p>
//               </div>
//                <div>
//                <p>BookingDate</p>
//                 <p>{item.BookingDate}</p>
//                </div>
//                <div>
//                <p>Delivery By</p>
//                 <p>{item.Delivery}</p>
//                </div>
//               <div>
//               <p>Price</p>
//                 <p>{item.totalamount}</p>
//               </div>
//               <div>
//               <p>Status</p>
//                 <p></p>
//               </div>
//                 </div>
//               </Card>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Myorders;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import Unavbar from './Unavbar';

// function Myorders() {
//   const [cars, setCars] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));

//     axios.get(`http://localhost:8000/getorders/${user.id}`)
//       .then((response) => {
//         const taskData = response.data;
//         // Update order status based on booking date
//         const currentDate = new Date();

//         const updatedOrders = taskData.map((item) => {
//           const bookingDate = new Date(item.BookingDate);

//           if (currentDate === bookingDate) {
//             item.status = "Shipped";
//           } else if (currentDate < bookingDate) {
//             const timeDifference = Math.floor((bookingDate - currentDate) / (1000 * 60 * 60 * 24));
//             if (timeDifference <= 2) {
//               item.status = "On the way";
//             } else if (timeDifference > 7) {
//               item.status = "Delivered";
//             }
//           }

//           return item;
//         });

//         setCars(updatedOrders);
//       })
//       .catch((error) => {
//         console.error('Error fetching tasks: ', error);
//       });
//   }, []);

//   return (
//     <div>
//       <Unavbar/>

//       <div>
//         <h1>My Booking</h1>
//         <div>
//           {cars.map((item) => {
//             return (
//               <Card
//                 key={item._id}
//                 style={{
//                   width: '90%',
//                   marginLeft: '65px',
//                   backgroundColor: '#fff',
//                   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                   borderRadius: '8px',
//                   paddingTop: '15px',
//                   marginBottom: '35px',
//                 }}
//               >
//                 <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//                   <div >
//                   <img src={`http://localhost:8000/${item?.itemImage}`} alt={`${item.itemtype} Image`} style={{height:"80px"}} />
//                   </div>
//                  <div>
//                  <p>ProductName:</p>
//                  <p>{item.itemname}</p>
//                  </div>
        
//                  <div>
//                  <p>Address:</p>
//                  {item.flatno},<br/>{item.city},({item.pincode}),<br/>{item.state}.
//                  </div>
//                  <div>
//                <p>Seller</p>
//                  <p>{item.seller}</p>
//                </div>
//                 <div>
//                 <p>BookingDate</p>
//                  <p>{item.BookingDate}</p>
//                 </div>
//                 <div>
//                 <p>Delivery By</p>
//                  <p>{item.Delivery}</p>
//                 </div>
//                <div>
//                <p>Price</p>
//                  <p>{item.totalamount}</p>
//                </div>
//                <div>
//                <p>Status</p>
//                </div>
//                  </div>

               
//               </Card>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Myorders;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Seller/List.css';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Unavbar from './Unavbar';
import Footer from '../Componenets/Footer';

function Myorders() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios
        .get(`http://localhost:4000/getorders/${user.id}`)
        .then((response) => {
          const taskData = response.data;
          setCars(taskData);
          console.log(taskData);
        })
        .catch((error) => {
          console.error('Error fetching tasks: ', error);
        });
    } else {
      console.log('ERROR');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to cancel an order
  const cancelOrder = async (orderId) => {
    try {
      if (confirm('Are you sure you want to cancel this order?')) {
        await axios.post(`http://localhost:4000/cancelorder`, { orderId });
        alert('Order cancelled successfully');
        fetchOrders(); // Refresh the orders list
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order. Please try again.');
    }
  };

  // Function to calculate the status based on the delivery date
  const calculateStatus = (Delivery) => {
    try {
      const currentDate = new Date();
      // Parse the delivery date - handle different formats
      let formattedDeliveryDate;
      
      if (Delivery) {
        // Try to parse the date in various formats
        if (Delivery.includes('/')) {
          // Format: MM/DD/YYYY
          const [month, day, year] = Delivery.split('/');
          formattedDeliveryDate = new Date(year, month - 1, day);
        } else {
          // Try standard date parsing
          formattedDeliveryDate = new Date(Delivery);
        }
        
        // Check if the date is valid
        if (isNaN(formattedDeliveryDate.getTime())) {
          console.error('Invalid delivery date format:', Delivery);
          return "processing"; // Default status if date is invalid
        }
        
        if (formattedDeliveryDate >= currentDate) {
          return "ontheway";
        } else {
          return "delivered";
        }
      } else {
        return "processing"; // Default status if no delivery date
      }
    } catch (error) {
      console.error('Error calculating status:', error);
      return "processing"; // Default status on error
    }
  };

  return (
    <div>
      <Unavbar />
      <div>
        <h1 className='text-center'>My Orders</h1>
        <div>
          {cars.map((item) => {
            const status = calculateStatus(item.Delivery);

            return (
              <Card
                key={item._id}
                style={{
                  width: '90%',
                  marginLeft: '65px',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  paddingTop: '15px',
                  marginBottom: '35px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div>
                    <img 
                      src={item.itemImage ? 
                        (item.itemImage.startsWith('http') 
                          ? item.itemImage 
                          : `http://localhost:4000/uploads/${item.itemImage.replace(/^uploads[\/\\]/, '')}`) 
                        : 'https://via.placeholder.com/80x120?text=Book+Cover'} 
                      alt={`${item.booktitle || item.itemname || 'Book'} Cover`} 
                      style={{ height: "80px" }} 
                      onError={(e) => {
                        console.log(`Error loading image for order ${item._id}`);
                        
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
                            e.target.src = `https://via.placeholder.com/80x120?text=Book`;
                            e.target.onerror = null; // Prevent infinite loop
                          };
                        } else {
                          e.target.src = `https://via.placeholder.com/80x120?text=Book`;
                        }
                      }}
                    />
                  </div>
                  <div>
                    <p>ProductName:</p>
                    <p>{item.booktitle || item.itemname || "Book"}-{item._id.slice(3, 7)}</p>
                  </div>
                  <div>
                    <p>Orderid:</p>
                    <p>{item._id.slice(0,10)}</p>
                  </div>
                  <div>
                    <p>Address:</p>
                    {item.flatno},<br />{item.city},({item.pincode}),<br />{item.state}.
                  </div>
                  <div>
                    <p>Seller</p>
                    <p>{item.seller}</p>
                  </div>
                  <div>
                    <p>BookingDate</p>
                    <p>{item.BookingDate}</p>
                  </div>
                  <div>
                    <p>Delivery By</p>
                    <p>{item.Delivery}</p>
                  </div>
                  <div>
                    <p>Price</p>
                    <p>${item.totalamount}</p>
                  </div>
                  <div>
                    <p>Status</p>
                    <p>{status}</p>
                  </div>
                  <div>
                    {status === "ontheway" && (
                      <Button
                        style={{ backgroundColor: 'red', border: 'none', marginTop: '20px' }}
                        onClick={() => cancelOrder(item._id)}
                      >
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Footer/>
    </div>
  );
}

export default Myorders;
