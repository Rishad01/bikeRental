import React, { useState, useEffect } from "react";
import {
  getUserReservationsApi,
  getAllReservationsApi,
  deleteReservationApi,
} from "../api/reservationApi";
import { toast } from "../utils/toast";
import { useSelector } from "react-redux";

const UserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const role = useSelector((state) => state.auth.role);
  const token = localStorage.getItem("token");

  const fetchReservations = async () => {
    try {
      let reservationsData;
      if (role === "manager") {
        reservationsData = await getAllReservationsApi(token);
      } else {
        reservationsData = await getUserReservationsApi(token);
      }
      setReservations(reservationsData);
    } catch (error) {
      toast.error(error.message || "Error fetching reservations");
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    try {
      await deleteReservationApi(reservationId, localStorage.getItem("token"));
      toast.success("Reservation deleted successfully");
      fetchReservations();
    } catch (error) {
      toast.error(error.message || "Error deleting reservation");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [role]);

  return (
    <div>
      <h2>{role === "manager" ? "All Reservations" : "Your Reservations"}</h2>
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <div key={reservation.id}>
            <h4>Reservation Details:</h4>
            <p>Bike Model: {reservation.bike.model}</p>
            <p>Bike Color: {reservation.bike.color}</p>
            <p>Start Date: {reservation.startDate}</p>
            <p>End Date: {reservation.endDate}</p>

            {role === "manager" && (
              <>
                <h4>User Details:</h4>
                <p>User Email: {reservation.user.email}</p>
                <p>User Role: {reservation.user.role}</p>
              </>
            )}
            <button onClick={() => handleDeleteReservation(reservation.id)}>
              Delete Reservation
            </button>
          </div>
        ))
      ) : (
        <p>
          {role === "manager"
            ? "No reservations found."
            : "You have no reservations."}
        </p>
      )}
    </div>
  );
};

export default UserReservations;
