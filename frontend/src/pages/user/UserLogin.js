import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import loginimg from "../../images/login-vector.jpg";
import { useDispatch } from "react-redux";
import { set_Authentication } from "../../redux/authentication/authenticationSlice";
import { jwtDecode } from "jwt-decode";
import FormInput from "./FormInput";

function UserLogin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { state } = useLocation();
  const [message, setmessage] = useState(null);
  const [formError, setFormError] = useState([]);
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
      pattern: "^[a-zA-Z0-9!@#$%^&*]{5,10}$",
      required: true,
    },
  ];

  useEffect(() => {
    if (state) {
      setmessage(state);
    }

    navigate("", {});
  }, [state, navigate]);

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
        console.log(res.data);
        dispatch(
          set_Authentication({
            name: jwtDecode(res.data.access).first_name,
            isAuthenticated: true,
            isAdmin: res.data.isAdmin,
          })
        );
        navigate("/");
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
        setFormError('');
      }
    }, 4000);
    return () => clearTimeout(timerId);
  }, [formError]);

  return (
    <section className="login-bg">
      <div className="container py-5">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-8 col-lg-7 col-xl-6">
            {console.log("the message is :", message)}
            {message && (
              <div
                className="alert alert-primary"
                role="alert"
                data-mdb-color="dark"
              >
                {message}
              </div>
            )}

            <img src={loginimg} className="img-fluid" alt="Phone " />
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

              {/* <!-- Email input --> */}

              <div className="d-flex justify-content-around align-items-center mb-4">
                <Link className="link-effect text-dark" to="/register">
                  Not Have Account?
                </Link>
              </div>

              {/* <!-- Submit button --> */}
              <button
                type="submit"
                className="btn btn-dark text-light link-effect btn-lg btn-block"
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

export default UserLogin;
