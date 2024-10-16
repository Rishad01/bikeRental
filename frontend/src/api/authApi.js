import axios from "axios";

const API_URL = "http://localhost:3000";

export const loginUser = (email, password) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
};

export const signupUser = (email, password) => {
  return axios.post(`${API_URL}/signup`, { email, password });
};
