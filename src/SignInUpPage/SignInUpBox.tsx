//로그인 페이지
import React, { useState } from "react";
import { PRIMARY_COLOR_BLUE} from "../../src/constants";
// @ts-ignore
import logo from "./logo.png";

import styled from "styled-components";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
const SignInUpBox=()=>{
  const [isLoginTab, setIsLoginTab] = useState(true);

  const handleLoginSubmit = (username: string, password: string) => {
    console.log('로그인', username, password);
  };

  const handleSignUpSubmit = (username: string, password: string, email: string, nickname: string) => {
    console.log('회원가입', username, password, email, nickname);
  };

    return(
      <LogInBoxContainer>
      <ContainerWithLogo>
        <Logo />
        <TabsContainer>
        <Tabs>
          <Tab onClick={() => setIsLoginTab(true)} active={isLoginTab}>Log In</Tab>
          <Tab onClick={() => setIsLoginTab(false)} active={!isLoginTab}>Sign Up</Tab>
        </Tabs>
      </TabsContainer>
        <LogInBox>
        <ContentsWrapper isLoginTab={isLoginTab}>
            <Contents isLoginTab={isLoginTab}>
              <LoginForm onSubmit={handleLoginSubmit} />
            </Contents>
            <Contents isLoginTab={!isLoginTab}>
              <SignUpForm onSubmit={handleSignUpSubmit} />
            </Contents>
          </ContentsWrapper>
        </LogInBox>
      </ContainerWithLogo>
    </LogInBoxContainer>
    );

}
export default SignInUpBox;


const LogInBoxContainer = styled.div`
  display  : flex ;
  align-items: center;
  flex-direction: column;
`;

const ContainerWithLogo = styled.div`
  text-align  :center ;
  margin-top: 150px;
  display:flex;
  flex-direction:column;
  align-items:center;
`;

const LogInBox = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    width:500px;
    height: 500px;
    background-color: ${PRIMARY_COLOR_BLUE};
    border-radius: 30px;
    box-shadow: 0 0 15px rgba(0,0,0,0.4);
`;

const Logo = styled.div`
    background: url(${logo});
    width:120px;
  height:50px;
  background-position:center;
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
  color: ${props => props.active ? PRIMARY_COLOR_BLUE : '#ccc'};
  border-bottom: ${props => props.active ? `2px solid ${PRIMARY_COLOR_BLUE}` : '2px solid transparent'};
  transition: color 0.5s, border-bottom-color 0.5s;
  &:hover {
    color: black;
  }
`;

const ContentsWrapper = styled.div<{ isLoginTab: boolean }>`
  display: flex;
  width: 200%;
  transform: ${props => props.isLoginTab ? 'translateX(0%)' : 'translateX(-50%)'};
  transition: transform 0.5s ease;
`;

const Contents = styled.div<{ isLoginTab: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  height: 100%;
  text-align: center;
  visibility: ${props => props.isLoginTab ? 'visible' : 'hidden'};
  opacity: ${props => props.isLoginTab ? 1 : 0};
  width: 50%;
`;
