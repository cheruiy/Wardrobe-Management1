import { useState } from "react";
import axios from "axios";
import "./AddItemForm.css";

const AddItemForm = ({ setItems }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    color: "",
    size: "",
    brand: "",
    image_url: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error("🚨 Authentication token missing!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/clothing",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Item added:", response.data);
      setItems((prevItems) => [...prevItems, response.data]); // Update state in parent
      setFormData({
        name: "",
        category: "",
        color: "",
        size: "",
        brand: "",
        image_url: "",
      });
    } catch (error) {
      console.error("❌ Error adding item:", error.response?.data || error.message);
    }
  };

  return (
    <div className="add-item-page"> {/* Full-screen container */}
      <form onSubmit={handleSubmit} className="add-item-form"> {/* Square form */}
        <h2 className="add-item-title">Add New Item</h2>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="add-item-input" />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required className="add-item-input" />
        <input type="text" name="color" placeholder="Color" value={formData.color} onChange={handleChange} className="add-item-input" />
        <input type="text" name="size" placeholder="Size" value={formData.size} onChange={handleChange} className="add-item-input" />
        <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} className="add-item-input" />
        <input type="text" name="image_url" placeholder="Image URL" value={formData.image_url} onChange={handleChange} className="add-item-input" />
        <button type="submit" className="add-item-button">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemForm;
