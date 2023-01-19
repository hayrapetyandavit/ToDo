import { Component } from "react";
import "./input.css";

interface IProps extends React.HTMLProps<HTMLInputElement> { }

class Input extends Component<IProps> {
  render() {
    const { label, ...rest } = this.props;
    return (
      <>
        <label htmlFor={rest.name}>{label}</label>
        <input
          {...rest}
        />
      </>
    );
  }
}

export default Input;
