import React, { useState } from "react";
import { signupUser } from "../api/authApi";
import { toast } from "../utils/toast";
import { signupSchema } from "../validation/Authvalidation";
import { ToastContainer } from "../components/ToastContainer";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationResult = signupSchema.validate({ email, password });
    if (validationResult.error) {
      toast.error(validationResult.error.details[0].message);
      return;
    }

    try {
      await signupUser(email, password);
      toast.success("Signup successful");
      window.location.href = "/login";
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Signup</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
