import React from 'react';
import { withRouter } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import "./loginpage.css";

const LoginPage = () => {
    return (
        <LoginForm/>
    );
};

export default withRouter(LoginPage);