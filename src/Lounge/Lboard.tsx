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
  PRIMARY_COLOR_BLU,
} from "../Constants/constants";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { jwtTokenState } from "../recoil/atom";
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
  category: string;
}

const LoungePage: React.FC<Props> = ({ pageTitle, category }) => {
  const [pageContent, setPageContent] = useState<Community[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const accessToken = useRecoilValue(jwtTokenState);
  useEffect(() => {
    async function fetchPageContent() {
      try {
        const result = await axios.get(
          `https://sws-back.shop/post/${category}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setPageContent(result.data);
        console.log("데이터 가져오기 성공:", result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchPageContent();
  }, [category]);

  return (
    <MainContain>
      <LoungeTop>
        <LinkTop to="/Lounge">
          <ImArrowLeft />
        </LinkTop>
        {pageTitle}
      </LoungeTop>

      <LoungeMargin>
        <LoungeMain
          linkPath={category}
          showCount={pageContent.slice((currentPage - 1) * 8, currentPage * 8)}
        />
        <LoungeBottom>
          <Pagenation
            eight={8}
            currentpage={currentPage}
            total={pageContent.length}
            setPage={setCurrentPage}
          />
          <LoungeLink to={`/${category}/write`}>글쓰기</LoungeLink>
        </LoungeBottom>
      </LoungeMargin>
    </MainContain>
  );
};

export default LoungePage;

// Styled components

const LoungeBottom = styled.div`
  margin-top: 100px;
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${PRIMARY_COLOR_BLU};
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
    background-color: ${PRIMARY_COLOR_BLU};
    color: white;
    transition: 1s;
  }
`;

const LoungeTop = styled.h1`
  width: 300px;
  display: flex;
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  justify-content: space-around;
  margin-right: 650px;
`;

const LoungeMargin = styled.div`
  display: flex;
  width: 900px;
  border-radius: 25px 25px 0px 0px;
  align-items: center;
  flex-direction: column;
  border: 20px solid ${PRIMARY_COLOR_BLU};
  border-width: 20px 3px;
`;

const MainContain = styled.div`
  padding-top: 70px;
  margin-left: 0;
  height: 855px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
