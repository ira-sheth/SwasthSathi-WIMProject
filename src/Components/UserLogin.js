import React, { useState, useEffect } from "react";
import loginstyle from "../Styles/Login.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import {app} from "../firebaseConfig"
import {getAuth, signInWithEmailAndPassword, signInWithPopup,GoogleAuthProvider} from "firebase/auth";

const UserLogin = ({ setUserState }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const googleProvider= new GoogleAuthProvider();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
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
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    signInWithEmailAndPassword(auth,user.email,user.password)
    .then((userCredential) => {
      const user = userCredential.user;
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Sign In Successful',
        showConfirmButton: false,
        timer: 3500
      })
      
      navigate('/');
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Invalid Credentials!")
      // ..
    });
  };

  const GoogleAuthentication =(e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    signInWithPopup(auth, googleProvider)
  .then((result) => {
    console.log(result.user)
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Sign In Successful',
      showConfirmButton: false,
      timer: 1500
    })
    navigate('/appointmentForm')
  }).catch((error) => {
    alert(error.message) 
  });

  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
      // axios.post("", user).then((res) => {
      //   // backend db url
      //   alert(res.data.message);
      //   setUserState(res.data.user);
      //   navigate("/user-profile", { replace: true });
      // });
    }
  }, [formErrors]);
  return (
    <div className={loginstyle.container}>
      <div className={loginstyle.login}>
        <form>
          <h1 style={{ margin: "10px" }}>Login</h1>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={changeHandler}
            value={user.email}
          />
          <p className={loginstyle.error}>{formErrors.email}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={user.password}
          />
          <p className={loginstyle.error}>{formErrors.password}</p>
          <button className={loginstyle.button_common} onClick={loginHandler}>
            Login
          </button>
          <button className="google-signup-button" onClick={GoogleAuthentication}>
          <img style={{borderRadius:"50%"}} src="data:image/png;base64,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"/>
            Sign In With Google
          </button>
        </form>
        <NavLink to="/user-register">Not yet registered? Register Now</NavLink>
      </div>
    </div>
  );
};
export default UserLogin;
