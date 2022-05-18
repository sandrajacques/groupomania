
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Nav from './composants/Nav';
import Home from './pages/Home';
import Inscription from './pages/Inscription';
import Login from './pages/Login';
import Profil from './pages/Profil';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
   <Nav/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<Inscription />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);


