import React, { useState } from "react";
import { signupUser } from "../api/authApi";
import { toast } from "react-toastify";
import { signupSchema } from "../validation/Authvalidation";
import { Container, Form, Button, Alert } from "react-bootstrap";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

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
      const errorMessage = error.response?.data?.message || "Signup failed";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Signup</h2>
      {error && <Alert variant="danger">{error}</Alert>}{" "}
      <Form onSubmit={handleSignup}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Signup
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
