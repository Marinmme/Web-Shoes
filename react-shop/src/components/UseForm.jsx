import { useEffect, useState } from "react";
import userApi from "../api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginFailed,
  loginSuccess,
  registerFailed,
  registerSuccess,
} from "../redux/authSlice";

const UseForm = (validate) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmpassword: "",
    oldpassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const loginUser = async () => {
    try {
      const response = await userApi.loginUser(values);
     
      dispatch(loginSuccess(response));
      navigate("/");
    } catch (error) {
      alert("Login fail!!!")
      dispatch(loginFailed());
    }
  };

  const changePass = async () => {
    try {
      const response = await userApi.changePass(user?._id, {
        oldpassword: values.oldpassword,
        newpassword: values.password,
      });
      if (response.message === "User update password success") navigate("/");
     
    } catch (error) {
      alert("unsuccessful !!!");
    }
  };

  const registerUser = async () => {
    try {
      await userApi.registerUser(values);
      dispatch(registerSuccess());
      navigate("/Login");
    } catch (error) {
      alert("Register fail!!!");
      dispatch(registerFailed());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    registerUser();
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    loginUser();
  };

  const handleChangePass = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    changePass();
  };

  return {
    handleChange,
    handleSubmit,
    handleSubmitLogin,
    handleChangePass,
    values,
    errors,
  };
};

export default UseForm;
