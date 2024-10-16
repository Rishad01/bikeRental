import React, { useState } from "react";
import { loginUser } from "../api/authApi";
import { toast } from "../utils/toast";
import { loginSchema } from "../validation/Authvalidation";
import { ToastContainer } from "../components/ToastContainer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // New state for error messages
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error on form submission

    const validationResult = loginSchema.validate({ email, password });
    if (validationResult.error) {
      setError(validationResult.error.details[0].message); // Set error message
      toast.error(validationResult.error.details[0].message);
      return;
    }

    try {
      const response = await loginUser(email, password);
      const token = response.data.token;
      const role = response.data.user.role;
      localStorage.setItem("token", token);
      dispatch(setCredentials({ token, role }));
      console.log(response);
      toast.success("Login successful");
      navigate("/home");
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Login failed";
      setError(errorMessage); // Set error message for API failure
      toast.error(errorMessage);
    }
  };

  // Clear error when inputs change
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear error message when changing email
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setError(""); // Clear error message when changing password
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}{" "}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChangePassword}
        />
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
