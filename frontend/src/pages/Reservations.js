import React, { useState, useEffect } from "react";
import {
  getUserReservationsApi,
  deleteReservationApi,
} from "../api/reservationApi";
import { toast } from "../utils/toast";
import { useSelector } from "react-redux";

const UserReservations = () => {
  //const token = useSelector((state) => state.auth.token);
  const [reservations, setReservations] = useState([]);

  const fetchUserReservations = async (token) => {
    try {
      const userReservations = await getUserReservationsApi(
        localStorage.getItem("token")
      );
      setReservations(userReservations);
    } catch (error) {
      toast.error(error.message || "Error fetching reservations");
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    try {
      await deleteReservationApi(reservationId, localStorage.getItem("token"));
      toast.success("Reservation deleted successfully");
      // Fetch updated reservations
      fetchUserReservations();
    } catch (error) {
      toast.error(error.message || "Error deleting reservation");
    }
  };

  useEffect(() => {
    fetchUserReservations();
  }, []);

  return (
    <div>
      <h2>Your Reservations</h2>
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <div key={reservation.id}>
            <p>Bike: {reservation.bike.model}</p>
            <p>Start Date: {reservation.startDate}</p>
            <p>End Date: {reservation.endDate}</p>
            <button onClick={() => handleDeleteReservation(reservation.id)}>
              Delete Reservation
            </button>
          </div>
        ))
      ) : (
        <p>No reservations found.</p>
      )}
    </div>
  );
};

export default UserReservations;
