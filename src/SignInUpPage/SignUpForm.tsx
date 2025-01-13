import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { PRIMARY_COLOR_BLUE } from "../Constants/constants";
import axios from "axios";


interface SignUpFormProps {
  onSubmit: (
    username: string,
    password: string,
    email: string,
    nickname: string
  ) => void;
}
const SignUpForm: React.FC<SignUpFormProps> = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://shallwestudy.store/client/signup", {
        userName,
        password,
        email,
        nickname,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data); // 서버에서 받은 응답 처리
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("회원가입 실패", error.response.data);
        } else {
          console.error("네트워크 오류", error.message);
        }
      } else {
        console.error("기타 오류", error);
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSignUp}>
      <StyledLabel htmlFor="Email">
        <StyledInput
          id="Email"
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <StyledDIv />
      </StyledLabel>
      <StyledLabel htmlFor="Password">
        <StyledInput
          id="Password"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <StyledDIv />
      </StyledLabel>
      <StyledLabel htmlFor="Username">
        <StyledInput
          id="Username"
          type="text"
          placeholder="이름"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <StyledDIv />
      </StyledLabel>
      <StyledLabel htmlFor="Nickname">
        <StyledInput
          id="Nickname"
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <StyledDIv />
      </StyledLabel>
      <StyledButton type="submit">회원가입</StyledButton>
    </StyledForm>
  );
};
export default SignUpForm;

const StyledLabel = styled.label`
  margin-bottom: 50px;
  display: block;
  width: 290px;
  height: 30px;
`;

const StyledForm = styled.form`
  height: 100%;
`;

const StyledButton = styled.button`
  position: relative;
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

const StyledInput = styled.input`
  border: none;
  outline: none;
  background-color: ${PRIMARY_COLOR_BLUE};
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  width: 280px;

  transition: all 0.4s ease;
  &:hover {
    transform: scale(1.1);
    border: 1.5px solid grey;
    border-radius: 15px;
    background-color: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0);
  }
`;

const StyledDIv = styled.div`
  background-color: black;
  height: 1.5px;
`;
