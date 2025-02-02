import React, { useEffect, useState } from "react";

import styled from "styled-components";
import jsonData from "../json-server/db.json";
import MainContents from "./MainContents";
import Pagenation from "../Components/Pagenation";
import Slick from "../libs/Slick";

interface MainProps {
  isSidebarOpen: boolean;
}

interface MainDB {
  id: string | number;
  images: string;
}

interface Ct {
  title: string;
  img: string;
  id: string;
}

const Main: React.FC<MainProps> = ({ isSidebarOpen }) => {
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [main, setMain] = useState<MainDB[]>([]);
  const [pagecontent, setPageContent] = useState<Ct[]>([]);
  const [currentpage, setCurrentPage] = useState(1);
  useEffect(() => {
    setMain(jsonData.Main);
  }, []);

  useEffect(() => {
    const newPaddingLeft = isSidebarOpen ? 200 : 0;
    setPaddingLeft(newPaddingLeft);
  }, [isSidebarOpen]);

  useEffect(() => {
    setPageContent(jsonData.MainCt);
  }, []);

  const settings = {
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <MainContainer paddingLeft={paddingLeft}>
      <Top>
        <Slick settings={settings} slides={main} />
      </Top>
      <Bottom>
        <MainContents
          Pagenation={pagecontent.slice((currentpage - 1) * 8, currentpage * 8)} //0,8
        />
        <Pagenation
          eight={8}
          currentpage={currentpage}
          total={pagecontent.length}
          setPage={setCurrentPage}
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
  height: 37%;
`;

const Bottom = styled.div`
  height: 65%;

  @media screen and (max-width: 1200px) {
    height: 110%;
  }
  @media screen and (max-width: 768px) {
    height: 170%;
  }
  @media screen and (max-width: 510px) {
    height: 320%;
  }
`;
// useEffect(() => {
//   // 백엔드에서 닉네임 데이터를 가져옵니다
//   axios
//     .get("https://shallwestudy.store/s3/update_files", {
//       headers: {
//         "Content-Type": "application/json",

//       },
//     })
//     .then((response) => {
//       setMain(String(response.data));

//       console.log("데이터 가져오기 성공:", response.data);
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// }, );
