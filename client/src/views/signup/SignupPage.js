import React from "react";
import { withRouter } from "react-router-dom";
import { SignupForm } from "./components/SignupForm";

const SignupPage = () => {
  return <SignupForm />;
};

export default withRouter(SignupPage);
