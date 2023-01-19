import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default class PublicLayout extends Component {
  render() {
    if (!localStorage.getItem("token")) {
      return (
        <>
          <Outlet />
        </>
      );
    }
    return <Navigate to={"/posts"} />;
  }
}
