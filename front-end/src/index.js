import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Header from "./composants/Header";
import Nav from "./composants/Nav";
import Home from "./pages/Home";
import Inscription from "./pages/Inscription";
import Login from "./pages/Login";
import Profil from "./pages/Profil";
import { UserProvider } from "./context/Context";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <UserProvider>
        <BrowserRouter>
            <Header/>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signUp" element={<Inscription />} />
            </Routes>
        </BrowserRouter>
    </UserProvider>
);
