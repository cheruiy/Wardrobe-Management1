import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the updated CSS file

const Login = () => {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(credentials.email, credentials.password);
    navigate("/dashboard");
  };

  return (
    <div className="login-page"> {/* Full-screen container */}
      <div className="login-container"> {/* Centered square login box */}
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            className="login-input" 
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="login-input" 
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
            required 
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="login-links">
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
