import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import loginstyle from "../Styles/Login.module.css";
// import axios from "axios";
// import {app} from "../firebaseConfig"
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate, NavLink } from "react-router-dom";

const AdminLogin = ({ setUserState }) => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [admin, setAdminDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAdminDetails({
      ...admin,
      [name]: value,
    });
  };
  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(admin));
    setIsSubmit(true);
    signInWithEmailAndPassword(auth,admin.email, admin.password)
    .then((adminCredential) => {
      const admin = adminCredential.admin;
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Sign In Successful',
        showConfirmButton: false,
        timer: 3500
      })
      
      navigate('/admin-profile');
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Invalid Credentials!")
      // ..
    });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(admin);
      // axios.post("", user).then((res) => {
      //   // backend db url
      //   alert(res.data.message);
      //   setUserState(res.data.user);
      //   navigate("/admin-profile", { replace: true });
      // });
    }
  }, [formErrors]);
  return (
    <div className={loginstyle.container}>
      <div className={loginstyle.login}>
        <form>
          <h1 style={{ margin: "10px" }}>Admin Login</h1>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={changeHandler}
            value={admin.email}
          />
          <p className={loginstyle.error}>{formErrors.email}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={admin.password}
          />
          <p className={loginstyle.error}>{formErrors.password}</p>
          <button className={loginstyle.button_common} onClick={loginHandler}>
            Login
          </button>
        </form>
        <NavLink to="/admin-register">Not yet registered? Register Now</NavLink>
      </div>
    </div>
  );
};
export default AdminLogin;
