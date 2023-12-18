import axios from "axios";
import {jwtDecode} from "jwt-decode";
import signupVector from '../../images/signup_vector.svg'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { set_Authentication } from "../../redux/authentication/authenticationSlice";
import FormInput from "../user/FormInput";

function AdminLogin() {
  const [formError, setFormError] = useState([]);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const baseURL = "http://127.0.0.1:8000";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputs = [
    {
      keyId: 1,
      id: "form1Example13",
      label: "Email ID",
      placeholder: "Enter the email id . . .",
      type: "email",
      name: "email",
      error: "Enter valid email ID !",
      className:
        "input-field-effects input-element form-control form-control-lg",
      required: true,
    },

    {
      keyId: 2,
      id: "form1Example23",
      label: "Password",
      placeholder: "Enter the password . . .",
      type: "password",
      name: "password",
      className: "input-field-effects form-control form-control-lg",
      error: "Enter valid password !",
      // pattern: "^[a-zA-Z0-9!@#$%^&*]{5,10}$",
      required: true,
    },
  ];

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setFormError([]);
    const formData = new FormData();
    formData.append("email", event.target.email.value);
    formData.append("password", event.target.password.value);
    try {
      const res = await axios.post(baseURL + "/api/accounts/login/", formData);
      if (res.status === 200) {
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        dispatch(
          set_Authentication({
            name: jwtDecode(res.data.access).first_name,
            isAuthenticated: true,
            isAdmin: res.data.isAdmin,
          })
        );
        navigate("/admin");
        return res;
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        setFormError(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (formError) {
        console.log("yaHOOOOO");
        setFormError("");
      }
    }, 4000);
    return () => clearTimeout(timerId);
  }, [formError]);


  return (
    <section>
      <h1 className="text-center p-3">Login</h1>
      <div className="container py-5">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src={signupVector} className="img-fluid" alt="Phone " />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form method="POST" onSubmit={handleLoginSubmit}>
              {formError["detail"] && (
                <div className="bg-danger rounded mb-3 py-1 px-2 text-light">
                  {formError["detail"]} !!!
                </div>
              )}
              {inputs.map((input) => {
                return (
                  <FormInput
                    key={input.keyId}
                    {...input}
                    value={values[input.name]}
                    onChange={handleChange}
                  />
                );
              })}

              {/* <!-- Submit button --> */}
              <button
                type="submit"
                className="btn link-effect btn-dark text-light btn-lg btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;
