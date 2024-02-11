import React from 'react';
import styled from 'styled-components';
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { CgSearch } from "react-icons/cg";

interface HeaderProps {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

const HeaderContainer = styled.div`
z-index: 9999; 
    display: flex;
    width: 100%;
    height: 70px;
    justify-content: space-between;
    background-color: #272829;
    color: white;
    align-items: center;
    border-left: 50px;
    position: fixed;
`;

const LeftContainer = styled.div`
    display: flex;
    width: 300px;
    align-items: center;
    justify-content: space-around;
`;

const RightContainer = styled.div`
    display: flex;
    width: 500px;
    justify-content: space-around;
`;

const SearchContainer = styled.div`
    display: flex;
    width: 250px;
    align-items: center;
    justify-content: space-around;
`;

const Input = styled.input`
    width: 230px;
`;

const LoginContainer = styled.div`
    height: 25px;
    width: 150px;
    justify-content: space-around;
    display: flex;
    align-items: center;
`;

const Sidebar = styled.div`
    top: 70px;
    left: 0px;
    position: fixed;
    position: absolute;
    height: 880px;
    width: 200px;
    background-color: #272829;
`;

const SidebarItem = styled.div`
    height: 40px;
    font-size: 20px;
    display: flex;
    align-items: center;
`;

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
    return (
        <HeaderContainer>
            <LeftContainer>
                <div className="MenuWrapper" onClick={toggleSidebar}>
                    <AiOutlineMenu size="40" />
                    {isSidebarOpen && (
                        <Sidebar>
                            <Link to="/Lounge" style={{ textDecoration: "none", color: "white", fontSize: "20px" }}>라운지</Link>
                            <SidebarItem>설정</SidebarItem>
                            <Link to="/Make" style={{ textDecoration: "none", color: "white", fontSize: "20px" }}>팀 만들기</Link>
                            <hr />
                            <SidebarItem>나</SidebarItem>
                            <hr />
                            <SidebarItem> 친구창</SidebarItem>
                            <Link to="/MyPage" style={{ textDecoration: "none", color: "white", fontSize: "20px" }}>마이페이지</Link>
                            <SidebarItem>사이드바 내용</SidebarItem>
                        </Sidebar>
                    )}
                </div>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>SWS</Link>
            </LeftContainer>
            <RightContainer>
                <SearchContainer>
                    <Input />
                    <div><CgSearch size="25" /></div>

                </SearchContainer>
                <LoginContainer>
                    <Link to="/SignInUpPage/SignInUpBox" style={{ textDecoration: "none", color: "white" }}>로그인</Link>
                    <Link to="/SignInUpPage/SignUpBox" style={{ textDecoration: "none", color: "white" }}>회원가입</Link>
                </LoginContainer>
            </RightContainer>
        </HeaderContainer>

    );
}

export default Header;








