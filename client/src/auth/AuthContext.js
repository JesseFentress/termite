import { createContext, useContext, useState } from "react";
import axios from "axios";
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


export const signupUser = async (values) => {
    try {
        const response = await axios.post(
            "http://localhost:5000/users/signup/create", {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            role: "developer"
        });
        if (response && response.data.token) {
            setCookie(response.data.token);
            return null;
        }
        else {
            return response.data.message;
        }
    } catch (err) {
        console.log(err);
    }
}

export  const loginUser = async (values) => {
    try {
        const response = await axios.post(
            "http://localhost:5000/users/login/validate", { 
            email: values.email,
            password: values.password
        });
        if (response && response.data.token) {
            setCookie(response.data.token);
            return null;
        }
        else {
            return response.data.message;
        }
    } catch (err) {
        console.log(err);
    }
};

export const AuthContext = createContext(null);

export const AuthProvider = ({ children })  => {
    const [token, setToken] = useState(readCookie());
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);