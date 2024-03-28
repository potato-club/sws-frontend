import styled from "styled-components";
// @ts-ignore
import kakaoBTNIMG from "./kakaoBTNIMG.png";

export const KakaoSignInBtn = () => {
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = 'http://localhost:3000/auth';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    
    const loginHandler = () => {
      window.location.href = link;
    };
    console.log(REST_API_KEY)
  
    return (
    
      <KakaoBtn onClick={loginHandler}>
        <StyledIMG src={kakaoBTNIMG}/>
      </KakaoBtn>
  
    );
  };


const KakaoBtn = styled.button`
    padding: 0;
    border: none;
    outline: none;
    border-radius:15px;
    width:80%;
    height: 45px;
    font-weight:bold;
    font-size: 20px;
    object-fit: cover;
    background-size: cover;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(1.2);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    }
`;

const StyledIMG = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center; 
  border-radius:15px;
`;