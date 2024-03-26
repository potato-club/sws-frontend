import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
interface UserDataItem {
  likes: number;
  hashtags?: string[]; // 새로운 hashtags 속성 추가
}

interface UserData {
  [key: string]: UserDataItem[];
}

interface MainProps {
  isSidebarOpen: boolean;
}
interface community {
  id: string;
  title: string;
  name: string;
  like: number;
  contents: string;
  hash: string;
}
const Lounge: React.FC<MainProps> = ({ isSidebarOpen }) => {
  const [pL, setPL] = useState(0);

  useEffect(() => {
    const Left = isSidebarOpen ? 200 : 0;
    setPL(Left);
  }, [isSidebarOpen]);

  const [commu, setCommu] = useState<community[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/Community")
      .then((res) => {
        setCommu(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <MainContain paddingLeft={pL}>
      <StyledSmallBox>
        <TitleContainer></TitleContainer>
        <InnerContainer>
          {commu.map((b) => (
            <InnerBox key={b.id} likes={b.like}>
              <UserInfoContainerLink to={`/Community/${b.id}`}>
                <UserInfoContainer>
                  <div className="hashtags">
                    <span>{b.hash} </span>
                  </div>
                </UserInfoContainer>
              </UserInfoContainerLink>
            </InnerBox>
          ))}
        </InnerContainer>
      </StyledSmallBox>
    </MainContain>
  );
};

export default Lounge;

const StyledSmallBox = styled.div`
  padding: 10px;
  margin: 5px; /* 상단과 하단 여백 */
  height: auto;
  display: flex;
  flex-direction: column; /* 내부에 있는 박스들을 가로로 배치 */
  align-items: flex-start; /* 세로 정렬을 맨 위로 조절 */
`;
const TitleContainer = styled.div`
  font-size: 15px;
  margin-left: 13px;
  margin-bottom: 20px;
`;

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto; /* Enable horizontal scrolling */
  justify-content: flex-start; /* Adjust alignment based on your preference */
  //background-color: #7ba1da;
  border-radius: 50px;
  scrollbar-width: thin; //스크롤바 가리기
  scrollbar-color: transparent transparent; //스크롤바 안보이게 가리기
`;

const InnerBox = styled.div<{ likes: number }>`
  flex: 0 0 auto; /* Prevent flex items from growing and shrinking */
  padding: 10px;
  margin: 15px;
  width: 450px; /* Adjust the width based on your design */
  height: 400px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #7093c0;
  position: relative;
  opacity: 1;

  &::after {
    content: "${(props) => (props.likes ? `${props.likes} likes` : "")}";
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #3f7bd6;
    padding: 10px;
    border-radius: 10px;
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    transform: scale(1);
  }
`;

const UserInfoContainerLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: auto;
  margin-top: 100px;
  margin-left: 10px;

  .hashtags {
    margin-top: 280px;
    color: #333; // 원하는 색상으로 설정
  }
`;
const MainContain = styled.div<{ paddingLeft: number }>`
  padding-top: 70px;
  margin-left: 0;
  height: 855px;
  padding-left: ${(props) => props.paddingLeft}px;
`;
