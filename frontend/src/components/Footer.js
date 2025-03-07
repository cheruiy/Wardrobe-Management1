import "./Footer.css";
const Footer = () => {
    return (
      <footer className="p-4 bg-gray-800 text-white text-center mt-4">
        <p>&copy; {new Date().getFullYear()} Wardrobe Manager. All rights reserved.</p>
        <p className="text-sm">Organize your fashion, your way.</p>
      </footer>
    );
  };
  
  export default Footer;
  