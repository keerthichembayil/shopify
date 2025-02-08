import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import '../css/Navbar.css'

const Navbar2 = ({ cartCount,user }) => {
  const displayCartCount = user && user.role === "admin" ? 0 : cartCount;
  return (
    <Navbar  variant="dark" expand="lg" className="px-3 navdesign">
      <Container>
        <Navbar.Brand as={Link} to="/">ShopEase</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
       
          <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/cart">
              Cart{" "}
              {user && displayCartCount > 0 ? (
                <Badge bg="danger">{displayCartCount}</Badge>
              ) : (
                <Badge bg="secondary">0</Badge>
              )}
            </Nav.Link>
           
            {user ? (
  <>
    <span>Welcome, {user.name}</span>
    <a href="/logout">Logout</a>
  </>
) : (
  <>
    
    <Nav.Link as={Link} to="/login">Login</Nav.Link>
    <Nav.Link as={Link} to="/register">Register</Nav.Link>
  </>
)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar2;