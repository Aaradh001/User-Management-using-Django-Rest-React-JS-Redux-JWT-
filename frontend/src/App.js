import "./App.css";
// import LoginPage from "./pages/LoginPage";
// import HomePage from "./pages/HomePage";
import { Provider } from "react-redux";
import userStore from "./redux/userStore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserWrapper from "./components/user/UserWrapper";
import AdminWrapper from "./components/admin/AdminWrapper";
// import Header from "./pages/Header";
// import { PrivateRoute } from "./utils/PrivateRoute";

function App() {
  return (
    <Router>
      <Provider store={userStore}>
        <Routes>
          <Route path="/*" element={<UserWrapper />}></Route>

          <Route path="admin/*" element={<AdminWrapper />}></Route>
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
