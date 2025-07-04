// src/components/Navbar.js

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      {/* Grateful Welcome Message (only on root page) */}
      <div className="bg-gradient-to-r from-amazon-yellow via-amazon-accent to-amazon-lightblue py-6 px-4 flex flex-col items-center shadow-lg mb-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-amazon-darkblue drop-shadow text-center mb-2">Thank You for Visiting BookStore!</h1>
        <p className="text-lg md:text-xl text-amazon-darkblue text-center max-w-2xl">We are grateful for your trust. Explore our vast collection and enjoy a seamless, Amazon-inspired book shopping experience. Happy reading!</p>
      </div>
      <Navbar bg="" variant="dark" expand="lg" style={{backgroundColor:"blue"}}>
        <Container>
          <Navbar.Brand ><Link to='/' style={{color:'white',textDecoration:"none"}}>BookStore</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto" >
              <Link to="/login" style={{padding:"10px",color:"white",textDecoration:"none"}}>User</Link>
              <Link to="/slogin" style={{padding:"10px",color:"white",textDecoration:"none"}}>Seller</Link>
              <Link to="/alogin" style={{padding:"10px",color:"white",textDecoration:"none"}}>Admin</Link>   
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Home;
