import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

// Slide 데이터 타입
interface SlideData {
  images: string;
}

// SlickCarousel 컴포넌트의 Props 타입
interface SlickCarouselProps {
  settings: Settings;
  slides: SlideData[];
}

const SlickCarousel: React.FC<SlickCarouselProps> = ({ settings, slides }) => {
  return (
    <StyledSlider {...settings}>
      {slides.map((slide, index) => (
        <Slide key={index}>
          <SlideImg src={slide.images} alt={`Slide ${index}`} />
        </Slide>
      ))}
    </StyledSlider>
  );
};

const StyledSlider = styled(Slider)`
  width: 100%;
  .slick-prev {
    z-index: 1;
    left: 30px;
    top: 135px;
  }

  .slick-next {
    z-index: 1;
    right: 40px;
    top: 135px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 30px;
    opacity: 0.3;
    color: black;
  }
  .slick-prev:before:hover,
  .slick-next:before:hover {
    opacity: 1;
  }
`;

const Slide = styled.div`
  height: 290px;
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
`;

const SlideImg = styled.img`
  height: 100%;
  width: 100%;
`;

export default SlickCarousel;
