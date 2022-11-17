import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const initialUser = {
    email: "",
    prenom: "",
    nom: "",
    id: "",
    photo:"",
    token: "",
    isAdmin: false,
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(initialUser);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
