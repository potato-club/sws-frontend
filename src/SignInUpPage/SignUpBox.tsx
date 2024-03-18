//회원가입 페이지

import { PRIMARY_COLOR_BLUE} from "../../src/constants";

// @ts-ignore
import logo from "./logo.png";
import styled from "styled-components";
import SignUpForm from "./SignUpForm";
const SignUpBox=()=>{
    const handleSignUpSubmit = (username: string, password: string, email:string, nickname: string) =>{
        console.log('회원가입', username, password, email, nickname)
    };

    return(
<LogInBoxContainer>
        <ContainerWithLogo>
            <Logo></Logo>
            <LogInBox>
                <Contents>
                    <SignUpForm onSubmit={handleSignUpSubmit}/>
                </Contents>
            </LogInBox>
        </ContainerWithLogo>
</LogInBoxContainer>
    );

}
export default SignUpBox;


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
    margin-top: 50px;
    height:100%;
    text-align: center;
`;

