// import MainContents from "./MainContents";
// import React, { useEffect, useState } from "react";
// import Pagenation from "../Components/Pagenation";
// import Slider from "react-slick";
// import styled from "styled-components";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import axios from "axios";

// interface MainProps {
//   isSidebarOpen: boolean;
// }

// interface MainDB {
//   id: number;
//   images: string;
// }

// interface Ct {
//   title: string;
//   img: string;
//   id: string;
// }
// const Main: React.FC<MainProps> = ({ isSidebarOpen }) => {
//   const [paddingLeft, setPaddingLeft] = useState(0);
//   const [main, setMain] = useState<MainDB[]>([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/Main")
//       .then((response) => {
//         setMain(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   useEffect(() => {
//     const newPaddingLeft = isSidebarOpen ? 200 : 0;
//     setPaddingLeft(newPaddingLeft);
//   }, [isSidebarOpen]);

//   const [pagecontent, setpageContent] = useState([]);
//   async function handlePostInfo() {
//     const result = await axios({
//       url: "http://localhost:3001/MainCt",
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     setpageContent(result.data);
//   }
//   useEffect(() => {
//     handlePostInfo();
//   }, []);
//   const [currentpage, setcurrentPage] = useState(1); //페이지
//   const eight = 8; // posts가 보일 최대한의 갯수
//   const startindex = (currentpage - 1) * eight; //2-1*8=8 result로 가면

//   const Data = (MC: Ct[] | undefined) => {
//     if (MC) {
//       let result = MC.slice(startindex, startindex + eight); //00 페이지에서 보여줄 포스트들의 시작 인덱스  0부터 7까지의 인덱스의 컴포넌트 MC.slice(8, 16)8번부터 16번 인덱스 까지
//       return result;
//     }
//   };
//   //pagecontent 종합 즉 38 개

//   const settings = {
//     infinite: true,
//     speed: 1000, // 넘어가는 속도 (ms)
//     autoplay: true, // 자동 넘김 활성화
//     autoplaySpeed: 5000, // 자동 넘김 속도 (ms)
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     pauseOnHover: true,
//   };
//   return (
//     <MainContainer paddingLeft={paddingLeft}>
//       <Top>
//         <StyledSlider {...settings}>
//           {main.map((m) => (
//             <Slide>
//               <SlideImg src={m.images} alt="Slide" />
//             </Slide>
//           ))}
//         </StyledSlider>
//       </Top>

//       <Bottom>
//         <MainContents Pagenation={Data(pagecontent)} />
//         <Pagenation
//           eight={eight}
//           currentpage={currentpage}
//           total={pagecontent.length}
//           setPage={setcurrentPage}
//         />
//       </Bottom>
//     </MainContainer>
//   );
// };

// export default Main;

// const StyledSlider = styled(Slider)`
//   width: 100%;
//   .slick-prev {
//     z-index: 1;
//     left: 30px;
//     top: 135px;
//   }

//   .slick-next {
//     z-index: 1;
//     right: 40px;
//     top: 135px;
//   }

//   .slick-prev:before,
//   .slick-next:before {
//     font-size: 30px;
//     opacity: 0.3;
//     color: black;
//   }
//   .slick-prev:before:hover,
//   .slick-next:before:hover {
//     opacity: 1;
//   }
// `;

// const Slide = styled.div`
//   height: 290px;
//   width: 100%;
//   flex-direction: column;
//   display: flex;
//   justify-content: center;
// `;

// const SlideImg = styled.img`
//   height: 100%;
//   width: 100%;
// `;

// const MainContainer = styled.div<{ paddingLeft: number }>`
//   padding-top: 70px;
//   margin-left: 0;
//   height: 855px;
//   padding-left: ${(props) => props.paddingLeft}px;
// `;

// const Top = styled.div`
//   width: 100%;
//   display: flex;

//   height: 37%;
// `;

// const Bottom = styled.div`
//   height: 65%;
// `;

import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import MainContents from "./MainContents";
import Pagenation from "../Components/Pagenation";
import Slick from "../libs/Slick";

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
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [main, setMain] = useState<MainDB[]>([]);
  const [pagecontent, setPageContent] = useState<Ct[]>([]);
  const [currentpage, setCurrentPage] = useState(1);

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
    const newPaddingLeft = isSidebarOpen ? 200 : 0;
    setPaddingLeft(newPaddingLeft);
  }, [isSidebarOpen]);

  useEffect(() => {
    async function fetchPageContent() {
      const result = await axios.get("http://localhost:3001/MainCt");
      setPageContent(result.data);
    }
    fetchPageContent();
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
          Pagenation={pagecontent.slice((currentpage - 1) * 8, currentpage * 8)}
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
  flex-wrap: wrap;
`;
