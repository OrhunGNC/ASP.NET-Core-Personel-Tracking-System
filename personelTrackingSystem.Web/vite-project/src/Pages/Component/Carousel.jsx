import React, { useState,useEffect } from 'react';
import {LeftOutlined,RightOutlined} from '@ant-design/icons'
const Carousel = ({ imageSources }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
const autoPlayInterval=3000;
useEffect(() => {
    let intervalId;


      intervalId = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);


    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageSources.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageSources.length - 1 : prevIndex - 1
    );
  };

  return (
    <div style={{width:'100%'}} className="carousel">
      <button style={{backgroundColor:'transparent',border:'none',cursor:'pointer'}} onClick={prevSlide}><LeftOutlined/></button>
      <img style={{width:'920px',height:'538px'}} src={imageSources[currentIndex]} alt="carousel-img" />
      <button style={{backgroundColor:'transparent',border:'none',cursor:'pointer'}} onClick={nextSlide}><RightOutlined /></button>
    </div>
  );
};

export default Carousel;