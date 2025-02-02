import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { PRIMARY_COLOR_BLUE } from "../Constants/constants";
import jsonData from "../json-server/db.json";
// Slide 타입 정의
interface Slide {
  id: string;
  images: string;
}

const SlideShow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState<Slide[]>([]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % imgSrc.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? imgSrc.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    setImgSrc(jsonData.Main);
  }, []);

  return (
    <SliderContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && currentSlide !== 0 && (
        <Leftbtn onClick={prevSlide}>&lt;</Leftbtn>
      )}
      {isHovered && currentSlide !== imgSrc.length - 1 && (
        <Rightbtn onClick={nextSlide}>&gt;</Rightbtn>
      )}
      <SlideContainer
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {imgSrc.map((slide, index) => (
          <Slide key={index}>
            <img src={slide.images} alt={`Slide ${slide.id}`} />
          </Slide>
        ))}
      </SlideContainer>

      <Indicators>
        {imgSrc.map((_, index) => (
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
  transition: transform 0.8s ease;
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
  border: none;
  cursor: pointer;
  z-index: 2;
  background-color: ${PRIMARY_COLOR_BLUE};
  width: 40px;
  height: 40px;
  color: white;
  border-radius: 15px;
  font-size: 20px;
`;

const Rightbtn = styled.button`
  right: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3.5em;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 2;
  background-color: ${PRIMARY_COLOR_BLUE};
  width: 40px;
  height: 40px;
  color: white;
  border-radius: 15px;
  font-size: 20px;
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
