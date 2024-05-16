import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios"; 
//window.location.href 현재 페이지의 url
const RedirectHandler: React.FC = () => {
  const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            const fetchData = async () => {
                try {
                    const response = await axios.post(`http://localhost:3001/kakaologin`, { code });
                    console.log(response);
                    if (response.data.statusCode === 200) {
                        localStorage.setItem('Authorization', response.data.token);
                        navigate('/MainBox');
                    }
                } catch (error) {
                    console.error(error);
                    window.alert('소셜 로그인 실패!');
                }
            };

            fetchData();
        }
    }, []);

    return (
        <Container>
      
                <div>로그인...</div>
         
        </Container>
    );
}
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
export default RedirectHandler;
