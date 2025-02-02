import styled from "styled-components";

import React, { useEffect, useState } from "react";
import jsonData from "../json-server/db.json";
import { PRIMARY_COLOR_BLUE } from "../Constants/constants";
import Board from "../Components/CommentBox";
import Slick from "../libs/Slick";
interface MainDB {
  id: string | number;
  images: string;
}
const MainBox = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleClick = (index: number) => {
    alert("평가를 제출했습니다");
    setRating(index);
  };
  const [mainbox, setMainbox] = useState<MainDB[]>([]);

  useEffect(() => {
    setMainbox(jsonData.MainBox);
  }, []);

  const settings = {
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    dots: true,
  };

  return (
    <MainBoxContainer>
      <ContainerArea>
        <LName>ㅇㅇ 도서관</LName>
        <StarRatingContainer>
          {[1, 2, 3, 4, 5].map((index) => {
            return (
              <StyledSpan
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(index)}
                isHoveredOrRated={(hoverRating || rating || 0) >= index}
              >
                &#9733;
              </StyledSpan>
            );
          })}
        </StarRatingContainer>

        <Slick settings={settings} slides={mainbox} />

        <CafeInfo>
          위치:
          <br />
          오픈 시간:
          <br />
          등등 도서관에 대한 정보.
        </CafeInfo>
        <Board />
      </ContainerArea>
    </MainBoxContainer>
  );
};

export default MainBox;
const MainBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContainerArea = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${PRIMARY_COLOR_BLUE};
  width: 800px;
  height: 700px;
  margin-top: 70px;
  height: auto;
  padding: 0 0 100px 0;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const LName = styled.div`
  padding-top: 30px;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
`;

const CafeInfo = styled.div`
  width: 70%;
  align-items: center;
  background-color: white;
  font-style: italic;
  justify-content: left;
  margin-top: 30px;
  padding: 5px;
  border-radius: 5px;
  text-align: left;
`;

const StarRatingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 100px;
`;

const StyledSpan = styled.span<{ isHoveredOrRated: boolean }>`
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => (props.isHoveredOrRated ? "gold" : "white")};
`;
