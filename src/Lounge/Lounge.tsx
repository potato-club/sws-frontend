import React, { useState, useEffect } from "react";
import Slick from "../libs/Slick";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PRIMARY_COLOR_BLUE } from "../Constants/constants";
interface MainProps {
  isSidebarOpen: boolean;
}
interface MainDB {
  id: number;
  images: string;
}
const Lounge: React.FC<MainProps> = ({ isSidebarOpen }) => {
  const [pL, setPL] = useState(0);
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
    const Left = isSidebarOpen ? 200 : 0;
    setPL(Left);
  }, [isSidebarOpen]);
  const settings = {
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <MainContain paddingLeft={pL}>
      <Loungeleft>
        <Llefttop>
          <Llefttoptitle>
            <h1>최신 게시판</h1> <Link to="/Lboard">더보기</Link>
          </Llefttoptitle>
          <LlefttopM>dasdasd</LlefttopM>
        </Llefttop>

        <Lleftbottom>
          <Llefttoptitle>
            <h1>친구 구해요</h1> <Link to="/Lboard">더보기</Link>
          </Llefttoptitle>
          <LleftbottomM>dasdasd</LleftbottomM>
        </Lleftbottom>
      </Loungeleft>
      <Loungeright>
        <LoungeSlick>
          <Slick settings={settings} slides={main} />
        </LoungeSlick>
        <Llefttop>
          <Llefttoptitle>
            <h1>최신 게시판</h1> <Link to="/Lboard">더보기</Link>
          </Llefttoptitle>
          <LlefttopM>dasdasd</LlefttopM>
        </Llefttop>
      </Loungeright>
    </MainContain>
  );
};
export default Lounge;
const Loungeright = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LoungeSlick = styled.div`
  width: 70%;
  margin-top: 200px;
`;

const Loungeleft = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Llefttop = styled.div`
  height: 1050px;
`;

const Llefttoptitle = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const LlefttopM = styled.div`
  background-color: ${PRIMARY_COLOR_BLUE};
  width: 700px;
  height: 850px;
  border-radius: 25px;
`;
const LleftbottomM = styled.div`
  background-color: ${PRIMARY_COLOR_BLUE};
  width: 700px;
  height: 450px;
  border-radius: 25px;
`;
const Lleftbottom = styled.div`
  height: 850px;
`;

const MainContain = styled.div<{ paddingLeft: number }>`
  padding-top: 70px;
  margin-left: 0;
  height: 1800px;
  padding-left: ${(props) => props.paddingLeft}px;
  display: flex;

  justify-content: center;
`;
