import React, { useState } from "react";
import styled from "styled-components";

interface SliderProps {
  slides: JSX.Element[];
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
}

const Slider: React.FC<SliderProps> = ({ slides, currentSlide, setCurrentSlide }) => {
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <SliderContainer>
      <Leftbtn onClick={prevSlide}>&lt;</Leftbtn>
      <Slide>{slides[currentSlide]}</Slide>
      <Rightbtn onClick={nextSlide}>&gt;</Rightbtn>
      <Indicators>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`Indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </Indicators>
    </SliderContainer>
  );
};

const SlideShow: React.FC = () => {
  const slides: JSX.Element[] =
    [
        <img src="https://i.namu.wiki/i/IVOyx7FiOXQMGwY4TqD7qHmV0gPcIRUcDnRCEEzC6Xede7OCkv2qQ3iYd7wmtkgRbDcq4ewRVkhE7qrHdEgvGRmsOC5JwWKQ6ZCZRRgOIi4BT3lX411MzCh6iV2YU-sB6D-_KW3VmxPu39uFVOj3dA.webp" alt="이미지1"/>,
        <img src="https://dispatch.cdnser.be/wp-content/uploads/2017/11/20171127233235_16.jpg" alt="이미지2"/>,   
        <img src="https://blog.kakaocdn.net/dn/9nrrA/btrEcRxcaJs/7EhjOTc02PEIkI4E68BK2k/img.jpg" alt="이미지3"/>
    
    ];
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Slider slides={slides}
    currentSlide={currentSlide}
    setCurrentSlide={setCurrentSlide} />
  );
};

export default SlideShow;

const SliderContainer = styled.div`
 width: 100%;
  height: 480px;
  overflow: hidden;
  position: relative;
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
`;


const Slide = styled.div`
    z-index: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 90%; 
      height: 400px; 

    }
`;

const Indicators = styled.div`
  display: flex;
  position: absolute;
  bottom: 17px; 
  left: 50%;
  transform: translateX(-50%); 
  justify-content: center;
  align-items: center;
  z-index: 1;

  .Indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ffffff;
  margin: 0 5px;
  cursor: pointer;
}
.Indicator.active {
  background-color: black;
}
`;