//로그인 페이지

import { PRIMARY_COLOR_BLUE} from "../../src/constants";
// @ts-ignore
import logo from "./logo.png";

import styled from "styled-components";
import LoginForm from "./LoginForm";
const SignInUpBox=()=>{
    const handleLoginSubmit = (username: string, password: string) =>{
        console.log('로그인', username, password)
    };

    return(
<LogInBoxContainer>
        <ContainerWithLogo>
            <Logo></Logo>
            <LogInBox>
                <Contents>
                    <LoginForm onSubmit={handleLoginSubmit}/>
                </Contents>
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
    margin-bottom: 30px;
    background: url(${logo});
    width:120px;
  height:50px;
  background-position:center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Contents = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
    height:100%;
    text-align: center;
`;

