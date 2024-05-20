//라운지 두번째 페이지
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Pagenation from "../Components/Pagenation";
import LoungeMain from "./LoungeMain";
import { ImArrowLeft } from "react-icons/im";
import {
  PRIMARY_COLOR_WHITE,
  PRIMARY_COLOR_SKY,
  PRIMARY_COLOR_BLUE,
  PRIMARY_COLOR_B,
} from "../Constants/constants";
import axios from "axios";

interface Community {
  id: string;
  title: string;
  name: string;
  like: number;
  contents: string;
  hash: string;
}

interface Props {
  pageTitle: string;
  apiEndpoint: string;
}

const LoungePage: React.FC<Props> = ({ pageTitle, apiEndpoint }) => {
  const [pagecontent, setPageContent] = useState<Community[]>([]);
  const [currentpage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchPageContent() {
      const result = await axios.get(`http://localhost:3001/${apiEndpoint}`);
      setPageContent(result.data);
    }
    fetchPageContent();
  }, [apiEndpoint]);

  return (
    <MainContain>
      <LoungeTop>
        <LinkTop to="/Lounge">
          <ImArrowLeft />
        </LinkTop>
        {pageTitle}
      </LoungeTop>

      <Loungemargin>
        <LoungeMain
          linkPath={apiEndpoint}
          showCount={pagecontent.slice((currentpage - 1) * 8, currentpage * 8)}
        />
        <Loungebottom>
          <Pagenation
            eight={8}
            currentpage={currentpage}
            total={pagecontent.length}
            setPage={setCurrentPage}
          />
          <LoungeLink to="/write">글쓰기</LoungeLink>
        </Loungebottom>
      </Loungemargin>
    </MainContain>
  );
};

export default LoungePage;

const Loungebottom = styled.div`
  margin-top: 100px;
  height: 100px;
  width: 100%;
  display: Flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${PRIMARY_COLOR_BLUE};
`;

const LinkTop = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
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
    background-color: ${PRIMARY_COLOR_B};
    color: white;
    transition: 1s;
  }
`;

const LoungeTop = styled.h1`
  width: 300px;
  display: flex;
  justify-content: space-around;
  margin-right: 650px;
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
