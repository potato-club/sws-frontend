import React, { useState } from "react";
import styled from "styled-components";

const RedirectHandler: React.FC = (props) => {
    const code = new URL(window.location.href).searchParams.get("code");

    return (
        <Container>
      
                <div>로그인</div>
         
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
