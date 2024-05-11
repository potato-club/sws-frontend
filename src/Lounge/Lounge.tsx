import React, { useState, useEffect } from "react";
import Slick from "../libs/Slick";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { PRIMARY_COLOR_BLUE, PRIMARY_COLOR_SKY } from "../Constants/constants";
import LoungeMain from "./LoungeMain";
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
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [pagecontent, setPageContent] = useState<Ct[]>([]);

  useEffect(() => {
    async function fetchPageContent() {
      const result = await axios.get("http://localhost:3001/Community");
      setPageContent(result.data);
    }
    fetchPageContent();
  }, []);

  return (
    <MainContain paddingLeft={pL}>
      <Lentire>
        <Lcomponent>
          <Llefttoptitle>
            <h1>최신 게시판</h1> <LoungeLink to="/Lboard">더보기</LoungeLink>
          </Llefttoptitle>
          <LMtop>
            <LoungeMain showCount={pagecontent.slice(0, 8)} />
          </LMtop>
        </Lcomponent>

        <Lcomponent>
          <Llefttoptitle>
            <h1>친구 구해요</h1> <LoungeLink to="/Lboard">더보기</LoungeLink>
          </Llefttoptitle>
          <LMbottom>
            <LoungeMain showCount={pagecontent.slice(0, 4)} />
          </LMbottom>
        </Lcomponent>
      </Lentire>
      <Lentire>
        <LoungeSlick>
          <Slick settings={settings} slides={main} />
        </LoungeSlick>
        <Lcomponent>
          <Llefttoptitle>
            <h1>인기 게시판</h1> <LoungeLink to="/Lboard">더보기</LoungeLink>
          </Llefttoptitle>
          <LMtop>
            <LoungeMain showCount={pagecontent.slice(0, 8)} />
          </LMtop>
        </Lcomponent>
      </Lentire>
    </MainContain>
  );
};
export default Lounge;

const LMtop = styled.div`
  background-color: ${PRIMARY_COLOR_BLUE};
  width: 640px;
  height: 750px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px 30px 20px;
`;
const LoungeLink = styled(Link)`
  background-color: ${PRIMARY_COLOR_BLUE};
  color: white;
  width: 60px;
  height: 30px;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${PRIMARY_COLOR_SKY};
    color: white;
    transition: 1s;
  }
`;

const LoungeSlick = styled.div`
  width: 70%;
  height: 200px;
  margin-top: 200px;
  margin-bottom: 100px;
`;

const Lentire = styled.div`
  width: 950px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Lcomponent = styled.div``;

const Llefttoptitle = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LMbottom = styled.div`
  background-color: ${PRIMARY_COLOR_BLUE};
  width: 640px;
  height: 350px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px 50px 20px;
`;

const MainContain = styled.div<{ paddingLeft: number }>`
  padding-top: 70px;
  margin-left: 0;
  height: 1800px;
  padding-left: ${(props) => props.paddingLeft}px;
  display: flex;

  justify-content: center;
`;
