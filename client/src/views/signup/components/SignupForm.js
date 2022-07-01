import React, { useState } from 'react';
import { useFormik } from "formik";
import { Form } from '../../../components/Form';
import { signupUser } from '../../../auth/AuthContext';

export const SignupForm = () => {
    const [ errorMessage, setErrorMessage ] = useState(null);

    const handleSubmit = async (values) => {
        const message = await signupUser(values);
        setErrorMessage(message);
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