import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Search from "./components/Search";
import "./global.css";
import SchedulePage from "./pages/SchedulePage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* Dashboard with Nested Routes */}
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/schedule" element={<SchedulePage />} /> {/* ✅ New Route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
