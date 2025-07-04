// src/components/Navbar.js

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {Link } from "react-router-dom"

const Snavbar = () => {
  const get=localStorage.getItem('user')
  return (
    <Navbar bg="" variant="dark" expand="lg" className="bg-gradient-to-r from-indigo-800 to-indigo-600 shadow-lg">
      <Container>
        <Navbar.Brand>
          <Link to='/shome' className="text-white text-2xl font-bold no-underline hover:text-indigo-200 transition-colors">
            BookNest <span className="text-yellow-300 text-lg">(Seller)</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto flex items-center gap-4">
            <Link to="/shome" className="px-3 py-2 text-white no-underline hover:text-yellow-300 transition-colors">Dashboard</Link>
            <Link to="/myproducts" className="px-3 py-2 text-white no-underline hover:text-yellow-300 transition-colors">My Books</Link>
            <Link to="/addbook" className="px-3 py-2 text-white no-underline hover:text-yellow-300 transition-colors">Add Book</Link>
            <Link to="/orders" className="px-3 py-2 text-white no-underline hover:text-yellow-300 transition-colors">Orders</Link>
            <Link to="/" className="px-3 py-2 text-white no-underline hover:text-yellow-300 transition-colors">Logout</Link>
            <div className="ml-4 px-3 py-1 bg-indigo-900 rounded-full text-yellow-300 font-medium">
              {JSON.parse(get).name}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Snavbar;
