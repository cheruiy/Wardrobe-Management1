import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // ✅ Ensure styles are included

import outfit1 from "./images/image.png";
import outfit2 from "./images/image (1).png";
import outfit3 from "./images/pexels-solliefoto-298863.jpg";

const OutfitCarousel = () => {
  return (
    <div className="carousel-container">
      <Carousel showThumbs={false} infiniteLoop autoPlay>
        <div>
          <img src={outfit1} alt="image.png" />
          <p className="legend">Casual Look</p>
        </div>
        <div>
          <img src={outfit2} alt="image.png" />
          <p className="legend">Formal Attire</p>
        </div>
        <div>
          <img src={outfit3} alt="image.png" />
          <p className="legend">Streetwear</p>
        </div>
      </Carousel>
    </div>
  );
};

export default OutfitCarousel;
