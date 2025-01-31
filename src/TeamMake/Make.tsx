import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PRIMARY_COLOR_BLUE } from "../Constants/constants";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
const MainContainer = styled.div<{ paddingLeft: number }>`
  padding-top: 70px;
  margin-left: 0;

  height: 875px;
  display: flex;
  flex-direction: column;
  padding-left: ${(props) => props.paddingLeft}px;
`;
const MakeTop = styled.div`
  display: flex;

  width: 100%;
  height: 90%;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const MakeLeft = styled.div`
  width: 50%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 960px) {
    width: 100%;
    margin-bottom: 200px;
  }
`;
const MakeLeftNumber = styled.div`
  box-shadow: 5px 5px 5px 5px gray;
  background-color: ${PRIMARY_COLOR_BLUE};
  color: white;
  font-size: 100px;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;
const MakeLeftButton = styled.button`
  background-color: ${PRIMARY_COLOR_BLUE};
  padding: 18px 25px 18px 25px;
  border-radius: 15px;
  color: white;
  border: 0;
  margin-left: 50px;
  margin-right: 50px;
  box-shadow: 2px 2px 2px 2px gray;
  &:active {
    height: 85px;
    width: 95px;
    transition: 0.5s;
  }
`;

const MakeLeftButtonBox = styled.div`
  display: flex;
`;

const MakeRight = styled.div`
  margin-top: 100px;
  display: flex;
  align-items: center;
  height: 660px;
  flex-direction: column;
`;
const MakeRightTitle = styled.div`
  background-color: ${PRIMARY_COLOR_BLUE};
  color: white;
  width: 600px;
  min-height: 50px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
`;

const MakeRightfriend = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const MakeRightinput = styled.input`
  height: 70px;
  width: 530px;
  margin-right: 20px;
  border-left: 0px;
  border-top: 0px;
  border-right: 0px;
  display: flex;
  align-items: center;
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
`;
const MakeRightbutton = styled.button`
  display: flex;
  align-items: center;
  height: 60px;
  width: 80px;
  justify-content: center;
  border: 0px;
  color: white;
  border-radius: 10px;
  background-color: ${PRIMARY_COLOR_BLUE};
  margin-right: 10px;
`;
const MakeRightCenter = styled.div`
  height: 550px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 15px;
    height: 8px;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${PRIMARY_COLOR_BLUE};
    border-radius: 6px;
  }
`;
const MakeBottom = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
`;
const MakeBottomButton = styled(Link)`
  padding: 30px 70px 30px 70px;
  font-size: 30px;
  border: 0;
  color: white;
  border-radius: 25px;
  background-color: ${PRIMARY_COLOR_BLUE};
  text-decoration: none;
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  &:hover {
    background-color: green;
    transition: 0.5s;
  }
`;

interface MainProps {
  isSidebarOpen: boolean;
}

const Make: React.FC<MainProps> = ({ isSidebarOpen }) => {
  const [pL, setPL] = useState(0);
  const [number, setNumber] = useState(0);

  if (number <= -1) {
    setNumber(0);
  }

  const Click = () => {
    alert("선택 완료");
  };
  useEffect(() => {
    const Left = isSidebarOpen ? 200 : 0;
    setPL(Left);
  }, [isSidebarOpen]);

  const plus = () => {
    setNumber(number + 1);
  };
  const minus = () => {
    setNumber(number - 1);
  };
  return (
    <>
      <MainContainer paddingLeft={pL}>
        <MakeTop>
          <MakeLeft>
            <MakeLeftNumber>{number}</MakeLeftNumber>
            <MakeLeftButtonBox>
              <MakeLeftButton>
                <FaMinus size="40" onClick={minus} />
              </MakeLeftButton>

              <MakeLeftButton>
                <FaPlus size="40" onClick={plus} />
              </MakeLeftButton>
            </MakeLeftButtonBox>
          </MakeLeft>

          <MakeRight>
            <MakeRightTitle>같이 공부 할 친구를 입력하세요!</MakeRightTitle>
            <MakeRightCenter>
              {Array.from({ length: number }).map((_, index) => (
                <MakeRightfriend>
                  <MakeRightinput placeholder="공부 할 친구의 아이디를 입력하세요" />
                  <MakeRightbutton onClick={Click}>확인</MakeRightbutton>
                </MakeRightfriend>
              ))}
            </MakeRightCenter>
          </MakeRight>
        </MakeTop>

        <MakeBottom>
          <MakeBottomButton to="/Map">중간 장소 확인</MakeBottomButton>
        </MakeBottom>
      </MainContainer>
    </>
  );
};

export default Make;
