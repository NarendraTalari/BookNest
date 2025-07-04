// src/components/Navbar.js

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {Link } from "react-router-dom"

const Unavbar = () => {
  const get=localStorage.getItem('user')
  return (
    <Navbar bg="" variant="dark" expand="lg" className="bg-amazon-darkblue shadow-lg">
      <Container>
        <Navbar.Brand>
          <Link to='/uhome' className="text-amazon-yellow text-2xl font-bold no-underline hover:text-amazon-accent">BookStore</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto flex items-center gap-4">
            <Link to="/uhome" className="px-3 py-2 text-amazon-yellow no-underline hover:text-amazon-accent transition-colors">Home</Link>
            <Link to="/uproducts" className="px-3 py-2 text-amazon-yellow no-underline hover:text-amazon-accent transition-colors">Books</Link>
            <Link to="/wishlist" className="px-3 py-2 text-amazon-yellow no-underline hover:text-amazon-accent transition-colors">Wishlist</Link>
            <Link to="/myorders" className="px-3 py-2 text-amazon-yellow no-underline hover:text-amazon-accent transition-colors">My orders</Link>
            <Link to="/" className="px-3 py-2 text-amazon-yellow no-underline hover:text-amazon-accent transition-colors">Logout</Link>
            <h4 className="text-amazon-yellow ml-2">({JSON.parse(get).name})</h4>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Unavbar;
