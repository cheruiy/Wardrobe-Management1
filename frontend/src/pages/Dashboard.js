import { useState, useEffect } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import AddItemForm from "./AddItemForm";
import ShowItems from "./ShowItems";
import "./Dashboard.css";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      console.error("🚨 No authentication token found!");
      return;
    }

    axios
      .get("http://localhost:5000/clothing", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setItems(res.data))
      .catch((err) =>
        console.error("❌ Error fetching clothing items:", err.response?.data || err.message)
      );
  }, [token]);

  return (
    <div className="dashboard-container">
      {location.pathname === "/dashboard" && (
        <>
          <h2 className="dashboard-title">Your Wardrobe</h2>
          <div className="dashboard-nav">
            <Link to="/dashboard/add-item" className="dashboard-link">Add Item</Link>
            <Link to="/dashboard/show-items" className="dashboard-link">Show Items</Link>
          </div>
        </>
      )}

      {location.pathname !== "/dashboard" && (
        <Link to="/dashboard" className="dashboard-back">← Back to Dashboard</Link>
      )}

      <Routes>
        <Route path="add-item" element={<AddItemForm setItems={setItems} />} />
        {/* ✅ Pass setItems as a prop to ShowItems */}
        <Route path="show-items" element={<ShowItems items={items} setItems={setItems} />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
