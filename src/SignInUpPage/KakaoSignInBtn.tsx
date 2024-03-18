import styled from "styled-components";

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
        카카오 로그인
      </KakaoBtn>
    );
  };

const KakaoBtn = styled.button`
    border: none;
    outline: none;
    border-radius:15px;
    background-color: yellow;
    width:80%;
    height: 45px;
    font-weight:bold;
    font-size: 20px;

    transition: all 0.4s ease;
    &:hover {
        transform: scale(1.2);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    }
`;