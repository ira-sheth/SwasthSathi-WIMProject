import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import registerstyle from "../Styles/Register.module.css";
import axios from "axios";
import {app} from "../firebaseConfig"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { useNavigate, NavLink } from "react-router-dom";

const AdminRegister = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [admin, setAdminDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
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
    if (!values.fname) {
      error.fname = "First Name is required";
    }
    if (!values.lname) {
      error.lname = "Last Name is required";
    }
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.cpassword) {
      error.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      error.cpassword = "Confirm password and password should be same";
    }
    return error;
  };
  const signupHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(admin));
    setIsSubmit(true);
    createUserWithEmailAndPassword(auth, admin.email, admin.password)
    .then((adminCredential) => {
    const admin = adminCredential.admin;
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'User Registered Successfully',
      showConfirmButton: false,
      timer: 3500
    })
    navigate('/admin-login');
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    // if (!formErrors) {
    //   setIsSubmit(true);
    // }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(admin);
      // axios.post("", user).then((res) => {
      //   alert(res.data.message);
      //   navigate("/login", { replace: true });
      // });
    }
  }, [formErrors]);
  return (
    <div className={registerstyle.container}>
      <div className={registerstyle.register}>
        <form>
          <h1 style={{ marginBottom: "5px" }}>Create your account</h1>
          <input
            type="text"
            name="fname"
            id="fname"
            placeholder="First Name"
            onChange={changeHandler}
            value={admin.fname}
          />
          <p className={registerstyle.error}>{formErrors.fname}</p>
          <input
            type="text"
            name="lname"
            id="lname"
            placeholder="Last Name"
            onChange={changeHandler}
            value={admin.lname}
          />
          <p className={registerstyle.error}>{formErrors.lname}</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={changeHandler}
            value={admin.email}
          />
          <p className={registerstyle.error}>{formErrors.lname}</p>
          <input
            type="text"
            name="workAdress"
            id="workAdress"
            placeholder="Work Address"
            onChange={changeHandler}
            value={admin.email}
          />

          <p className={registerstyle.error}>{formErrors.email}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={admin.password}
          />
          <p className={registerstyle.error}>{formErrors.password}</p>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            placeholder="Confirm Password"
            onChange={changeHandler}
            value={admin.cpassword}
          />
          <p className={registerstyle.error}>{formErrors.cpassword}</p>
          <button
            className={registerstyle.button_common}
            onClick={signupHandler}
          >
            Register
          </button>
        </form>
        <NavLink to="/admin-login">Already registered? Login</NavLink>
      </div>
    </div>
  );
};

export default AdminRegister;
