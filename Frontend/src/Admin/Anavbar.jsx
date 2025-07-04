// src/components/Navbar.js

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {Link } from "react-router-dom"

const Anavbar = () => {
  const get=localStorage.getItem('user')
  return (
    <Navbar bg="" variant="dark" expand="lg" className="bg-gradient-to-r from-purple-900 to-purple-700 shadow-lg">
      <Container>
        <Navbar.Brand>
          <Link to='/ahome' className="text-white text-2xl font-bold no-underline hover:text-purple-200 transition-colors">
            BookNest <span className="text-yellow-300 text-lg">(Admin)</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto flex items-center gap-4">
            <Link to="/ahome" className="px-3 py-2 text-white no-underline hover:text-yellow-300 transition-colors">Dashboard</Link>
            <Link to="/users" className="px-3 py-2 text-white no-underline hover:text-yellow-300 transition-colors">Users</Link>
            <Link to="/sellers" className="px-3 py-2 text-white no-underline hover:text-yellow-300 transition-colors">Sellers</Link>
            <Link to="/items" className="px-3 py-2 text-white no-underline hover:text-yellow-300 transition-colors">Books</Link>
            <Link to="/" className="px-3 py-2 text-white no-underline hover:text-yellow-300 transition-colors">Logout</Link>
            <div className="ml-4 px-3 py-1 bg-purple-900 rounded-full text-yellow-300 font-medium">
              {JSON.parse(get).name}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Anavbar;
