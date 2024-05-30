import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { PRIMARY_COLOR_BLUE, PRIMARY_COLOR_BLU } from "../Constants/constants";

interface Friend {
  id: number;
  name: string;
}

interface User {
  email: string;
  userName: string;
  nickname: string;
  level: string;
  userRole: string;
}

const MyPage = () => {
  const [friend, setFriend] = useState<Friend[]>([]);

  const [nickname, setNickname] = useState("");
  const [level, setLevel] = useState("");
  const accessToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    // 백엔드에서 닉네임 데이터를 가져옵니다
    axios
      .get("https://shallwestudy.store/client/myPage", {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setNickname(String(response.data.nickname));
        setLevel(String(response.data.level));

        console.log("데이터 가져오기 성공:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [accessToken]);

  const friendDelete = async (id: number) => {
    await axios.delete(`http://localhost:3001/MyPage/${id}`);
    alert("삭제되었습니다.");
    // 삭제 후 친구 목록을 다시 불러와서 상태를 업데이트합니다.
    axios
      .get("http://localhost:3001/MyPage")
      .then((response) => {
        setFriend(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <MPTname>이름: {nickname}</MPTname>
            <MPTtag>{level}</MPTtag>
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
            {friend.map((fr) => (
              <MPBfriendContent key={fr.id}>
                <MPBfriendName>{fr.name}</MPBfriendName>
                <MPBbottomBUTTON>
                  <MPBfriendPage to="/">친구 페이지</MPBfriendPage>
                  <MPBfriendContentButton onClick={() => friendDelete(fr.id)}>
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
  border: 15px SOLID ${PRIMARY_COLOR_BLU};
  width: 50%;
  height: 1000px;
  @media screen and (max-width: 1200px) {
    width: 1200px;
  }
  @media screen and (max-width: 768px) {
    width: 760px;
  }
  @media screen and (max-width: 500px) {
    width: 500px;
  }
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
  border: 1px solid ${PRIMARY_COLOR_BLU};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const MPTname = styled.div`
  width: 210px;
  border-radius: 5px;
  border: 1px solid ${PRIMARY_COLOR_BLU};
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
  width: 90%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
  padding-left: 25px;
  padding-right: 25px;
  border-radius: 25px;
  color: ${PRIMARY_COLOR_BLUE};
  box-shadow: 3px 3px 3px 3px gray;
  @media screen and (max-width: 1200px) {
    width: 87%;
  }
  @media screen and (max-width: 500px) {
    width: 50%;
  }
  @media screen and (max-width: 768px) {
    height: 30%;
    width: 80%;
  }
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
  width: 100%;
  height: 420px;

  @media screen and (max-width: 1200px) {
    width: 90%;
  }

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
  color: ${PRIMARY_COLOR_BLUE};
`;

const MPBbottomBUTTON = styled.div`
  display: flex;
`;

const MPBfriendName = styled.div`
  height: 40px;
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  margin-right: 15px;
  color: ${PRIMARY_COLOR_BLUE};
  border: none;
  text-decoration: none;
  background-color: white;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
