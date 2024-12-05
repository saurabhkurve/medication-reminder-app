import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MedicineSchedule from "./pages/MedicineSchedule";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./Components/Navbar";

const App = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const location = useLocation();
  const showNavbar = location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <>
      {token && showNavbar && <Navbar />}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {token && role === "admin" && <Route path="/admin-dashboard" component={AdminDashboard} />}
        {token && role === "user" && <Route path="/medicine-schedule" component={MedicineSchedule} />}
        <Route
          path="/"
          render={() => (
            token ? (
              <Redirect to={role === "admin" ? "/admin-dashboard" : "/medicine-schedule"} />
            ) : (
              <Redirect to="/login" />
            )
          )}
        />
      </Switch>
    </>
  );
};

export default App;
