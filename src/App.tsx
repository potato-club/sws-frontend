import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Header from "./Header";
import Lounge from "./Lounge";
import MyPage from "./MyPage";
import SignInUpBox from "./SignInUpPage/SignInUpBox";
import RedirectHandler from "./SignInUpPage/RedirectHandler";
import { createGlobalStyle } from "styled-components";
import Make from "./Make";
import Map from "./Map";
import MainBox from "./MainBox";
import Community from "./Community";
import LoungeSecond from "./Loungesecond";
import PostMainBox from "./PostMainBox";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const GlobalStyle = createGlobalStyle`
    body {
        margin:0;
        height:952px;
    }
  `;

  return (
    <>
      <GlobalStyle />
      <Router>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Routes>
          <Route path="/*" element={<Main isSidebarOpen={isSidebarOpen} />} />
          <Route
            path="/Lounge"
            element={<Lounge isSidebarOpen={isSidebarOpen} />}
          />
          <Route path="/SignInUpPage/SignInUpBox" element={<SignInUpBox />} />
          <Route path="MyPage" element={<MyPage />} />
          <Route path="/auth" element={<RedirectHandler />} />
          <Route
            path="/Make"
            element={<Make isSidebarOpen={isSidebarOpen} />}
          />
          <Route path="/MainBox" element={<MainBox />} />
          <Route path="/Community/:id" element={<Community />} />
          <Route path="/Loungesecond" element={<LoungeSecond />} />
          <Route path="/PostMainBox" element={<PostMainBox />} />
          <Route path="/Map" element={<Map />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
