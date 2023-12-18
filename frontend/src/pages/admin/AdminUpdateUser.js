import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import userimg from "../../images/user.png";
import AdminFormInput from "./AdminFormInput";

function AdminUpdateUser() {
  const navigate = useNavigate();

  const baseURL = "http://127.0.0.1:8000";
  const { id } = useParams();
  const [formError, setFormError] = useState([]);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    profile_pic: "",
    is_active: true,
  });

  const inputs = [
    {
      keyId: 1,
      id: "first_name",
      label: "First name",
      placeholder: "Enter the first name . . .",
      type: "text",
      value: userData.first_name,
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
      value: userData.last_name,
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
      value: userData.email,
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
      value: userData.phone_number,
      className: "input-field-effects form-control form-control-lg",
      error:
        "Should contain only numbers, no white spaces, no alphabets, no special charecters except '+'.",
      pattern: "^[0-9+]{10,}$",
      required: true,
    },
    {
      keyId: 5,
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
      keyId: 6,
      id: "is_active",
      label: "Is active",
      type: "checkbox",
      name: "is_active",
      value: userData.is_active,
      className: "mx-3 my-3",
      checked: userData.is_active,
    },
  ];

  useEffect(() => {
    // Fetch user details by ID when component mounts
    axios
      .get(baseURL + `/api/accounts/admin/users/${id}/`)
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        navigate("/admin");
      });
  }, [id, navigate]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    // Update the state based on the input field
    if (type === "checkbox") {
      setUserData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (type === "file") {
      console.log("kkkkkkkkkkkkkkkkkkkk");
      const file = event.target.files[0];
      console.log(file);
      setUserData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
      console.log("new updated pic   :", userData.profile_pic);
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDelete = () => {
    axios
      .delete(baseURL + `/api/accounts/admin/users/delete/${id}/`)
      .then((response) => {
        navigate("/admin");
        // Optionally, perform any necessary state updates or redirects
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send updated user data to backend
    axios
      .put(baseURL + `/api/accounts/admin/users/update/${id}/`, userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        navigate("/admin");
        // Redirect to user list or other appropriate page
      })
      .catch((error) => {
        setFormError(error.response.data);

        console.error("Error updating user:", error.response.data);
      });
  };

  return (
    <section style={{ backgroundColor: "" }}>
      <div className="container py-5 ">
        <div className="row">
          <main className="col-md-12 col-sm-12">
            <article className="card">
              <header className="card-header">
                <div className="col-12 d-flex justify-content-between">
                  <span>
                    <strong className="d-inline-block mr-3">
                      UPDATE USER : (
                      <span className="text-danger">
                        {userData.first_name} {userData.last_name}
                      </span>
                      )
                    </strong>
                  </span>
                </div>
              </header>
              
              <div className="card-body">
                {Object.keys(formError).map((key) =>
                  formError[key].map((message, index) => (
                    <div
                      className="text-light rounded px-5 py-2 mb-4 bg-danger"
                      key={`${key}_${index}`}
                    >
                      <strong>Error in {key} : </strong>
                      <small>{message}</small>
                    </div>
                  ))
                )}

                <div className="row">
                  <div className="col-xl-4 col-md-6 col-sm-12 mt-3 justify-content-center">
                    <div className="d-flex justify-content-center">
                      <img
                        src={
                          userData.profile_pic ? userData.profile_pic : userimg
                        }
                        className="rounded-circle"
                        alt=""
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-8 col-md-6 col-sm-12 ">
                    <div className="container">
                      <form onSubmit={handleSubmit} method="POST">
                        <div className="row">
                          {inputs.map((input) => {
                            return input.name !== "profile_pic" ? (
                              <AdminFormInput
                                key={input.keyId}
                                {...input}
                                value={userData[input.name]}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <AdminFormInput
                                key={input.keyId}
                                {...input}
                                onChange={handleInputChange}
                              />
                            );
                          })}
                        </div>
                        <div className="card-footer p-3">
                          <div className="row ">
                            <div className="col-xl-6 col-md-6 py-4 px-0 col-sm-12">
                              <button
                                className="btn btn-primary my-2 me-4 "
                                type="submit"
                              >
                                Update User
                              </button>
                              <button
                                className="btn btn-danger my-2"
                                type="button"
                                onClick={handleDelete}
                              >
                                Delete User
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                      <hr className="my-4" />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </main>
        </div>
      </div>
    </section>
  );
}

export default AdminUpdateUser;
