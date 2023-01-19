import { Component } from "react";
import "./details.css";

export default class Details extends Component {
  render() {
    return (
      <div className="details-content">
        <h1 className="details-title">{localStorage.getItem("details")}</h1>
      </div>
    );
  }
}
