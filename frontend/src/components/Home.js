import { Link } from "react-router-dom";
import Footer from "./Footer";
import "./Home.css"; // Import the updated CSS file
import wardrobeImg from "./images/image.png"; // ✅ Import the image
import outfitsImg from "./images/image (1).png"
import clothingImg from "./images/pexels-solliefoto-298863.jpg"

const Home = () => {
  return (
    <div className="home-container">
      {/* ✅ Header Section */}
      <header className="home-header">
        <h1>Welcome to Wardrobe Manager</h1>
        <p>Your ultimate digital closet solution</p>
      </header>

      {/* ✅ Hero Section with Images */}
      <section className="home-hero">
        <div className="hero-item">
          <img src={wardrobeImg} alt="Wardrobe" /> {/* ✅ Use imported image */}
          <h2>Manage Your Wardrobe</h2>
          <p>Digitally track and organize your fashion collection.</p>
        </div>
        <div className="hero-item">
          <img src={outfitsImg} alt="Outfits" />
          <h2>Plan Your Outfits</h2>
          <p>Mix and match outfits effortlessly before even wearing them.</p>
        </div>
        <div className="hero-item">
          <img src={clothingImg} alt="Clothing" />
          <h2>Discover New Styles</h2>
          <p>Keep track of trends and explore new styles.</p>
        </div>
      </section>

      {/* ✅ Call to Action */}
      <section className="home-cta">
        <h2>Start Organizing Today!</h2>
        <p>Sign up now and take control of your wardrobe.</p>
        <Link to="/register" className="cta-button">Get Started</Link>
      </section>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};

export default Home;
