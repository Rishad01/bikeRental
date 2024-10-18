import React, { useState, useEffect } from "react";
import {
  getAllUsersApi,
  updateUserApi,
  promoteToManagerApi,
} from "../api/userApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const Users = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedEmail, setEditedEmail] = useState("");

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getAllUsersApi(token);
      setUsers(fetchedUsers);
    } catch (error) {
      toast.error(error.message || "Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePromoteToManager = async (userId) => {
    try {
      await promoteToManagerApi(userId, token);
      toast.success("User promoted to manager successfully");
      fetchUsers();
    } catch (error) {
      toast.error(error.message || "Error promoting user to manager");
    }
  };

  const handleEditUser = async (userId) => {
    try {
      await updateUserApi(userId, { email: editedEmail }, token);
      toast.success("User details updated successfully");
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      toast.error(error.message || "Error updating user");
    }
  };

  return (
    <Container>
      <h2 className="mt-4">User Management</h2>
      {users.length > 0 ? (
        <Row>
          {users.map((user) => (
            <Col key={user.id} md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>
                    <strong>Email:</strong> {user.email}
                  </Card.Text>
                  <Card.Text>
                    <strong>Role:</strong> {user.role}
                  </Card.Text>

                  {editingUser === user.id ? (
                    <div>
                      <Form.Group controlId={`editEmail-${user.id}`}>
                        <Form.Control
                          type="email"
                          value={editedEmail}
                          onChange={(e) => setEditedEmail(e.target.value)}
                          placeholder="Edit Email"
                        />
                      </Form.Group>
                      <Button
                        variant="success"
                        onClick={() => handleEditUser(user.id)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setEditingUser(null)}
                        className="ms-2"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setEditingUser(user.id);
                          setEditedEmail(user.email);
                        }}
                      >
                        Edit Email
                      </Button>

                      {user.role === "user" && (
                        <Button
                          variant="warning"
                          onClick={() => handlePromoteToManager(user.id)}
                          className="ms-2"
                        >
                          Promote to Manager
                        </Button>
                      )}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No users found.</p>
      )}
    </Container>
  );
};

export default Users;
