import { PRIMARY_COLOR_BLUE } from "../src/constants";
import MainContents from "./MainContents";
import MainContents2 from "./MainContents2";
import React, { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";

const MainContainer = styled.div<{ paddingLeft: number }>`
  padding-top: 70px;
  margin-left: 0;
  height: 855px;
  padding-left: ${(props) => props.paddingLeft}px;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36%;
`;

const TopButton = styled.button`
  background-color: ${PRIMARY_COLOR_BLUE};
  color: white;
  border-radius: 15px;
  border: 0px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Slide = styled.div`
  height: 400px;
  width: 1200px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SlideImg = styled.img`
  width: 80%;
  height: 60%;
`;

const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  width: 150px;
  justify-content: space-around;
`;

const ButtonsButton = styled.div`
  width: 10px;
  height: 10px;
  transform: translateX(-50%);
  background-color: #b9b9b9;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
  &.active {
    background-color: black;
  }
`;

const Bottom = styled.div`
  height: 65%;
`;

const BottomCheck = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomCheckbox = styled.div`
  width: 600px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomCheckLink = styled(Link)`
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background-color: white;
  border: 1px solid ${PRIMARY_COLOR_BLUE};
  color: ${PRIMARY_COLOR_BLUE};
  height: 35px;

  &:hover {
    background-color: ${PRIMARY_COLOR_BLUE};
    color: white;
  }
`;

const BottomCheckButton = styled.button`
  background-color: ${PRIMARY_COLOR_BLUE};
  border: 1px solid ${PRIMARY_COLOR_BLUE};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 37px;
  color: white;
`;

interface MainProps {
  isSidebarOpen: boolean;
}

interface MainDB {
  id: number;
  images: string;
}

const Main: React.FC<MainProps> = ({ isSidebarOpen }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [main, setMain] = useState<MainDB[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/Main")
      .then((response) => {
        setMain(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  useEffect(() => {
    const newPaddingLeft = isSidebarOpen ? 200 : 0;
    setPaddingLeft(newPaddingLeft);
  }, [isSidebarOpen]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === main.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? main.length - 1 : prevSlide - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <MainContainer paddingLeft={paddingLeft}>
      <Top>
        <TopButton onClick={prevSlide}>
          <BiChevronLeft size="40" />
        </TopButton>
        <Slide>
          <SlideImg
            src={main.length > 0 ? main[currentSlide].images : ""}
            alt="Slide"
          />

          <Buttons>
            {main.map((_, id) => (
              <ButtonsButton
                className={`ButtonsButton ${
                  id === currentSlide ? "active" : ""
                }`}
                key={id}
                onClick={() => goToSlide(id)}
              ></ButtonsButton>
            ))}
          </Buttons>
        </Slide>
        <TopButton onClick={nextSlide}>
          <BiChevronRight size="40" />
        </TopButton>
      </Top>

      <Bottom>
        <Routes>
          <Route path="/*" element={<MainContents />} />
          <Route path="/2" element={<MainContents2 />} />
          <Route path="/3" element={<MainContents />} />
          <Route path="/4" element={<MainContents2 />} />
          <Route path="/5" element={<MainContents />} />
        </Routes>

        <BottomCheck>
          <BottomCheckbox>
            <BottomCheckButton>
              <BiChevronLeft size="40" />
            </BottomCheckButton>
            <BottomCheckLink to="/">1</BottomCheckLink>
            <BottomCheckLink to="/2">2</BottomCheckLink>
            <BottomCheckLink to="/3">3</BottomCheckLink>
            <BottomCheckLink to="/4">4</BottomCheckLink>
            <BottomCheckLink to="/5">5</BottomCheckLink>
            <BottomCheckButton>
              <BiChevronRight size="40" />
            </BottomCheckButton>
          </BottomCheckbox>
        </BottomCheck>
      </Bottom>
    </MainContainer>
  );
};

export default Main;
