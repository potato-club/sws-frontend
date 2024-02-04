import React from "react";
import { useState } from "react";
import styled from "styled-components";

interface SignUpFormProps{
    onSubmit: (username: string, password: string, email:string) => void
}
const SignUpForm:React.FC<SignUpFormProps> = ({onSubmit}) =>{
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSignUp= (e:React.FormEvent)=>{
        e.preventDefault();
        onSubmit(username,password,email);
    };

    return(
        <StyledForm onSubmit={handleSignUp}>
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
            <StyledLabel htmlFor="Email">
                <StyledInput 
                id="Email"
                 type="text"
                 placeholder="이메일"
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 required/>
                 <StyledDIv/>
            </StyledLabel>
            <StyledButton type="submit">회원가입</StyledButton>
        </StyledForm>

    );
}
export default SignUpForm;

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
    top:85px;
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