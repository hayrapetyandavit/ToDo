import { Component } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Header from "../components/Header/Header";

export default class AuthLayout extends Component {
  render() {
    if (localStorage.getItem("token")) {
      return (
        <>
          <Header />
          <Outlet />
        </>
      );
    }
    return <Navigate to={"/login"} />;
  }
}
