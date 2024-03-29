import { createContext, useContext, useState } from "react";
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

export const setUserCookie = (user) => {
    Cookies.set("user", user, { expires: 1 });
};

const readUserCookie = () => {
    const token = Cookies.get("user");
    if (token) {
        return token;
    }
};

export const AuthContext = createContext(null);

export const AuthProvider = ({ children })  => {
    const [ token, setToken]  = useState(readCookie());
    const [ user, setUser ] = useState({});
    const [ isLoading, setIsLoading ] = useState(true);

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);