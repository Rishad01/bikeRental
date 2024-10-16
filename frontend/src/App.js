import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home.js";
import Bikes from "./pages/Bikes"; // Assuming you have a Bikes component
import Reservations from "./pages/Reservations"; // Assuming you have a Reservations component
import Users from "./pages/Users";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />}>
          <Route path="bikes" element={<Bikes />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="users" element={<Users />} />
          <Route index element={<Bikes />} />{" "}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
