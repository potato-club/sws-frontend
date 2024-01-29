
import React, { useState } from 'react';
import './Header.css';
import { CgSearch } from "react-icons/cg";
import { AiOutlineMenu } from "react-icons/ai";
import {Link} from 'react-router-dom';
function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
       
    };

    return (
        <div className="Header">
            <div className="Header_left">
                <div className="MenuWrapper" onClick={toggleSidebar}>
                    <AiOutlineMenu size="40"/>
                    {isSidebarOpen && (
                        <div className="Sidebar">
                            <Link to="/Lounge" style={{textDecoration:"none",color:"white"}}>라운지</Link>
                        <div>설정</div>
                        <hr></hr>
                        <div>나</div>
                        <hr></hr>
                            <div>친구창</div>
                            <div>마이페이지</div>
                            <div>사이드바 내용</div>
                        </div>
                    )}
                </div>
                <Link to="/" style={{textDecoration:"none",color:"white"}}>SWS</Link>
            </div>
            
            <div className="Header_right">
                <div className="Header_right_input">
                    <input/>
                    <div><CgSearch size="25"/></div>
                </div>
                <div className="Header_right_login">
                <Link to="/Login" style={{textDecoration:"none",color:"white"}}>로그인</Link>
                <Link to="/Signup" style={{textDecoration:"none",color:"white"}}>회원가입</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;



