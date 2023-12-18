import { configureStore } from "@reduxjs/toolkit";
import authenticationSliceReducer from "./authentication/authenticationSlice";
import userBasicDetailsSliceReducer from "./userBasicDetails/userBasicDetailsSlice";

export default configureStore({
  reducer: {
    authentication_user: authenticationSliceReducer,
    user_basic_details: userBasicDetailsSliceReducer,
  },
});
