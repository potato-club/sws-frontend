import styled from "styled-components";
import { useState } from "react";
import SlideShow from "./SilderForMainBox";
import { PRIMARY_COLOR_BLUE } from "../Constants/constants";
import Board from "../Board";
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

  return (
    <MainBoxContainer>
      <ContainerArea>
        <CafeName>SWS 카페</CafeName>
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

        <SlideShow />

        <CafeInfo>
          저희 카페는 어쩌고 저쩌고....dsadsadasdasdas
          <br />
          저희 카페는 어쩌고 저쩌고....
          <br />
          저희 카페는 어쩌고 저쩌고....
          <br />
          저희 카페는 어쩌고 저쩌고....
          <br />
          저희 카페는 어쩌고 저쩌고....
          <br />
          저희 카페는 어쩌고 저쩌고....
          <br />
          저희 카페는 어쩌고 저쩌고....
          <br />
          저희 카페는 어쩌고 저쩌고....
          <br />
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

const CafeName = styled.div`
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
  justify-content: center;
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
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
