import { useState, useEffect } from "react";
import { PRIMARY_COLOR_BLUE } from "../Constants/constants";
// @ts-ignore
import logo from "./logo.png";
import styled from "styled-components";
import axios from "axios";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useRecoilState } from "recoil";
import { jwtTokenState, refreshTokenState } from "../recoil/atom";

const SignInUpBox = () => {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);
  const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenState);

  const handleLoginSubmit = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "https://shallwestudy.store/client/login",
        {
          email,
          password,
        }
      );
      //  console.log(response.headers);
      const jwtToken = response.headers["authorization"];
      const refreshToken = response.headers["refreshtoken"];

      setJwtToken(jwtToken);
      setRefreshToken(refreshToken);
      localStorage.setItem("jwtToken", jwtToken);
      localStorage.setItem("refreshToken", refreshToken);

      console.log("로그인 성공", response.data);
      await fetchUsername(jwtToken);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("로그인 실패", error.response.data);
        } else {
          console.error("네트워크 오류", error.message);
        }
      } else {
        console.error("기타 오류", error);
      }
    }
  };

  const fetchUsername = async (accessToken: string) => {
    try {
      const response = await axios.get(
        "https://shallwestudy.store/client/myPage",
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
      setUsername(response.data.userName); // 서버로부터 받아온 사용자 이름
      console.log("사용자 이름 가져오기 성공", response.data);
    } catch (error) {
      console.error("사용자 이름 가져오기 실패", error);
    }
  };

  const handleLogout = async () => {
    try {
      if (jwtToken && refreshToken) {
        // 서버에 로그아웃 요청 보내기
        await axios.get("https://shallwestudy.store/client/logout", {
          headers: {
            Authorization: `${jwtToken}`,
            refreshToken: `${refreshToken}`, // 리프레시 토큰을 별도의 헤더에 추가
          },
        });
        console.log("로그아웃 요청 성공");
      }
      setJwtToken(null);
      setRefreshToken(null);
      // 로컬 스토리지에서 토큰 제거
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("refreshToken");
      // 사용자 이름 상태 초기화
      setUsername(null);
      setIsLoginTab(true);
    } catch (error) {
      console.error("로그아웃 요청 중 오류 발생:", error);
    }
  };

  const handleSignUpSubmit = (
    username: string,
    password: string,
    email: string,
    nickname: string
  ) => {
    console.log("회원가입", username, password, email, nickname);
  };

  return (
    <LogInBoxContainer>
      <ContainerWithLogo>
        <Logo />
        <TabsContainer>
          <Tabs>
            <Tab onClick={() => setIsLoginTab(true)} active={isLoginTab}>
              Log In
            </Tab>
            <Tab onClick={() => setIsLoginTab(false)} active={!isLoginTab}>
              Sign Up
            </Tab>
          </Tabs>
        </TabsContainer>
        <LogInBox>
          {username ? (
            <UserContainer>
              <UserGreeting>안녕하세요, {username}님!</UserGreeting>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </UserContainer>
          ) : (
            <>
              <Contents visible={isLoginTab}>
                <LoginForm onSubmit={handleLoginSubmit} />
              </Contents>
              <Contents visible={!isLoginTab}>
                <SignUpForm onSubmit={handleSignUpSubmit} />
              </Contents>
            </>
          )}
        </LogInBox>
      </ContainerWithLogo>
    </LogInBoxContainer>
  );
};

export default SignInUpBox;

const LogInBoxContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ContainerWithLogo = styled.div`
  text-align: center;
  margin-top: 125px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogInBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 500px;
  height: 500px;
  background-color: ${PRIMARY_COLOR_BLUE};
  border-radius: 30px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
`;

const Logo = styled.div`
  background: url(${logo});
  width: 120px;
  height: 50px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const TabsContainer = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;

const Tabs = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 15px;
`;

const Tab = styled.div<{ active: boolean }>`
  cursor: pointer;
  padding: 15px 30px;
  font-size: 18px;
  color: ${(props) => (props.active ? PRIMARY_COLOR_BLUE : "#ccc")};
  border-bottom: ${(props) =>
    props.active ? `2px solid ${PRIMARY_COLOR_BLUE}` : "2px solid transparent"};
  transition: color 0.5s, border-bottom-color 0.5s;
  &:hover {
    color: black;
  }
`;

const Contents = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  height: 100%;
  text-align: center;
  width: 100%;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const UserGreeting = styled.h2`
  margin-bottom: 20px;
`;

const LogoutButton = styled.button`
  font-size: 20px;
  border: none;
  outline: none;
  border-radius: 15px;
  background-color: white;
  height: 45px;
  width: 80%;
  font-weight: bold;
  transition: all 0.4s ease;
  &:hover {
    transform: scale(1.2);
    background-color: #ff9900;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  }
`;
