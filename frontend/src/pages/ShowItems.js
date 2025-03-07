import axios from "axios";
import "./ShowItems.css"; // Import CSS

const ShowItems = ({ items, setItems }) => {
  // Function to delete an item
  const handleDelete = async (itemId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("🚨 Authentication token missing!");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/clothing/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ Remove deleted item from state
      setItems((prevItems) => prevItems.filter(item => item.id !== itemId));

      console.log("✅ Item deleted successfully");
    } catch (error) {
      console.error("❌ Error deleting item:", error.response?.data || error.message);
    }
  };

  if (items.length === 0) {
    return <p className="no-items-message">No items found.</p>;
  }

  return (
    <div className="show-items-container">
      <div className="show-item-grid">
        {items.map((item) => (
          <div key={item.id} className="show-item">
            <h3>{item.name}</h3>
            <p>Category: {item.category}</p>
            {item.image_url && <img src={item.image_url} alt={item.name} />}
            
            {/* ✅ Delete Button */}
            <button 
              onClick={() => handleDelete(item.id)} 
              className="delete-button">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowItems;
