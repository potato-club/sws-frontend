//라운지 첫번째 페이지
import React, { useState, useEffect } from "react";
import Slick from "../libs/Slick";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

import {
  PRIMARY_COLOR_BLUE,
  PRIMARY_COLOR_BLU,
  PRIMARY_COLOR_W,
} from "../Constants/constants";
import LoungeMain from "./LoungeMain";

interface MainProps {
  isSidebarOpen: boolean;
}
interface MainDB {
  id: number;
  images: string;
}

interface Community {
  id: string;
  title: string;
  name: string;
  like: number;
  contents: string;
  hash: string;
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
  const [pagecontent, setPageContent] = useState<Community[]>([]);

  useEffect(() => {
    async function fetchPageContent() {
      const result = await axios.get("http://localhost:3001/Lboard");
      setPageContent(result.data);
    }
    fetchPageContent();
  }, []);
  const [page, setPage] = useState<Community[]>([]);

  useEffect(() => {
    async function fetchPageContent() {
      const result = await axios.get("http://localhost:3001/LFriends");
      setPage(result.data);
    }
    fetchPageContent();
  }, []);
  const [content, setcontent] = useState<Community[]>([]);
  useEffect(() => {
    async function fetchPageContent() {
      const result = await axios.get("http://localhost:3001/LPopular");
      setcontent(result.data);
    }
    fetchPageContent();
  }, []);
  return (
    <MainContain paddingLeft={pL}>
      <Lentire>
        <div>
          <Llefttoptitle>
            <Mtop>Shall We Study?</Mtop>
            <LoungeLink to="/LFriends">더보기</LoungeLink>
          </Llefttoptitle>
          <LMtop>
            <LoungeMain linkPath="LFriends" showCount={page.slice(0, 8)} />
          </LMtop>
        </div>

        <div>
          <Llefttoptitle>
            <Mtop>NEW</Mtop> <LoungeLink to="/Lboard">더보기</LoungeLink>
          </Llefttoptitle>
          <LMbottom>
            <LoungeMain linkPath="Lboard" showCount={pagecontent.slice(0, 5)} />
          </LMbottom>
        </div>
      </Lentire>
      <Lentire>
        <LoungeSlick>
          <Slick settings={settings} slides={main} />
        </LoungeSlick>
        <div>
          <Llefttoptitle>
            <Mtop>HOT</Mtop> <LoungeLink to="/LPopular">더보기</LoungeLink>
          </Llefttoptitle>
          <LMtop>
            <LoungeMain linkPath="LPopular" showCount={content.slice(0, 8)} />
          </LMtop>
        </div>
      </Lentire>
    </MainContain>
  );
};
export default Lounge;
const Mtop = styled.h1`
  color: ${PRIMARY_COLOR_W};
  font-size: 48px;
  font-family: "Noto Sans KR", sans-serif;

  font-weight: 600;
`;
const LMtop = styled.div`
  border: 15px solid ${PRIMARY_COLOR_BLU};

  width: 620px;
  height: 750px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    background-color: ${PRIMARY_COLOR_W};
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

const Llefttoptitle = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LMbottom = styled.div`
  border: 15px solid ${PRIMARY_COLOR_BLU};
  width: 620px;
  height: 450px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContain = styled.div<{ paddingLeft: number }>`
  padding-top: 70px;
  margin-left: 0;
  height: 1800px;
  padding-left: ${(props) => props.paddingLeft}px;
  display: flex;

  justify-content: center;
`;
