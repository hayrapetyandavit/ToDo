import { Component } from "react";
import { Link } from "react-router-dom";
import main from "../../asset/img/main.png";
import login from "../../asset/img/login.png";
import register from "../../asset/img/register.png";

import "./mainPage.css";

export default class MainPage extends Component {
  render() {
    return (
      <>
        <div className="main-page__container">
          <img className="main__image" src={main} alt="Main illustration" />
          <Link to="/login">
            <img className="main__login" src={login} alt="" />
          </Link>
          <Link to="/register">
            <img className="main__register" src={register} alt="" />
          </Link>
        </div>
      </>
    );
  }
}
