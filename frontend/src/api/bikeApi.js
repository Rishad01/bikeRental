import axios from "axios";
const API_URL = "http://localhost:3000";

export const fetchBikesApi = async (filters, page, limit, token) => {
  try {
    const response = await axios.get(`${API_URL}/bikes/search`, {
      params: {
        ...filters,
        page,
        limit,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching bikes");
  }
};
