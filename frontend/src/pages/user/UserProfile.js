import React, { useEffect, useState } from "react";
import axios from "axios";
import userimg from "../../images/user.png";
import { set_Authentication } from "../../redux/authentication/authenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminFormInput from "../admin/AdminFormInput";

function UserProfile() {
  console.log('im rerendering')
  const [formError, setFormError] = useState([]);
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    profile_pic: "",
  });
  const [message, setMessage] = useState(null);
  const authentication_user = useSelector((state) => state.authentication_user);
  const dispatch = useDispatch();
  console.log("firrrrrrrrrrrrstt", userDetails.profile_pic);

  // const [userProfileDetails, setUserProfileDetails] = useState({
  //   image: null,
  // });
  const inputs = [
    {
      keyId: 1,
      id: "first_name",
      label: "First name",
      placeholder: "Enter the first name . . .",
      type: "text",
      value: userDetails.first_name,
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
      value: userDetails.last_name,
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
      value: userDetails.email,
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
      value: userDetails.phone_number,
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
      // required: true,
    },
  ];

  const baseURL = "http://127.0.0.1:8000";
  const token = localStorage.getItem("access");
  const fetchUserData = async () => {
    try {
      await axios
        .get(baseURL + "/api/accounts/user/details/", {
          headers: {
            authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setUserDetails(res.data);
          console.log(res.data);
        });
    } catch (error) {
      console.log("the error is  :", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    // Update the state based on the input field

    if (type === "file") {
      const file = event.target.files[0];
      console.log("new updated pic222   :", file);
      console.log(file);
      setUserDetails((prevData) => ({
        ...prevData,
        [name]: file,
      }));
      console.log("new updated pic   :", userDetails.profile_pic);
    } else {
      setUserDetails((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userDetails);
    
    let url = baseURL + "/api/accounts/user/details/update";
    axios
      .post(url, userDetails, {
        headers: {
          "Content-type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(
          set_Authentication({
            name: res.data.first_name,
            isAuthenticated: true,
          })
          );
          
          console.log(res);
        if (res.status === 201) {
          setUserDetails((prevData) => ({
            ...prevData,
            profile_pic: baseURL+res.data.profile_pic,
          }));
          console.log('now  :', userDetails.profile_pic);
          setMessage("User updated successfully");
          
        }
      })
      .catch((err) => {
        setFormError(err.res.data);
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line
  }, [authentication_user]);

  return (
    <section style={{ backgroundColor: "" }}>
      <div className="container py-5 ">
        <div className="row">
          <div className="col-md-12 col-sm-12">
          {message && (
            <div
              className="alert alert-primary"
              role="alert"
              data-mdb-color="dark"
            >
              {message}
            </div>
          )}
            <article className="card" style={{ borderRadius: "15px" }}>
              <header className="card-header">
                <div className="col-12 d-flex justify-content-between">
                  <span>
                    <strong className="d-inline-block mr-3">MY PROFILE</strong>
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

                <div className="row p-4">
                  {/* <div className="card"> */}
                  <div className="col-xl-4 col-md-6 col-sm-12 mt-3 justify-content-center">
                    <div className="card-body d-flex justify-content-center">
                      {console.log("from divsss", userDetails.profile_pic)}
                      <img
                        src={
                          userDetails
                            ? userDetails.profile_pic
                              ? userDetails.profile_pic
                              : userimg
                            : userimg
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
                  <div className="col-xl-8 col-md-6 col-sm-12 mt-3">
                    <div className="card d-flex justify-content-center">
                      <div className="card-body justify-content-center">
                        <form onSubmit={handleSubmit} method="POST">
                          <div className="row ps-4">
                            {inputs.map((input) => {
                              return input.name !== "profile_pic" ? (
                                <AdminFormInput
                                  key={input.keyId}
                                  {...input}
                                  value={userDetails[input.name]}
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
                                  Update
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <h4 className="mb-2">{userDetails?.first_name}</h4>
                <p className="text-muted mb-1">
                  {userDetails?.email} <span className="mx-2"></span>{" "}
                </p>
                <p className="text-muted mb-2">
                  {userDetails?.phone_number} <span className="mx-2"></span>{" "}
                </p> */}

                {/* <form onSubmit={handleSubmit}>
                  <input
                    type="file"
                    id="image"
                    accept="image/png, image/jpeg"
                    className="form-control my-2"
                    onChange={handleInputChange}
                    required
                  />

                  <button
                    type="submit"
                    className="btn btn-primary btn-rounded btn-lg"
                  >
                    Update Profile Pic
                  </button>
                </form> */}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
