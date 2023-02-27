import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./styles/form.css";

export const Form = ({
  formType,
  inputsFields,
  link,
  linkMessage,
  formik,
  errorMessage,
  onClick,
}) => {
  return (
    <div className="container-login">
      <div className="container-form rounded shadow-lg border">
        {errorMessage ? <label className="error">{errorMessage}</label> : null}
        <form onSubmit={formik.handleSubmit}>
          {inputsFields.map((field, index) => (
            <div className="form-group mt-4" key={field.id}>
              <label className="mb-2" htmlFor={`${field.id}Input`}>
                {field.placeholder}
              </label>
              <input
                className="form-control"
                id={`${field.id}Input`}
                name={field.id}
                placeholder={field.placeholder}
                type={field.type}
                value={formik.values[field.id]}
                onChange={formik.handleChange}
              />
            </div>
          ))}
          <div className="mt-4 mb-3">
            <Button
              type="submit"
              buttonStyle="btn--primary--solid btn--form"
              buttonSize="md"
              onClick={onClick}
            >
              {formType}
            </Button>
          </div>
        </form>
        <div className="link mb-4">
          <Link to={link}>{linkMessage}</Link>
        </div>
      </div>
    </div>
  );
};
