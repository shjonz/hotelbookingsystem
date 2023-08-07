import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill} from "react-icons/bs";

import "./Carousel.css";

export const Carousel = ({ data }) => {


    const generateImageURLs = () => {
        const urls = [];
        for (let i = 0; i < data.imageCount; i++) {
          const imageURL = `${data.image_details.prefix}${i}${data.image_details.suffix}`;
          urls.push(imageURL);
        }
        return urls;
      };
    
      const imageURLs = generateImageURLs();

  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === data.imageCount - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.imageCount - 1 : slide - 1);
  };

  return (
    <div className="carousel">
      <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
      {imageURLs.map((url, idx) => {
        return (
          <img
            src={url}
            alt={`Image ${idx}`}
            key={idx}
            className={slide === idx ? "slide" : "slide slide-hidden"}
          />
        );
      })}
      <BsArrowRightCircleFill
        onClick={nextSlide}
        className="arrow arrow-right"
      />

<span className="indicators">
  {`${slide + 1}/${imageURLs.length}`}
</span>

    </div>
  );
};