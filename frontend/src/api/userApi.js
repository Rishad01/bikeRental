import axios from "axios";
const API_URL = "http://localhost:3000";

// Fetch all users
export const getAllUsersApi = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching users");
  }
};

// Promote user to manager
export const promoteToManagerApi = async (userId, token) => {
  try {
    await axios.put(
      `${API_URL}/users/${userId}/promote`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error promoting user to manager"
    );
  }
};

// Update user details (e.g., email)
export const updateUserApi = async (userId, updateData, token) => {
  try {
    await axios.put(`${API_URL}/users/${userId}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error updating user details"
    );
  }
};
