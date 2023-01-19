import React, { Component } from "react";
import { Todo } from "../../types/todoObject";
import { TodoDone } from "../../types/todoDone";
import withRouter from "../withRoutr/withRouter";
import Input from "../Input/Input";
import IconButton from "../IconButton/IconButton";
import inProgress from "../../asset/img/inProgress.png";
import done from "../../asset/img/done.png";
import edit from "../../asset/img/edit.png";
import del from "../../asset/img/delete.png";
import "./toDoLIstItem.css";

interface IProps {
  router: {
    navigate: (path: string) => void
  },
  deleteItem: (id: string) => void,
  updateItem: (id: string, data: Todo | TodoDone) => void,
  toggleDone: (id: string) => Promise<TodoDone>,
  getSinglePost: (id: string) => Promise<Todo>,
  title: string,
  details: string,
  doneStyle: string,
  id: string
}

interface IState {
  title: string,
  details: string
}

class ToDoListItem extends Component<IProps, IState> {
  state = {
    title: this.props.title ? this.props.title : "Title",
    details: this.props.details ? this.props.details : "Details",
  };
  

  onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.deleteItem((e.target as HTMLButtonElement).getAttribute("id") || "");
  };
  onUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.updateItem((e.target as HTMLButtonElement).getAttribute("id") || "", {
      title: this.state.title,
      details: this.state.details,
    });
  };
  isDone = (e: React.MouseEvent<HTMLButtonElement>) => {
    const updateDone = (boolData: boolean) => {
      this.props.updateItem((e.target as HTMLButtonElement).getAttribute("id") || "", {
        done: boolData,
      });
    };

    this.props.toggleDone((e.target as HTMLButtonElement).getAttribute("id") || "").then((res) => {
      if (res.done) {
        updateDone(false);
      } else {
        updateDone(true);
      }
    });
  };

  showDetails = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props
      .getSinglePost((e.target as HTMLButtonElement).getAttribute("id") || "")
      .then((res) => {
        localStorage.setItem(
          "details",
          res.details ? res.details : "There are no details"
        );
      })
      .then(() => {
        this.props.router.navigate("/details");
      });
  };

  handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value,
    } as unknown as IState);
  };

  render() {
    const { title, details } = this.state;
    const itemStyle = `todo-item  ${this.props.doneStyle}`;
    const doneIcon = this.props.doneStyle === 'isDone' ? done : inProgress;
    return (
      <li className={itemStyle}>
        <div className="title">
          <Input
            name="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={this.handleInputChanged}
          />
          <Input
            name="details"
            type="text"
            placeholder="Details"
            value={details}
            onChange={this.handleInputChanged}
          />
          <button id={this.props.id} onClick={this.showDetails}>
            reade more
          </button>
        </div>
        <div className="icons">
          <IconButton src={doneIcon} id={this.props.id} onClick={this.isDone} />
          <IconButton src={edit} id={this.props.id} onClick={this.onUpdate} />
          <IconButton src={del} id={this.props.id} onClick={this.onDelete} />
        </div>
      </li>
    );
  }
}

export default withRouter(ToDoListItem);
