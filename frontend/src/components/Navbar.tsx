import React, { useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CartButton from "./CartButton";

export const MainNavBar = () => {
  const { isAuthenticated, logout, isAdmin } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar className="bg-white shadow-sm mb-3">
      <Container>
        <Navbar.Brand>E-commerce</Navbar.Brand>
        <Nav className="ms-auto">
          {!isAuthenticated ? (
            <>
              <Nav.Link as={NavLink} to="/register">
                Register
              </Nav.Link>
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/store">
                {isAdmin ? "Product List" : "Music Store"}
              </Nav.Link>
              <Button variant="link" onClick={handleLogout}>
                Logout
              </Button>
              {isAdmin && (
                <Nav.Link as={NavLink} to="/product">
                  Add Product
                </Nav.Link>
              )}
            </>
          )}
        </Nav>
        {isAuthenticated && (isAdmin ? <h3>Admin Panel</h3> : <CartButton />)}
      </Container>
    </Navbar>
  );
};
