import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FormInput from "./FormInput";
function UserRegister() {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  console.log(values);

  const inputs = [
    {
      keyId: 1,
      id: "first_name",
      label: "First name",
      placeholder: "Enter the first name . . .",
      type: "text",
      name: "first_name",
      className: "input-field-effects form-control form-control-lg",
      error:
        "First name should not be blank, contain atleast 2 letters and no white spaces allowed, allowed characters: A-Z, a-z",
      required: true,
      pattern: "^[A-Za-z]{2,}$",
    },
    {
      keyId: 2,
      id: "last_name",
      label: "Last name",
      placeholder: "Enter the last name . . .",
      type: "text",
      name: "last_name",
      className: "input-field-effects form-control form-control-lg",
      error: "Allowed characters: A-Z, a-z.",
      required: false,
      pattern: "^[A-Za-z]{0,}$",
    },
    {
      keyId: 3,
      id: "typeEmailX-2",
      label: "Email ID",
      placeholder: "Enter the email id . . .",
      type: "email",
      name: "email",
      error: "Email ID should be valid !",
      className:
        "input-field-effects input-element form-control form-control-lg",
      required: true,
    },

    {
      keyId: 4,
      id: "phone_number",
      label: "Phone number",
      placeholder: "Enter the phone number . . .",
      type: "text",
      name: "phone_number",
      className: "input-field-effects form-control form-control-lg",
      error:
        "Should contain only numbers, no white spaces, no alphabets, no special charecters except '+'.",
      pattern: "^[0-9+]{10,}$",
      required: true,
    },
    {
      keyId: 5,
      id: "typePasswordX-2",
      label: "Password",
      placeholder: "Enter the password . . .",
      type: "password",
      name: "password",
      className: "input-field-effects form-control form-control-lg",
      error:
        "Should be 6-20 characters. Should start with a letter, must contain at least 1 letter, 1 special character, 1 number, no white spaces. [Allowed : A-Z, a-z, 0-9,  !@#$%^&* ]",
      pattern:
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[A-Za-z][a-zA-Z0-9!@#$%^&*]{5,10}$",
      required: true,
    },
  ];
  const [formError, setFormError] = useState([]);
  const navigate = useNavigate();
  const baseURL = "http://127.0.0.1:8000";

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setFormError([]);
    const formData = new FormData();
    formData.append("first_name", event.target.first_name.value);
    formData.append("last_name", event.target.last_name.value);
    formData.append("email", event.target.email.value);
    formData.append("password", event.target.password.value);
    formData.append("phone_number", event.target.phone_number.value);

    try {
      const res = await axios.post(
        baseURL + "/api/accounts/register/",
        formData
      );
      if (res.status === 201) {
        navigate("/login", {
          state: res.data.Message,
        });
        return res;
      }
    } catch (error) {
      if (error.response.status === 406) {
        console.log("error");
        console.log(error.response.data);
        setFormError(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <section className="reg-bg">
      <div className="container py-5 ">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card input-effects"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body px-5">
                <h3 className="mb-5 text-center">Register Now</h3>
                <form onSubmit={handleRegisterSubmit} method="POST">
                  {/* <form onSubmit={handleSubmit} method="POST"> */}
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

                  <button
                    className="submit-btn btn link-effect btn-dark input-field-effects"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>

                <ul className="text-danger">
                  {Object.keys(formError).map((key) =>
                    formError[key].map((message, index) => (
                      <li key={`${key}_${index}`}>{message}</li>
                    ))
                  )}
                </ul>

                <hr className="my-4" />

                <Link className="link-effect" to="/login">
                  Already Have an account?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserRegister;






