import axios from "axios";

const API_URL = "";

export const loginUser = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const signupUser = (email, password) => {
  return axios.post(`${API_URL}/signup`, { email, password });
};
