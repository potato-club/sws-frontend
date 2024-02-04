import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main';
import Header from './Header';
import Lounge from './Lounge';
import './App.css';
import MyPage from './MyPage';
import SignInUpBox from './SignInUpPage/SignInUpBox';

import Signup from './Signup';

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };



    return (
        <>
            <Router>
                <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                <Routes>
                    <Route path="/*" element={<Main isSidebarOpen={isSidebarOpen} />} />
                    <Route path="/Lounge" element={<Lounge isSidebarOpen={isSidebarOpen} />} />
                  
                    <Route path="/Login" element={<SignInUpBox/>}/>
                   
                    <Route path="/Signup" element={<Signup/>}/>
                    <Route path="MyPage" element={<MyPage/>}/>
                </Routes>
            </Router>
        </>
    );

}

export default App;



