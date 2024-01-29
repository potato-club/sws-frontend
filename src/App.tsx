import React from 'react';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Main from './Main';
import Header from './Header';
import Lounge from './Lounge';
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <>
     <Router>
      <Header/>
    <Routes>
<Route path="/*" element={<Main/>}></Route>
<Route path="/Lounge" element={<Lounge/>}></Route>
<Route path="/Login" element={<Login/>}></Route>
<Route path="/Signup" element={<Signup/>}></Route>

    </Routes>
    </Router>
    </>
  );
}

export default App;


