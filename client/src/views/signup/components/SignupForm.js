import React, { useState } from 'react';
import { useFormik } from "formik";
import { useHistory } from 'react-router-dom';
import { Form } from '../../../components/Form';
import { signupUser } from '../../../util/userHandler';

export const SignupForm = () => {
    const [ errorMessage, setErrorMessage ] = useState(null);
    let history = useHistory();

    const handleSubmit = async (values) => {
        const message = await signupUser(values);
        setErrorMessage(message);
        if (message === null) {
            history.push("/dashboard");
        }
    }

    const formik = useFormik({ 
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }, 
        validateOnBlur: true,
        onSubmit: handleSubmit,
    });
    return (
        <Form
            formType="Signup"
            inputsFields={[
                { id: "firstName", placeholder: "First Name", type: "text"} ,
                { id: "lastName", placeholder: "Last Name", type: "text" },
                { id: "email", placeholder: "Email", type: "email" },
                { id: "password", placeholder: "Password", type: "password" },
            ]}
            link="/login"
            linkMessage="Already have an account? Log in."
            formik={formik}
            errorMessage={errorMessage}
        />
    );
};