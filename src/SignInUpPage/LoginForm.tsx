import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { KakaoSignInBtn } from "./KakaoSignInBtn";
interface LoginFormProps{
    onSubmit: (username: string, password: string) => void
}
const LoginForm:React.FC<LoginFormProps> = ({ onSubmit = () => {} }) =>{
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin= (e:React.FormEvent)=>{
        e.preventDefault();
        onSubmit(username,password);
    };

    return(
        <StyledForm onSubmit={handleLogin}>
            <StyledLabel htmlFor="Id">
                <StyledInput 
                id="Id"
                 type="text"
                 placeholder="아이디"
                 value={username}
                 onChange={(e)=>setUsername(e.target.value)}
                 required/>
                 <StyledDIv/>
            </StyledLabel>
            <StyledLabel htmlFor="Password">
                <StyledInput 
                id="Password"
                 type="password"
                 placeholder="비밀번호"
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 required/>
                 <StyledDIv/>
            </StyledLabel>
            <KakaoSignInBtn/>
            <StyledButton type="submit">로그인</StyledButton>
        </StyledForm>

    );
}
export default LoginForm;

const StyledLabel = styled.label`
    margin-bottom: 50px;
    display: block;
`;

const StyledForm = styled.form`
    height: 100%;
`;

const StyledButton = styled.button`
    position: relative;
    font-size: 30px;
    border: none;
    outline: none;
    border-radius:15px;
    background-color: white;
    height: 50px;
    width:85%;
    top:50px;
    font-weight: bold;
`;

const StyledInput = styled.input`
    border: none;
    outline: none;
    background-color: #cac8c8;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    width: 280px;
`;

const StyledDIv = styled.div`
    background-color: black;
    height:2px;
`;
