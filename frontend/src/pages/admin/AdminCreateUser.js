import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../user/FormInput";

function AdminCreateUser() {
  const navigate = useNavigate();
  const [formError, setFormError] = useState([]);
  const baseURL = "http://127.0.0.1:8000";
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    profile_pic: "",
    is_active: ""
  });

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
    {
      keyId: 6,
      id: "profile_pic",
      label: "Profile image",
      placeholder: "Select file . . .",
      type: "file",
      name: "profile_pic",
      className: "input-field-effects form-control form-control-lg",
      error: "Only image accepted !",
      accept: ".jpg, .jpeg, .png",
      required: true,
    },

    {
      keyId: 7,
      id: "is_active",
      label: "Is active",
      type: "checkbox",
      name: "is_active",
      className: "mx-3 my-3",
    },
  ];

  const handleInputChange = (event) => {
    const isFile = event.target.files;
    console.log("here reacheddddd", isFile);
    if (isFile) {
      const file = event.target.files[0];
      setFormData({
        ...formData,
        profile_pic: file,
      });
    } else {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { profile_pic, ...userData } = formData;
    console.log("the pic is   :", userData.profile_pic);
    const userDataWithProfilePic = new FormData();

    userDataWithProfilePic.append("profile_pic", profile_pic);

    Object.keys(userData).forEach((key) => {
      userDataWithProfilePic.append(key, userData[key]);
    });
    console.log("the form data  :");
    for (const pair of userDataWithProfilePic.entries()) {
      console.log(pair[0], " : ", pair[1]);
    }

    axios
      .post(baseURL + "/api/accounts/admin/users/", userDataWithProfilePic, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        navigate("/admin");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        if (error.response.status === 400) {
          setFormError(error.response.data);
        } else {
          console.log(error);
        }
      });
  };

  return (
    <section style={{ backgroundColor: "#508bfc" }}>
      <div className="container py-5 ">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 ">
                <h3 className="mb-5 text-center">Create New User</h3>
                <form onSubmit={handleSubmit} method="POST">
                  {inputs.map((input) => {
                    return (
                      input.keyId !== 6 ? 
                      <FormInput
                        key={input.keyId}
                        {...input}
                        value={formData[input.name]}
                        onChange={handleInputChange}
                      />
                      :
                      <FormInput
                        key={input.keyId}
                        {...input}
                        onChange={handleInputChange}
                      />
                    );
                  })}

                
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Create Now
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminCreateUser;
