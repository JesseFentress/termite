import axios from "axios";
import { setCookie, setUserCookie, removeCookie } from "../auth/AuthContext";

export const signupUser = async (values) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/users/signup/create",
      {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        role: "developer",
      }
    );
    if (response && response.data.token) {
      return null;
    } else {
      return response.data.message;
    }
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (values) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/users/login/validate",
      {
        email: values.email,
        password: values.password,
      }
    );
    if (response && response.data.token) {
      setCookie(response.data.token);
      return null;
    } else {
      return response.data.message;
    }
  } catch (err) {
    console.log(err);
  }
};

export const logoutUser = () => {
  removeCookie();
};

export const getUser = async (values) => {
  try {
    const response = await axios.get("http://localhost:5000/users/retrieve", {
      params: {
        token: values.token,
      },
    });
    if (response && response.data) {
      return response.data;
    } else {
      return response.data.message;
    }
  } catch (err) {
    console.log(err);
  }
};
