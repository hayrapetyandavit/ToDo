import { Component } from "react";
import withRouter from "../withRoutr/withRouter";
import "./header.css";

interface IProps {
  router: {
    navigate: (path: string) => void
  }
}

class Header extends Component<IProps> {
  handleClick = () => {
    localStorage.clear();
    this.props.router.navigate("/");
  };

  render() {
    let name = localStorage.getItem("name");
    return (
      <div className="header">
        <h2>
          Hello <span>{name}</span>!
        </h2>
        <button className="button logout-btn" onClick={this.handleClick}>
          Log Out
        </button>
      </div>
    );
  }
}

export default withRouter(Header);
