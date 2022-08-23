import React, { useState } from 'react';
import { useFormik } from "formik";
import { useHistory } from 'react-router-dom';
import { Form } from '../../../components/Form';
import"../../../components/styles/button.css";
import { loginUser } from '../../../util/userHandler';
import { readCookie, useAuth } from '../../../auth/AuthContext';


export const LoginForm = () => {
    const { setToken } = useAuth();
    const [ errorMessage, setErrorMessage ] = useState(null);
    let history = useHistory();

    const handleSubmit = async (values) => {
        const message = await loginUser(values);
        setErrorMessage(message);
        if (message === null) {
            setToken(readCookie());
            history.push("/dashboard");
        }
    };

    const formik = useFormik({ 
        initialValues: {
            email: "",
            password: ""
        }, 
        validateOnBlur: true,
        onSubmit: handleSubmit,
    });
  
    return (
        <Form
            formType="Login"
            inputsFields={[
                { id: "email", placeholder: "Email", type: "email" },
                { id: "password", placeholder: "Password", type: "password" },
            ]}
            link="/signup"
            linkMessage="Don't have an account? Sign up."
            formik={formik}
            errorMessage={errorMessage}
            onClick={null}
        />
    );
};