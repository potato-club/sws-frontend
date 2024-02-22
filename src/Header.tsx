import React, { useState } from 'react';
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
  text-decoration:none;
font-size:22px;
display:flex;
align-items:center;
height:100%;
color:white; 
background-color: #272829;
`;
const SidebarLink=styled(Link)`
text-decoration:none;
font-size:22px;
display:flex;
align-items:center;
height:100%;
color:white; 
background-color: #272829;
&.active {
  background-color: white;
  color:black; 
}
`;
const Sidebardiv=styled.div`
border-right:1px solid black;
height:55px;
width:198px;
background-color: #272829;
&.active {
  background-color: white;
  color:black; 
}
`;


const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
    const [activeLink, setActiveLink] = useState<number | null>(null);

    const handleClick = (index:number) => {
      setActiveLink(index);
    };
    return (
        <HeaderContainer>
            <LeftContainer>
                <div className="MenuWrapper" onClick={toggleSidebar}>
                    <AiOutlineMenu size="40" />
                    {isSidebarOpen && (
                        <Sidebar>
                            <Sidebardiv  className={`SidebarLink ${activeLink === 0 ? "active" : ""}`} 
                             onClick={() => handleClick(0)}>
                            <SidebarLink to="/Lounge" 
                            className={`SidebarLink ${activeLink === 0 ? "active" : ""}`} 
                            onClick={() => handleClick(0)}
                            >라운지</SidebarLink>
                            </Sidebardiv>

                            <Sidebardiv  className={`SidebarLink ${activeLink === 1 ? "active" : ""}`} 
                             onClick={() => handleClick(1)}>
                            <SidebarItem>설정</SidebarItem>
                            </Sidebardiv>

                            <Sidebardiv className={`SidebarLink ${activeLink === 2 ? "active" : ""}`} 
                             onClick={() => handleClick(2)}>
                            <SidebarLink to="/Make"  className={`SidebarLink ${activeLink === 2 ? "active" : ""}`} 
        onClick={() => handleClick(2)}>팀 만들기</SidebarLink>
                            </Sidebardiv>
                            <hr />
                            <Sidebardiv  className={`SidebarLink ${activeLink === 3 ? "active" : ""}`} 
                             onClick={() => handleClick(3)}>
                            <SidebarItem>나</SidebarItem>
                            </Sidebardiv>
                            <hr />
                            <Sidebardiv  className={`SidebarLink ${activeLink === 4 ? "active" : ""}`} 
                             onClick={() => handleClick(4)}>
                            <SidebarItem>친구창</SidebarItem>
                            </Sidebardiv>
                            <Sidebardiv className={`SidebarLink ${activeLink === 5 ? "active" : ""}`} 
                             onClick={() => handleClick(5)}>
                            <SidebarLink to="/MyPage"  className={`SidebarLink ${activeLink === 5 ? "active" : ""}`} 
        onClick={() => handleClick(5)}>마이 페이지</SidebarLink>

</Sidebardiv>
<Sidebardiv  className={`SidebarLink ${activeLink === 6 ? "active" : ""}`} 
                             onClick={() => handleClick(6)}>
                            <SidebarItem>사이드바 내용</SidebarItem>
                            </Sidebardiv>
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








