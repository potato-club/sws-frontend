import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Pagenation from "../Components/Pagenation";
import LoungeMain from "./LoungeMain";
import {
  PRIMARY_COLOR_WHITE,
  PRIMARY_COLOR_SKY,
  PRIMARY_COLOR_BLUE,
} from "../Constants/constants";
import axios from "axios";
interface Ct {
  title: string;
  img: string;
  id: string;
}
const Lboard = () => {
  const [pagecontent, setPageContent] = useState<Ct[]>([]);
  const [currentpage, setCurrentPage] = useState(1);
  useEffect(() => {
    async function fetchPageContent() {
      const result = await axios.get("http://localhost:3001/MainCt");
      setPageContent(result.data);
    }
    fetchPageContent();
  }, []);
  return (
    <MainContain>
      <LoungeTop>최신 게시판</LoungeTop>

      <Loungemargin>
        <LoungeMain />
        <Loungebottom>
          <Pagenation
            eight={8}
            currentpage={currentpage}
            total={pagecontent.length}
            setPage={setCurrentPage}
          />
          <LoungeLink to="/LoungeCreate">글쓰기</LoungeLink>
        </Loungebottom>
      </Loungemargin>
    </MainContain>
  );
};

export default Lboard;
const Loungebottom = styled.div`
  height: 100px;
  width: 100%;
  display: Flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${PRIMARY_COLOR_BLUE};
`;

const LoungeLink = styled(Link)`
  background-color: ${PRIMARY_COLOR_SKY};
  color: ${PRIMARY_COLOR_WHITE};
  width: 100px;
  height: 50px;
  border-radius: 15px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${PRIMARY_COLOR_BLUE};
    color: white;
    transition: 1s;
  }
`;
const LoungeTop = styled.h1`
  width: 900px;
`;
const Loungemargin = styled.div`
  display: flex;
  width: 900px;
  border-radius: 25px 25px 0px 0px;
  padding: 40px 20px 0px 20px;

  align-items: center;

  flex-direction: column;
  background-color: ${PRIMARY_COLOR_BLUE};
`;

const MainContain = styled.div`
  padding-top: 70px;
  margin-left: 0;
  height: 855px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
