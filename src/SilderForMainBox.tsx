import React, { useState } from "react";
import styled from "styled-components";

const SlideShow: React.FC = () => {
  const slides = [
    "https://health.chosun.com/site/data/img_dir/2024/01/19/2024011901219_0.jpg",
    "https://dispatch.cdnser.be/wp-content/uploads/2017/11/20171127233235_16.jpg",
    "https://blog.kakaocdn.net/dn/9nrrA/btrEcRxcaJs/7EhjOTc02PEIkI4E68BK2k/img.jpg"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  return (
    <SliderContainer 
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
       {isHovered && currentSlide !== 0 && <Leftbtn onClick={prevSlide}>&lt;</Leftbtn>}
      {isHovered && currentSlide !== slides.length - 1 && <Rightbtn onClick={nextSlide}>&gt;</Rightbtn>}
      <SlideContainer style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <Slide key={index}>
            <img src={slide} alt={`Slide ${index}`} />
          </Slide>
        ))}
      </SlideContainer>

      <Indicators>
        {slides.map((_, index) => (
          <Indicator
            key={index}
            className={index === currentSlide ? "active" : ""}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </Indicators>
    </SliderContainer>
  );
};

export default SlideShow;

const SliderContainer = styled.div`
  width: 100%;
  height: 480px;
  overflow: hidden;
  position: relative;
`;

const SlideContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  position: relative; 
  z-index: 1; 
`;

const Slide = styled.div`
  width: 100%;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 480px;
    object-fit: cover;
  }
`;

const Leftbtn = styled.button`
  left: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5em;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 2;
  color: red;
`;

const Rightbtn = styled.button`
  right: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5em;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 2;
  color: red;
`;

const Indicators = styled.div`
  display: flex;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2; 
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ffffff;
  margin: 0 5px;
  cursor: pointer;
  &.active {
    background-color: black;
  }
`;