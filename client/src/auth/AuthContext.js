import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";


export const setCookie = (token) => {
    Cookies.set("token", token, { expires: 1 });
};

export const readCookie = () => {
    const token = Cookies.get("token");
    if (token) {
        return token;
    }
};

export const removeCookie = () => {
    Cookies.remove("token");
};

export const AuthContext = createContext(null);

export const AuthProvider = ({ children })  => {
    const [ token, setToken]  = useState(readCookie());
    const [ user, setUser ] = useState();

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);