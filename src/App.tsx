import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main';
import Header from './Header';
import Lounge from './Lounge';
import MyPage from './MyPage';
import SignInUpBox from './SignInUpPage/SignInUpBox';
import SignUpBox from './SignInUpPage/SignUpBox';
import RedirectHandler from './SignInUpPage/RedirectHandler';
function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);//사이드 박스 열기

    const toggleSidebar = () => {// 클릭 이벤트에 의해 호출되어 사이드바의 열림/닫힘 상태를 토글
        setIsSidebarOpen(prevState => !prevState);
    };

    return (
        <>
            <Router>
                <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                <Routes>
                    <Route path="/*" element={<Main isSidebarOpen={isSidebarOpen} />} />  {/*ul업데이트 */}
                    <Route path="/Lounge" element={<Lounge isSidebarOpen={isSidebarOpen} />} />
                    <Route path="/SignInUpPage/SignInUpBox" element={<SignInUpBox />} />
                    <Route path="/SignInUpPage/SignUpBox" element={<SignUpBox />} />
                    <Route path="MyPage" element={<MyPage/>}/>
                    <Route path="/auth" element={<RedirectHandler/>}/>
                </Routes>
            </Router>
        </>
    );

}

export default App;





