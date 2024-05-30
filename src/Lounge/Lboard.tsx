// //라운지 두번째 페이지
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import Pagenation from "../Components/Pagenation";
// import LoungeMain from "./LoungeMain";
// import { ImArrowLeft } from "react-icons/im";
// import {
//   PRIMARY_COLOR_WHITE,
//   PRIMARY_COLOR_SKY,
//   PRIMARY_COLOR_BLUE,
//   PRIMARY_COLOR_BLU,
// } from "../Constants/constants";
// import axios from "axios";

// interface Community {
//   id: string;
//   title: string;
//   name: string;
//   like: number;
//   contents: string;
//   hash: string;
// }

// interface Props {
//   pageTitle: string;
//   apiEndpoint: string;
// }

// const LoungePage: React.FC<Props> = ({ pageTitle, apiEndpoint }) => {
//   const [pagecontent, setPageContent] = useState<Community[]>([]);
//   const [currentpage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     async function fetchPageContent() {
//       const result = await axios.get(`http://localhost:3001/${apiEndpoint}`);
//       setPageContent(result.data);
//     }
//     fetchPageContent();
//   }, [apiEndpoint]);

//   return (
//     <MainContain>
//       <LoungeTop>
//         <LinkTop to="/Lounge">
//           <ImArrowLeft />
//         </LinkTop>
//         {pageTitle}
//       </LoungeTop>

//       <Loungemargin>
//         <LoungeMain
//           linkPath={apiEndpoint}
//           showCount={pagecontent.slice((currentpage - 1) * 8, currentpage * 8)}
//         />
//         <Loungebottom>
//           <Pagenation
//             eight={8}
//             currentpage={currentpage}
//             total={pagecontent.length}
//             setPage={setCurrentPage}
//           />
//           <LoungeLink to={`/${apiEndpoint}/write`}>글쓰기</LoungeLink>
//         </Loungebottom>
//       </Loungemargin>
//     </MainContain>
//   );
// };

// export default LoungePage;

// const Loungebottom = styled.div`
//   margin-top: 100px;
//   height: 100px;
//   width: 100%;
//   display: Flex;
//   align-items: center;
//   justify-content: space-around;
//   background-color: ${PRIMARY_COLOR_BLU};
// `;

// const LinkTop = styled(Link)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: black;
// `;

// const LoungeLink = styled(Link)`
//   background-color: ${PRIMARY_COLOR_SKY};
//   color: ${PRIMARY_COLOR_WHITE};
//   width: 100px;
//   height: 50px;
//   border-radius: 15px;
//   text-decoration: none;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   &:hover {
//     background-color: ${PRIMARY_COLOR_BLU};
//     color: white;
//     transition: 1s;
//   }
// `;

// const LoungeTop = styled.h1`
//   width: 300px;
//   display: flex;
//   font-family: "Noto Sans KR", sans-serif;
//   font-optical-sizing: auto;
//   font-weight: 600;
//   justify-content: space-around;
//   margin-right: 650px;
// `;

// const Loungemargin = styled.div`
//   display: flex;
//   width: 900px;
//   border-radius: 25px 25px 0px 0px;

//   align-items: center;
//   flex-direction: column;
//   border: 20px solid ${PRIMARY_COLOR_BLU};
//   border-width: 20px 3px;
// `;

// const MainContain = styled.div`
//   padding-top: 70px;
//   margin-left: 0;
//   height: 855px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;
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
  PRIMARY_COLOR_BLU,
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
  category: string;
}

const LoungePage: React.FC<Props> = ({ pageTitle, category }) => {
  const [pagecontent, setPageContent] = useState<Community[]>([]);
  const [currentpage, setCurrentPage] = useState(1);
  const accessToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    async function fetchPageContent() {
      try {
        const result = await axios.get(
          `https://shallwestudy.store/post/${category}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`, // Bearer 접두사 추가
            },
          }
        );
        setPageContent(result.data);
        console.log("데이터 가져오기 성공:", result.data);
      } catch (error) {
        console.error("Error fetching data:", error);

        // 만약 403 에러가 발생하면 로그아웃하고 로그인 페이지로 이동
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 403) {
            localStorage.removeItem("jwtToken");
            alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
            window.location.href = "/login"; // 로그인 페이지로 이동
          }
        }
      }
    }

    fetchPageContent();
  }, [category, accessToken]);

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
          linkPath={category}
          showCount={pagecontent.slice((currentpage - 1) * 8, currentpage * 8)}
        />
        <Loungebottom>
          <Pagenation
            eight={8}
            currentpage={currentpage}
            total={pagecontent.length}
            setPage={setCurrentPage}
          />
          <LoungeLink to={`/${category}/write`}>글쓰기</LoungeLink>
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

const Loungemargin = styled.div`
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
