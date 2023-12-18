import React from "react";
import { Link, useNavigate } from "react-router-dom";
import userimg from "../../images/user.png";
import { useDispatch, useSelector } from "react-redux";
import { set_Authentication } from "../../redux/authentication/authenticationSlice";

function AdminHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authentication_user = useSelector((state) => state.authentication_user);
  const is_authenticated = useSelector(
    (state) => state.authentication_user.isAuthenticated
  );
  const user_basic_details = useSelector((state) => state.user_basic_details);
  const logout = () => {
    localStorage.clear();
    dispatch(
      set_Authentication({
        name: null,
        isAuthenticated: false,
        isAdmin: false,
      })
    );
    navigate("/admin/login");
  };

  return (
    // <!-- Navbar -->
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* <!-- Container wrapper --> */}
      <div className="container-fluid">
        {/* <!-- Toggle button --> */}
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* <!-- Collapsible wrapper --> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* <!-- Navbar brand --> */}
          <Link className="navbar-brand mt-2 mt-lg-0" to="/admin">
            <h5>{!is_authenticated ? 'Admin' : authentication_user.name}</h5>
          </Link>
          {/* //  <!-- Left links --> */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"></li>
          </ul>
          {/* <!-- Left links --> */}
        </div>
        {/* <!-- Collapsible wrapper --> */}

        {/* <!-- Right elements --> */}
        <div className="d-flex align-items-center">
          {/* <!-- Notifications --> */}

          {/* <!-- Avatar --> */}
          <div className="dropdown">
            <Link
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="#"
              id="navbarDropdownMenuAvatar"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false">
              <img
                src={
                  authentication_user.isAuthenticated &&
                  user_basic_details.profile_pic
                    ? user_basic_details.profile_pic
                    : userimg
                }
                className="rounded-circle"
                style={
                  {height: '25px',
                  width: '25px',
                  objectFit: 'cover'
              }}
                alt="Black and White Portrait of Link Man"
                loading="lazy"
              />
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuAvatar"
            >
              <li>
                <Link className="dropdown-item" to="/profile">
                  My profile
                </Link>
              </li>

              <li>
                {!authentication_user.isAuthenticated ? (
                  <Link className="dropdown-item" to="/admin/login">
                    Login
                  </Link>
                ) : (
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                )}
              </li>

              {/*  <li>
                <Link className="dropdown-item" href="#">Logout</Link>
              </li> */}
            </ul>
          </div>
        </div>
        {/* <!-- Right elements --> */}
      </div>
      {/* <!-- Container wrapper -->// */}
    </nav>
    // <!-- Navbar -->
  );
}

export default AdminHeader;
