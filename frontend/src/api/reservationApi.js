import axios from "axios";
const API_URL = "http://localhost:3000";
export const reserveBikeApi = async (bikeId, fromDate, toDate, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/reservations/${bikeId}`,
      {
        startDate: fromDate,
        endDate: toDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error reserving bike");
  }
};

export const getUserReservationsApi = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/reservations/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching reservations"
    );
  }
};

export const deleteReservationApi = async (reservationId, token) => {
  try {
    console.log(reservationId, token);
    await axios.delete(`${API_URL}/reservations/${reservationId}/cancel`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error deleting reservation"
    );
  }
};

export const getAllReservationsApi = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/reservations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching reservations"
    );
  }
};
