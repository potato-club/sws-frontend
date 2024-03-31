import { PRIMARY_COLOR_BLUE } from "../Constants/constants";
import MainContents from "./MainContents";

import React, { useEffect, useState } from "react";
import Pagenation from "../Components/Pagenation";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";

interface MainProps {
  isSidebarOpen: boolean;
}

interface MainDB {
  id: number;
  images: string;
}

interface Ct {
  title: string;
  img: string;
  id: string;
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

  const [pagecontent, setpageContent] = useState([]);

  async function handlePostInfo() {
    const result = await axios({
      url: "http://localhost:3001/MainCt",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setpageContent(result.data);
  }

  useEffect(() => {
    handlePostInfo();
  }, []);

  const [currentpage, setcurrentPage] = useState(1); //페이지
  const eight = 8; // posts가 보일 최대한의 갯수
  const startindex = (currentpage - 1) * eight; //2-1*8=8 result로 가면

  const Data = (MC: Ct[] | undefined) => {
    if (MC) {
      let result = MC.slice(startindex, startindex + eight); //00 페이지에서 보여줄 포스트들의 시작 인덱스  0부터 7까지의 인덱스의 컴포넌트 MC.slice(8, 16)8번부터 16번 인덱스 까지
      return result;
    }
  };
  //pagecontent 종합 즉 38 개
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
        <MainContents Pagenation={Data(pagecontent)} />
        <Pagenation
          eight={eight}
          currentpage={currentpage}
          total={pagecontent.length}
          setPage={setcurrentPage}
        />
      </Bottom>
    </MainContainer>
  );
};

export default Main;

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
  height: 37%;
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
