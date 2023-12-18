import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AdminPrivateRoute from "../AdminPrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { set_Authentication } from "../../redux/authentication/authenticationSlice";
import { set_user_basic_details } from "../../redux/userBasicDetails/userBasicDetailsSlice";
import axios from "axios";
import isAuthAdmin from "../../utils/isAuthAdmin";
import AdminFooter from "./AdminFooter";
import AdminUpdateUser from "../../pages/admin/AdminUpdateUser";
import AdminCreateUser from "../../pages/admin/AdminCreateUser";
import AdminHome from "../../pages/admin/AdminHome";
import AdminLogin from "../../pages/admin/AdminLogin";
import AdminHeader from "./AdminHeader";

function AdminWrapper() {
  const dispatch = useDispatch();
  const authentication_user = useSelector((state) => state.authentication_user);

  const baseURL = "http://127.0.0.1:8000";
  const token = localStorage.getItem("access");

  const checkAuthAndFetchUserData = async () => {
    try {
      const isAuthenticated = await isAuthAdmin();
      dispatch(
        set_Authentication({
          name: isAuthenticated.name,
          isAuthenticated: isAuthenticated.isAuthenticated,
          isAdmin: isAuthenticated.isAdmin,
        })
      );

      if (isAuthenticated.isAuthenticated) {
        const res = await axios.get(baseURL + "/api/accounts/user/details/", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        console.log('the user response is', res);

        dispatch(
          set_user_basic_details({
            name: res.data.first_name,
            profile_pic: res.data.profile_pic,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!authentication_user.name) {
      checkAuthAndFetchUserData();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AdminHeader />
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route
          path="/"
          element={
            <AdminPrivateRoute>
              <AdminHome />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/user/create"
          element={
            <AdminPrivateRoute>
              <AdminCreateUser />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/user/update/:id"
          element={
            <AdminPrivateRoute>
              <AdminUpdateUser />
            </AdminPrivateRoute>
          }
        />
      </Routes>
      <AdminFooter />
    </>
  );
}

export default AdminWrapper;
