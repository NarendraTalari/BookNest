import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Card, Container, Row, Col, Badge } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Anavbar from './Anavbar';
import './Users.css'; // custom CSS file for extra polish (create this)

const Users = () => {
  const [userbookings, setUserbookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users`);
        if (!response.data) throw new Error('No data received');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch users.');
        setLoading(false);
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const deleteData = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/userdelete/${taskId}`);
      if (response.status === 200) {
        setUsers(users.filter(user => user._id !== taskId));
        alert('User has been deleted successfully');
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  const deleteorder = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/userorderdelete/${taskId}`);
      if (response.status === 200) {
        setUserbookings(userbookings.filter(order => order._id !== taskId));
        alert('Order has been deleted successfully');
      } else {
        throw new Error('Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order. Please try again.');
    }
  };

  const fetchUserBikeData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/getorders/${userId}`);
      if (response.data) {
        setUserbookings(response.data);
        toggleDetails();
      } else {
        throw new Error('No orders found');
      }
    } catch (error) {
      console.error('Error fetching user orders:', error);
      alert('Failed to fetch user orders. Please try again.');
    }
  };

  const calculateStatus = (Delivery) => {
    if (!Delivery) return "unknown";
    const currentDate = new Date();
    const formattedDeliveryDate = new Date(Delivery);
    return isNaN(formattedDeliveryDate) ? "unknown" :
      (formattedDeliveryDate >= currentDate ? "ontheway" : "delivered");
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">Error: {error}</div>;

  return (
    <>
      <Anavbar />
      <Container className="mt-4">
        <h2 className="text-center mb-4 dashboard-title">User Management Dashboard</h2>

        <Card className="mb-4 shadow-sm p-3 rounded-4">
          <Card.Header className="bg-primary text-white">
            <h4 className="mb-0">Registered Users</h4>
          </Card.Header>
          <Card.Body>
            <Table responsive hover bordered className="text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                  <th>Bookings</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        className="me-2"
                        onClick={() => deleteData(user._id)}
                      >
                        <FaTrash />
                      </Button>
                      <Link to={`/edituser/${user._id}`}>
                        <Button variant="secondary" size="sm">
                          <FaEdit />
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => fetchUserBikeData(user._id)}
                      >
                        View Orders
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {showDetails && (
          <Card className="shadow-sm p-3 rounded-4">
            <Card.Header className="bg-success text-white d-flex justify-content-between">
              <h4 className="mb-0">User Orders</h4>
              <Button variant="light" size="sm" onClick={toggleDetails}>
                Close
              </Button>
            </Card.Header>
            <Card.Body>
              {userbookings.length > 0 ? (
                <Table responsive hover bordered className="text-center align-middle">
                  <thead className="table-secondary">
                    <tr>
                      <th>Order Name</th>
                      <th>Address</th>
                      <th>Delivery Date</th>
                      <th>Status</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userbookings.map((order) => (
                      <tr key={order._id}>
                        <td>{order.name}</td>
                        <td>{order.address}</td>
                        <td>{order.delivery}</td>
                        <td>
                          <Badge bg={calculateStatus(order.delivery) === 'delivered' ? 'success' : 'warning'}>
                            {calculateStatus(order.delivery)}
                          </Badge>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => deleteorder(order._id)}
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center text-muted">No orders available for this user.</p>
              )}
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default Users;
