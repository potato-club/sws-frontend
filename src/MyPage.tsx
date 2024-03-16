import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { PRIMARY_COLOR_BLUE } from "../src/constants";
const MyPageContaine = styled.div`
  width: 100%;
  height: 880px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MyPageContent = styled.div`
  box-sizing: border-box;
  margin-top: 260px;
  background-color: ${PRIMARY_COLOR_BLUE};
  width: 50%;
  height: 1000px;
`;
const MyPageTop = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const MPTphoto = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;
const MPTname = styled.div`
  width: 210px;
  border-radius: 5px;
  height: 30px;
  color: ${PRIMARY_COLOR_BLUE};
  display: Flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const MPTbutton = styled.button`
  border-radius: 25px;
  border: none;
  height: 30px;
  width: 150px;
  background-color: white;
  box-shadow: 3px 3px 3px 3px gray;
  color: ${PRIMARY_COLOR_BLUE};
  margin-bottom: 20px;
`;
const MPBfriendContent = styled.div`
  background-color: white;
  width: 750px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
  padding-left: 25px;
  padding-right: 25px;
  border-radius: 25px;
  color: ${PRIMARY_COLOR_BLUE};
  box-shadow: 3px 3px 3px 3px gray;
`;

const MyPageBottom = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 600px;
  width: 85%;
  margin: 70px;
`;
const MPBwrite = styled(Link)`
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  margin-bottom: 25px;
  background-color: white;
  border: none;
  text-decoration: none;
  color: ${PRIMARY_COLOR_BLUE};
  box-shadow: 3px 3px 3px 3px gray;
`;
const MPBfriendContentButton = styled.button`
  height: 40px;
  width: 80px;
  border-radius: 15px;
  background-color: #d13c3c;
  color: white;
  border: none;
`;
const MPBfriendPage = styled(Link)`
  height: 40px;
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  margin-right: 15px;
  color: white;
  border: none;
  text-decoration: none;
  background-color: ${PRIMARY_COLOR_BLUE};
`;

const MPBfriend = styled.div`
  overflow-y: auto;
  width: 850px;
  height: 420px;
  &::-webkit-scrollbar {
    width: 15px;
    height: 8px;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 6px;
  }
`;
const MPBTopBUTTON = styled.div`
  display: Flex;
  flex-direction: column;
`;

const MPTtag = styled.div`
  color: white;
`;
const MPBbottomBUTTON = styled.div`
  display: flex;
`;

interface Frined {
  id: number;
  name: string;
}
const MyPage = () => {
  const friendDelete = () => {
    alert("삭제되었습니다.");
  };

  const [friend, setFriend] = useState<Frined[]>();

  useEffect(() => {
    axios
      .get("http://localhost:3001/MyPage")
      .then((response) => {
        setFriend(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MyPageContaine>
      <MyPageContent>
        <MyPageTop>
          <MPTphoto>
            <AiOutlineUser size="140" />
          </MPTphoto>
          <div>
            <MPTname>이름: 아무이름</MPTname>
            <MPTtag>#강서 #프론트엔드 #웹 개발</MPTtag>
          </div>
          <MPBTopBUTTON>
            <MPTbutton>내 정보 수정</MPTbutton>
            <MPTbutton>해시태그 수정</MPTbutton>
          </MPBTopBUTTON>
        </MyPageTop>
        <MyPageBottom>
          <MPBwrite to="/">내가 쓴 글 목록 </MPBwrite>
          <div style={{ color: "white" }}>내 친구들 </div>
          <MPBfriend>
            {friend?.map((fr) => (
              <MPBfriendContent>
                <div>{fr.name}</div>
                <MPBbottomBUTTON>
                  <MPBfriendPage to="/">친구 페이지</MPBfriendPage>
                  <MPBfriendContentButton onClick={friendDelete}>
                    친구 삭제
                  </MPBfriendContentButton>
                </MPBbottomBUTTON>
              </MPBfriendContent>
            ))}
          </MPBfriend>
        </MyPageBottom>
      </MyPageContent>
    </MyPageContaine>
  );
};

export default MyPage;
