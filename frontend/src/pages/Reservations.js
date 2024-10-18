import React, { useState, useEffect } from "react";
import {
  getUserReservationsApi,
  getAllReservationsApi,
  deleteReservationApi,
  updateReservationRatingApi,
} from "../api/reservationApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

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
      await deleteReservationApi(reservationId, token);
      toast.success("Reservation deleted successfully");
      fetchReservations();
    } catch (error) {
      toast.error(error.message || "Error deleting reservation");
    }
  };

  const handleRatingChange = async (reservationId, rating) => {
    try {
      const existingReservation = reservations.find(
        (res) => res.id === reservationId
      );
      if (existingReservation && existingReservation.rating) {
        toast.warning("You have already rated this reservation.");
        return;
      }

      await updateReservationRatingApi(reservationId, rating, token);
      toast.success("Rating updated successfully");
      fetchReservations();
    } catch (error) {
      toast.error(error.message || "Error updating rating");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [role]);

  return (
    <Container>
      <h2 className="mt-4">
        {role === "manager" ? "All Reservations" : "Your Reservations"}
      </h2>
      {reservations.length > 0 ? (
        <Row>
          {reservations.map((reservation) => (
            <Col key={reservation.id} md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Reservation Details</Card.Title>
                  <Card.Text>
                    <strong>Bike Model:</strong> {reservation.bike.model}
                  </Card.Text>
                  <Card.Text>
                    <strong>Bike Color:</strong> {reservation.bike.color}
                  </Card.Text>
                  <Card.Text>
                    <strong>Start Date:</strong> {reservation.startDate}
                  </Card.Text>
                  <Card.Text>
                    <strong>End Date:</strong> {reservation.endDate}
                  </Card.Text>

                  {role === "manager" && (
                    <>
                      <Card.Title>User Details</Card.Title>
                      <Card.Text>
                        <strong>User Email:</strong> {reservation.user.email}
                      </Card.Text>
                      <Card.Text>
                        <strong>User Role:</strong> {reservation.user.role}
                      </Card.Text>
                    </>
                  )}

                  <Card.Text>
                    <strong>Rating:</strong>{" "}
                    {reservation.rating || "Not rated yet"}
                  </Card.Text>

                  {!reservation.rating && (
                    <div>
                      {Array.from({ length: 5 }, (_, index) => (
                        <Button
                          key={index}
                          variant="outline-warning"
                          onClick={() =>
                            handleRatingChange(reservation.id, index + 1)
                          }
                        >
                          {index + 1}
                        </Button>
                      ))}
                    </div>
                  )}

                  <Button
                    variant="danger"
                    onClick={() => handleDeleteReservation(reservation.id)}
                    className="mt-2"
                  >
                    Delete Reservation
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>
          {role === "manager"
            ? "No reservations found."
            : "You have no reservations."}
        </p>
      )}
    </Container>
  );
};

export default UserReservations;
