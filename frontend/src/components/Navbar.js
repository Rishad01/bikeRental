import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../store/authSlice";
import { Navbar as BootstrapNavbar, Nav, Button } from "react-bootstrap";

const Navbar = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate("/login");
  };

  return (
    <BootstrapNavbar bg="light" expand="lg">
      <BootstrapNavbar.Brand as={Link} to="/home/bikes">
        Bike Rental
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
      <BootstrapNavbar.Collapse id="navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/home/bikes">
            Bikes
          </Nav.Link>
          <Nav.Link as={Link} to="/home/reservations">
            Reservations
          </Nav.Link>
          {role === "manager" && (
            <Nav.Link as={Link} to="/home/users">
              Users
            </Nav.Link>
          )}
        </Nav>
        <Button variant="outline-danger" onClick={handleLogout}>
          Logout
        </Button>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
