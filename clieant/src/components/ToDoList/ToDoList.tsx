import { Component } from "react";
import serviceData from "../../services/Data";
import AddToDoItem from "../AddToDoItem/AddToDoItem";
import ToDoListItem from "../ToDoListItem/ToDoListItem";
import { Todo } from "../../types/todoObject";
import "./toDoList.css";

interface IState {
  todos: Todo[]
}

export default class ToDoList extends Component<{}, IState> {
  state = {
    todos: [],
  };

  componentDidMount() {
    this.createElements();
  }
  componentDidUpdate() {
    this.createElements();
  }

  addItem = (title: string, details: string) => {
    serviceData
      .createPost({
        title,
        details,
      })
      .catch((error) => console.error(error));
  };
  updateItem = (id: string, data: Todo) => {
    serviceData.updatePost(id, data).catch((error) => console.error(error));
  };
  deleteItem = (id: string) => {
    serviceData.deletePost(id).catch((error) => console.error(error));
  };

  createElements = () => {
    serviceData
      .getAllPosts()
      .then((data) => {
        this.setState({
          todos: data
        });
      })
      .catch((error) => console.error(error));
  };

  render() {
    const elements = this.state.todos.map((todo: Todo) => {
      const doneStyle = todo.done ? "isDone" : "notDone";
      return (
        <ToDoListItem
          key={todo.id}
          {...todo}
          doneStyle={doneStyle}
          updateItem={this.updateItem}
          deleteItem={this.deleteItem}
          toggleDone={serviceData.toggleDone}
          getSinglePost={serviceData.getSinglePost}
        />
      );
    })
    return (
      <div className="list__container">
        <AddToDoItem addItem={this.addItem} />
        <ul className="show-list">{elements}</ul>
      </div>
    );
  }
}
