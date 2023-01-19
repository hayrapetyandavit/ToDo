import { Component } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./addToDoItem.css";

interface IProps {
  addItem: (title: string, details:string) => void
}

interface IState {
  title: string,
  details: string
}

class AddToDoItem extends Component<IProps, IState> {
  state = {
    title: "",
    details: "",
  };

  onSubmit = () => {
    if (this.state.title || this.state.details) {
      this.props.addItem(this.state.title, this.state.details);
    }
    this.setState({
      title: "",
      details: "",
    });
  };

  handleInputChanged = (e:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value,
    } as unknown as IState);
  };

  render() {
    const { title, details } = this.state;
    return (
      <div className="add-item__container">
        <Input
          name="title"
          type="text"
          placeholder="Enter To Do's Title"
          value={title}
          onChange={this.handleInputChanged}
        />
        <Input
          name="details"
          type="text"
          placeholder="Enter To Do's Details"
          value={details}
          onChange={this.handleInputChanged}
        />
        <Button value="Add" onClick={this.onSubmit} />
      </div>
    );
  }
}

export default AddToDoItem;