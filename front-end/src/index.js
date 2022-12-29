import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Header from "./composants/Header";
import Home from "./pages/Home";
import Inscription from "./pages/Inscription";
import Login from "./pages/Login";
import Profil from "./pages/Profil";
import { UserProvider } from "./context/Context";//utilisation de l'api context pour le state management
import Accueil from "./pages/Accueil";
import Logout from "./pages/Logout";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 
    <UserProvider> {/* //fourni le state de l'utilisateur en cours sur toute l'application */}
        <BrowserRouter>{/* //Routage de l'application */}
            <Header/>{/* //Mettre le header en dehors des routes pour le rendre visible sur toutes les pages */}
            <Routes>{/* //associer les routes(url) avec leurs composants */}
                <Route path="/" element={<Accueil />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signUp" element={<Inscription />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </BrowserRouter>
    </UserProvider>

);
