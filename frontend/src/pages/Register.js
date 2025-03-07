import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Import the updated CSS file

const Register = () => {
  const [userData, setUserData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/register", userData);
    alert("Registration successful! Please log in.");
    navigate("/login");
  };

  return (
    <div className="register-page"> {/* Full-screen container */}
      <div className="register-container"> {/* Centered square register box */}
        <h2 className="register-title">Create an Account</h2>
        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Username" 
            className="register-input" 
            onChange={(e) => setUserData({ ...userData, username: e.target.value })} 
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="register-input" 
            onChange={(e) => setUserData({ ...userData, email: e.target.value })} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="register-input" 
            onChange={(e) => setUserData({ ...userData, password: e.target.value })} 
            required 
          />
          <button type="submit" className="register-button">Register</button>
        </form>
        <div className="register-links">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
