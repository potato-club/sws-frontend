import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const RedirectHandler: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    //const code = window.location.search;
    if (code) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://shallwestudy.store/client/login/kakao?code=${code}`);
          console.log("성공!",response);
          if (response.status === 200) {
            localStorage.setItem('Authorization', response.headers['authorization']);
            navigate('/');
          } else {
            window.alert('소셜 로그인 실패!');
           
          }
        } catch (error) {
          console.error(error);
          window.alert('소셜 로그인 실패!');
        }
      };

      fetchData();
    } else {
      navigate('/login');
    }
  }, [navigate]);


  return (
    <Container>
      <div>로그인...</div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default RedirectHandler;
