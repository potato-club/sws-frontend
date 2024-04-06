import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./MainCafePage/Main";
import Header from "./Components/Header";
import Lounge from "./Lounge/Lounge";
import Lboard from "./Lounge/Lboard";

import MyPage from "./MyPage/MyPage";
import SignInUpBox from "./SignInUpPage/SignInUpBox";
import RedirectHandler from "./SignInUpPage/RedirectHandler";
import { createGlobalStyle } from "styled-components";
import Make from "./TeamMake/Make";
import Map from "./TeamMake/Map";
import MainBox from "./MainCafePage/MainBox";
import Community from "./Lounge/LoungeDetail";
import Lcreate from "./Lounge/Lcreate";
import PostMainBox from "./MainCafePage/PostMainBox";

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
          <Route path="/Lboard" element={<Lboard />} />
          <Route path="/SignInUpPage/SignInUpBox" element={<SignInUpBox />} />
          <Route path="MyPage" element={<MyPage />} />
          <Route path="/auth" element={<RedirectHandler />} />
          <Route
            path="/Make"
            element={<Make isSidebarOpen={isSidebarOpen} />}
          />
          <Route path="/MainBox" element={<MainBox />} />
          <Route path="/Community/:id" element={<Community />} />
          <Route path="/LoungeCreate" element={<Lcreate />} />
          <Route path="/PostMainBox" element={<PostMainBox />} />
          <Route path="/Map" element={<Map />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
{
  /* <Route
path="/Lounge"
element={<Lounge isSidebarOpen={isSidebarOpen} />}
/> */
}
