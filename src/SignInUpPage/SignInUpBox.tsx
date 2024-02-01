import styled from "styled-components";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
const SignInUpBox=()=>{
    const handleLoginSubmit = (username: string, password: string) =>{
        console.log('로그인', username, password)
    };

    return(
<LogInBoxContainer>
        <ContainerWithLogo>
            <Logo>대충 로고이미지 넣을 곳</Logo>
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
`;

const LogInBox = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    width:500px;
    height: 500px;
    background-color: #cac8c8;
    border-radius: 30px;
    box-shadow: 0 0 15px rgba(0,0,0,0.4);
`;

const Logo = styled.div`
    margin-bottom: 30px;
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

