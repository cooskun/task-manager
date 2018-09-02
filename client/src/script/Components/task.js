import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import store from "../store";

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.task,
      isCompleted: this.props.task.isCompleted,
      isEditing: false
    };

    this.handleComplete = this.handleComplete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
  }

  resetState() {
    this.setState({
      task: this.props.task,
      isCompleted: this.props.task.isCompleted,
      isEditing: false
    });
  }

  toggleEdit() {
    this.setState(prevState => {
      return { isEditing: !prevState.isEditing };
    });
  }

  toggleComplete() {
    this.setState(prevState => {
      return { isCompleted: !prevState.isCompleted };
    });

    setTimeout(this.handleComplete, 1000);
  }

  handleComplete(e) {
    const { _id, title } = this.state.task;
    const { isCompleted } = this.state;

    axios.put(`/api/update_task/${_id}`, { title, isCompleted });
  }

  handleDelete(e) {
    const { _id } = this.state.task;
    axios.delete(`/api/delete_task/${_id}`);
    this.resetState();
  }

  handleUpdate(e) {
    e.preventDefault();

    const title = e.target.elements["title"].value;
    const { _id } = this.state.task;
    const { isCompleted } = this.state;

    axios.put(`/api/update_task/${_id}`, { title, isCompleted });
    this.toggleEdit();
  }

  render() {
    const status = store.getState().user.status;
    const { isCompleted } = this.state;
    const { isEditing } = this.state;

    return (
      <div
        className={`task-item list-group-item ${
          isCompleted ? "bg-success" : ""
        }`}
      >
        {isEditing ? (
          <form id="form_update_task" onSubmit={this.handleUpdate}>
            <input
              className="form-control mb-2"
              name="title"
              placeholder={this.props.task.title}
              required
            />
            <button className="btn btn-success">Done</button>
            <button className="btn btn-danger" onClick={this.toggleEdit}>
              Cancel
            </button>
          </form>
        ) : (
          <React.Fragment>
            <h2 className="h5">{this.props.task.title}</h2>
            <button className="btn btn-primary" onClick={this.toggleComplete}>
              Complete
            </button>
            {status == "admin" && (
              <button className="btn btn-warning" onClick={this.toggleEdit}>
                Edit
              </button>
            )}
            {status == "admin" &&
              this.state.isCompleted && (
                <button className="btn btn-danger" onClick={this.handleDelete}>
                  Delete
                </button>
              )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Task;
