import React, { useState } from "react";
import { loginUser } from "../api/authApi";
import { toast } from "../utils/toast";
import { loginSchema } from "../validation/Authvalidation";
import { ToastContainer } from "../components/ToastContainer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationResult = loginSchema.validate({ email, password });
    if (validationResult.error) {
      toast.error(validationResult.error.details[0].message);
      return;
    }

    try {
      await loginUser(email, password);
      toast.success("Login successful");
      window.location.href = "/home";
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
