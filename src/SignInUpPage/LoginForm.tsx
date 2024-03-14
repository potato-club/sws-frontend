import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { KakaoSignInBtn } from "./KakaoSignInBtn";
import { PRIMARY_COLOR_BLUE} from "../../src/constants";
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
    border-radius:15px;
    background-color: white;
    height: 45px;
    width:80%;
    top:50px;
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
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    }

`;

const StyledDIv = styled.div`
    background-color: black;
    height: 1.5px;
`;
