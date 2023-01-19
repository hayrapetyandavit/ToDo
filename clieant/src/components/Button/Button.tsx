import { Component } from "react";
import "./button.css";

interface IProps {
  value: string,
  onClick: () => void
}

export default class Button extends Component<IProps>{
  render() {
    const { value, onClick } = this.props;
    return (
      <>
        <button
          className="button"
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          {value}
        </button>
      </>
    );
  }
}
