import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../store/authSlice"; // Action to clear credentials

const Navbar = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearCredentials()); // Clear the stored credentials
    navigate("/login"); // Redirect to the login page
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/home/bikes">Bikes</Link>
        </li>
        <li>
          <Link to="/home/reservations">Reservations</Link>
        </li>
        {role === "manager" && (
          <li>
            <Link to="/home/users">Users</Link>
          </li>
        )}
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
