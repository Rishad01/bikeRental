import React, { useState, useEffect } from "react";
import { fetchBikesApi } from "../api/bikeApi";
import { reserveBikeApi } from "../api/reservationApi";
import { toast } from "../utils/toast";
import { useSelector } from "react-redux";

const Bikes = () => {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const [bikes, setBikes] = useState([]);
  const [filters, setFilters] = useState({
    color: "",
    model: "",
    fromDate: "",
    toDate: "",
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchBikes = async () => {
    if (
      (filters.fromDate && !filters.toDate) ||
      (!filters.fromDate && filters.toDate)
    ) {
      toast.error("Both 'From Date' and 'To Date' must be selected together");
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

  return (
    <div>
      <h2>Bikes List</h2>

      <div style={{ marginBottom: "20px" }}>
        <h4>Filter Bikes</h4>
        <div>
          <label>Color:</label>
          <input
            type="text"
            name="color"
            value={filters.color}
            onChange={handleInputChange}
            placeholder="Color"
          />
        </div>
        <div>
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={filters.model}
            onChange={handleInputChange}
            placeholder="Model"
          />
        </div>
        <div>
          <label>From Date:</label>
          <input
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>To Date:</label>
          <input
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={handleInputChange}
          />
        </div>

        <button onClick={fetchBikes} style={{ marginTop: "10px" }}>
          Search Bikes
        </button>
      </div>

      <div>
        {bikes.length > 0 ? (
          <>
            {bikes.map((bike) => (
              <div key={bike.id} style={{ marginBottom: "10px" }}>
                <h3>{bike.name}</h3>
                <p>Color: {bike.color}</p>
                <p>Model: {bike.model}</p>

                {role === "user" && filters.fromDate && filters.toDate && (
                  <button
                    onClick={() => handleReserveBike(bike.id)}
                    style={{ marginTop: "10px" }}
                  >
                    Reserve Bike
                  </button>
                )}
              </div>
            ))}

            <div>
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
            </div>
          </>
        ) : (
          <p>No bikes available with the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default Bikes;
