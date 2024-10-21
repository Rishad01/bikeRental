import React, { useState, useEffect } from "react";
import {
  fetchBikesApi,
  addBikeApi,
  deleteBikeApi,
  editBikeApi,
} from "../api/bikeApi";
import { reserveBikeApi } from "../api/reservationApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { bikeSchema } from "../validation/bikeSchema";
import { Container, Button, Form, Alert, Card, Modal } from "react-bootstrap";

const Bikes = () => {
  //const token = useSelector((state) => state.auth.token);
  const token = localStorage.getItem("token");
  //const role = useSelector((state) => state.auth.role);
  const role = localStorage.getItem("role");
  const [bikes, setBikes] = useState([]);
  const [filters, setFilters] = useState({
    color: "",
    model: "",
    fromDate: "",
    toDate: "",
    avgRating: "", // Add rating filter here
  });
  const [newBike, setNewBike] = useState({
    location: "",
    color: "",
    model: "",
    avgRating: 0,
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [editBike, setEditBike] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchBikes = async () => {
    if (
      (filters.fromDate && !filters.toDate) ||
      (!filters.fromDate && filters.toDate)
    ) {
      toast.error("Both 'From Date' and 'To Date' must be selected together");
      return;
    }

    if (filters.avgRating && (filters.avgRating < 0 || filters.avgRating > 5)) {
      toast.error("Rating must be between 0 and 5");
      return;
    }

    try {
      const bikeData = await fetchBikesApi(filters, page, limit, token);
      setBikes(bikeData.bikes);
    } catch (error) {
      toast.error(error.message || "Error fetching bikes");
    }
  };

  useEffect(() => {
    fetchBikes();
  }, [page, limit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleNewBikeChange = (e) => {
    const { name, value } = e.target;
    setNewBike({ ...newBike, [name]: value });
  };

  const handleReserveBike = async (bikeId) => {
    if (!filters.fromDate || !filters.toDate) {
      toast.error("Please specify both 'From Date' and 'To Date' to reserve.");
      return;
    }

    try {
      await reserveBikeApi(bikeId, filters.fromDate, filters.toDate, token);
      toast.success("Bike reserved successfully!");
      fetchBikes();
    } catch (error) {
      toast.error(error.message || "Error reserving bike");
    }
  };

  const handleAddBike = async () => {
    const { error } = bikeSchema.validate(newBike);
    if (error) {
      console.log(error);
      toast.error(error.message);
      return;
    }

    try {
      await addBikeApi(newBike, token);
      toast.success("Bike added successfully!");
      fetchBikes();
      setNewBike({ location: "", color: "", model: "", avgRating: 0 });
    } catch (error) {
      toast.error(error.message || "Error adding bike");
    }
  };

  const handleDeleteBike = async (bikeId) => {
    try {
      await deleteBikeApi(bikeId, token);
      toast.success("Bike deleted successfully!");
      fetchBikes();
    } catch (error) {
      toast.error(error.message || "Error deleting bike");
    }
  };

  const handleEditBike = (bike) => {
    setEditBike(bike);
    setShowModal(true);
  };

  const handleEditBikeChange = (e) => {
    const { name, value } = e.target;
    setEditBike({ ...editBike, [name]: value });
  };

  const handleUpdateBike = async () => {
    try {
      await editBikeApi(editBike.id, editBike, token);
      toast.success("Bike updated successfully!");
      fetchBikes();
      setShowModal(false);
    } catch (error) {
      toast.error(error.message || "Error updating bike");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Bikes List</h2>

      <div style={{ marginBottom: "20px" }}>
        <h4>Filter Bikes</h4>
        <Form>
          <Form.Group controlId="color">
            <Form.Label>Color:</Form.Label>
            <Form.Control
              type="text"
              name="color"
              value={filters.color}
              onChange={handleInputChange}
              placeholder="Color"
            />
          </Form.Group>
          <Form.Group controlId="model">
            <Form.Label>Model:</Form.Label>
            <Form.Control
              type="text"
              name="model"
              value={filters.model}
              onChange={handleInputChange}
              placeholder="Model"
            />
          </Form.Group>
          <Form.Group controlId="fromDate">
            <Form.Label>From Date:</Form.Label>
            <Form.Control
              type="date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="toDate">
            <Form.Label>To Date:</Form.Label>
            <Form.Control
              type="date"
              name="toDate"
              value={filters.toDate}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="avgRating">
            <Form.Label>Rating (min):</Form.Label>
            <Form.Control
              type="number"
              name="avgRating"
              value={filters.avgRating}
              onChange={handleInputChange}
              placeholder="Min Rating"
              min="0"
              max="5"
              step="0.1"
            />
          </Form.Group>

          <Button
            onClick={fetchBikes}
            variant="primary"
            style={{ marginTop: "10px" }}
          >
            Search Bikes
          </Button>
        </Form>
      </div>

      {role === "manager" && (
        <div style={{ marginBottom: "20px" }}>
          <h4>Add New Bike</h4>
          <Form>
            <Form.Group controlId="location">
              <Form.Label>Location:</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={newBike.location}
                onChange={handleNewBikeChange}
                placeholder="Bike Location"
              />
            </Form.Group>
            <Form.Group controlId="newColor">
              <Form.Label>Color:</Form.Label>
              <Form.Control
                type="text"
                name="color"
                value={newBike.color}
                onChange={handleNewBikeChange}
                placeholder="Bike Color"
              />
            </Form.Group>
            <Form.Group controlId="model">
              <Form.Label>Model:</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={newBike.model}
                onChange={handleNewBikeChange}
                placeholder="Bike Model"
              />
            </Form.Group>
            <Button
              onClick={handleAddBike}
              variant="success"
              style={{ marginTop: "10px" }}
            >
              Add Bike
            </Button>
          </Form>
        </div>
      )}

      <div>
        {bikes.length > 0 ? (
          bikes.map((bike) => (
            <Card key={bike.id} className="mb-3">
              <Card.Body>
                <Card.Title>{bike.name}</Card.Title>
                <Card.Text>Color: {bike.color}</Card.Text>
                <Card.Text>Model: {bike.model}</Card.Text>
                <Card.Text>
                  Average Rating:{" "}
                  {bike.avgRating
                    ? bike.avgRating
                    : "Not rated by any user yet!"}
                </Card.Text>
                <Card.Text>Location: {bike.location}</Card.Text>

                {role === "user" && filters.fromDate && filters.toDate && (
                  <Button
                    onClick={() => handleReserveBike(bike.id)}
                    variant="primary"
                    style={{ marginTop: "10px" }}
                  >
                    Reserve Bike
                  </Button>
                )}

                {role === "manager" && (
                  <>
                    <Button
                      onClick={() => handleDeleteBike(bike.id)}
                      variant="danger"
                      style={{ marginTop: "10px" }}
                    >
                      Delete Bike
                    </Button>
                    <Button
                      onClick={() => handleEditBike(bike)}
                      variant="warning"
                      style={{ marginTop: "10px" }}
                    >
                      Edit Bike
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No bikes available with the selected filters.</p>
        )}

        <div>
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            variant="secondary"
            style={{ marginRight: "5px" }}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            variant="secondary"
          >
            Next
          </Button>
        </div>
      </div>

      {editBike && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Bike</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="editLocation">
                <Form.Label>Location:</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={editBike.location}
                  onChange={handleEditBikeChange}
                />
              </Form.Group>
              <Form.Group controlId="editColor">
                <Form.Label>Color:</Form.Label>
                <Form.Control
                  type="text"
                  name="color"
                  value={editBike.color}
                  onChange={handleEditBikeChange}
                />
              </Form.Group>
              <Form.Group controlId="editModel">
                <Form.Label>Model:</Form.Label>
                <Form.Control
                  type="text"
                  name="model"
                  value={editBike.model}
                  onChange={handleEditBikeChange}
                />
              </Form.Group>
              <Button onClick={handleUpdateBike} variant="primary">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default Bikes;
