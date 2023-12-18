import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function UserHome() {
  const authentication_user = useSelector((state) => state.authentication_user);

  return (
    // <div className="card">
    //   <div className="card-body">
    //     <h4>
    //       {authentication_user.isAuthenticated?<>Welcome Back {authentication_user.name} ! </>:<>Login to edit profile</>}
    //     </h4>
    //   </div>
    // </div>
    <div className="home-bg row h-100 py-4 px-4">
      <div className="col-md-12 mb-4">
        <span className="badge bg-dark p-3 shadow-1-strong mb-3">
          {authentication_user.isAuthenticated ? (
            <>Welcome {authentication_user.name} ! </>
          ) : (
            <>Hello Guest User</>
          )}
        </span>
        <h4>
          <strong>Home Page </strong>
        </h4>
        <p className="text-muted">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          consequatur eligendi quisquam doloremque vero ex debitis veritatis
          placeat unde animi laborum sapiente illo possimus, commodi dignissimos
          obcaecati illum maiores corporis.
        </p>
        {authentication_user.isAuthenticated ? (
          <>
            <Link type="button" className="btn btn-outline-dark" to="/profile">
              Profile !{" "}
            </Link>
          </>
        ) : (
          <>
            <Link type="button" className="btn btn-outline-dark" to="/login">
              {" "}
              Login To Read More{" "}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default UserHome;
