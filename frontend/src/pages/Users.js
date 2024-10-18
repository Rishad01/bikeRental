import React, { useState, useEffect } from "react";
import {
  getAllUsersApi,
  updateUserApi,
  promoteToManagerApi,
} from "../api/userApi";
import { toast } from "../utils/toast";
import { useSelector } from "react-redux";

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
    <div>
      <h2>User Management</h2>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} style={{ marginBottom: "10px" }}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>

            {editingUser === user.id ? (
              <div>
                <input
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  placeholder="Edit Email"
                />
                <button onClick={() => handleEditUser(user.id)}>Save</button>
                <button onClick={() => setEditingUser(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => {
                    setEditingUser(user.id);
                    setEditedEmail(user.email);
                  }}
                >
                  Edit Email
                </button>

                {user.role === "user" && (
                  <button onClick={() => handlePromoteToManager(user.id)}>
                    Promote to Manager
                  </button>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Users;
