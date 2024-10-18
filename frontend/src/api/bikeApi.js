import axios from "axios";
const API_URL = "http://localhost:3000";

export const fetchBikesApi = async (filters, page, limit, token) => {
  try {
    const isFiltersApplied =
      filters.color ||
      filters.model ||
      (filters.fromDate && filters.toDate) ||
      filters.avgRating;

    const endpoint = isFiltersApplied
      ? `${API_URL}/bikes/search`
      : `${API_URL}/bikes`;

    const response = await axios.get(endpoint, {
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

export const addBikeApi = async (bikeData, token) => {
  try {
    const response = await axios.post(`${API_URL}/bikes`, bikeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error adding bike");
  }
};

export const deleteBikeApi = async (bikeId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/bikes/${bikeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error deleting bike");
  }
};

export const editBikeApi = async (bikeId, updatedBikeData, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/bikes/edit/${bikeId}`,
      updatedBikeData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error editing bike");
  }
};
