import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CgSearch } from "react-icons/cg";
import {
  PRIMARY_COLOR_BLUE,
  PRIMARY_COLOR_W,
  PRIMARY_COLOR_BLU,
} from "../Constants/constants";
// @ts-ignore
import logo from "./logo.png";

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
  background-color: white;
  color: black;
  align-items: center;
  border-left: 50px;
  position: fixed;
  border: 1px solid black;
`;

const LeftContainer = styled.div`
  display: flex;
  width: 400px;
  align-items: center;
  justify-content: space-around;
`;

const RightContainer = styled.div`
  display: flex;
  width: 600px;
  justify-content: space-around;
`;

const SearchContainer = styled.div`
  display: flex;
  width: 280px;
  align-items: center;
  justify-content: space-around;
`;
const Searchinput = styled.input`
  width: 220px;
  border-right: 0px solid black;
  border-top: 0px solid black;
  border-left: 0px solid black;
`;
const Searchbutton = styled.button`
  border: 0px;
  display: flex;

  background-color: white;
`;

const LoginContainer = styled.div`
  height: 25px;

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
  background-color: white;
  border: 1px solid black;
`;

const SidebarLink = styled(Link)`
  text-decoration: none;
  font-size: 22px;
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  display: flex;
  align-items: center;
  height: 100%;
  border-radius: 15px;
  padding-left: 15px;
  color: black;

  background-color: white;
  &.active {
    background-color: ${PRIMARY_COLOR_BLUE};
    color: white;
  }
  &:hover {
    background-color: ${PRIMARY_COLOR_BLU};
    color: white;
    transition: 1s;
  }
`;
const SidebarMe = styled.div`
  font-size: 22px;
  height: 100%;
  padding-left: 15px;
  display: flex;
  align-items: center;
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
`;
const Sidebardiv = styled.div`
  height: 55px;
  margin: 15px;
  background-color: white;
  &.active {
    color: white;
  }
`;
const Logo = styled.div`
  background: url(${logo});
  background-repeat: no-repeat;
  width: 120px;
  height: 50px;
  background-position: center;
  background-size: cover;
`;
const HeadLink = styled(Link)`
  text-decoration: none;
  margin-right: 30px;
  display: flex;
  align-items: center;
  height: 50px;
  width: 110px;
  border-radius: 15px;
  justify-content: center;
  color: white;
  background-color: ${PRIMARY_COLOR_BLUE};
`;
const MenuWrapper = styled.div`
  background-color: white;
  width: 55px;
  height: 50px;
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  &:active {
    background-color: ${PRIMARY_COLOR_BLUE};
  }
`;

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const [activeLink, setActiveLink] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveLink(index);
  };
  return (
    <HeaderContainer>
      <LeftContainer>
        <MenuWrapper onClick={toggleSidebar}>
          <AiOutlineMenu size="40" />
          {isSidebarOpen && (
            <Sidebar>
              <Sidebardiv
                className={`SidebarLink ${activeLink === 0 ? "active" : ""}`}
                onClick={() => handleClick(0)}
              >
                <SidebarLink
                  to="/Lounge"
                  className={`SidebarLink ${activeLink === 0 ? "active" : ""}`}
                  onClick={() => handleClick(0)}
                >
                  LOUNGE
                </SidebarLink>
              </Sidebardiv>

              <Sidebardiv
                className={`SidebarLink ${activeLink === 1 ? "active" : ""}`}
                onClick={() => handleClick(1)}
              >
                <SidebarLink
                  to="/"
                  className={`SidebarLink ${activeLink === 1 ? "active" : ""}`}
                  onClick={() => handleClick(1)}
                >
                  SETTING
                </SidebarLink>
              </Sidebardiv>

              <Sidebardiv
                className={`SidebarLink ${activeLink === 2 ? "active" : ""}`}
                onClick={() => handleClick(2)}
              >
                <SidebarLink
                  to="/Make"
                  className={`SidebarLink ${activeLink === 2 ? "active" : ""}`}
                  onClick={() => handleClick(2)}
                >
                  Make Team
                </SidebarLink>
              </Sidebardiv>
              <hr />
              <Sidebardiv
                className={`SidebarLink ${activeLink === 3 ? "active" : ""}`}
                onClick={() => handleClick(3)}
              >
                <SidebarMe>MY</SidebarMe>
              </Sidebardiv>
              <hr />
              <Sidebardiv
                className={`SidebarLink ${activeLink === 4 ? "active" : ""}`}
                onClick={() => handleClick(4)}
              >
                <SidebarLink
                  to="/"
                  className={`SidebarLink ${activeLink === 4 ? "active" : ""}`}
                  onClick={() => handleClick(4)}
                >
                  FRIEND
                </SidebarLink>
              </Sidebardiv>

              <Sidebardiv
                className={`SidebarLink ${activeLink === 5 ? "active" : ""}`}
                onClick={() => handleClick(5)}
              >
                <SidebarLink
                  to="/MyPage"
                  className={`SidebarLink ${activeLink === 5 ? "active" : ""}`}
                  onClick={() => handleClick(5)}
                >
                  MY PAGE
                </SidebarLink>
              </Sidebardiv>
              <Sidebardiv
                className={`SidebarLink ${activeLink === 6 ? "active" : ""}`}
                onClick={() => handleClick(6)}
              >
                <SidebarLink
                  to="/"
                  className={`SidebarLink ${activeLink === 6 ? "active" : ""}`}
                  onClick={() => handleClick(6)}
                >
                  COTENTS
                </SidebarLink>
              </Sidebardiv>
            </Sidebar>
          )}
        </MenuWrapper>

        <Link to="/">
          <Logo></Logo>
        </Link>
      </LeftContainer>
      <RightContainer>
        <SearchContainer>
          <Searchinput placeholder="해시 태크를 검색해 보세요" />
          <Searchbutton>
            <CgSearch size="25" />
          </Searchbutton>
        </SearchContainer>
        <LoginContainer>
          <HeadLink to="/SignInUpPage/SignInUpBox">Sign In/Up</HeadLink>
        </LoginContainer>
      </RightContainer>
    </HeaderContainer>
  );
};

export default Header;
