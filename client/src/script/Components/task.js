import React, { Component } from "react";
import axios from "axios";

import store from "../store";
class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isComplete: false,
      isEditing: false
    };

    this.handleComplete = this.handleComplete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  resetState() {
    this.setState({
      isComplete: false,
      isEditing: false
    });
  }

  toggleEdit() {
    this.setState(prevState => {
      return { isEditing: !prevState.isEditing };
    });
  }

  handleComplete(e) {
    this.setState(prevState => {
      return { isComplete: !prevState.isComplete };
    });
  }

  handleDelete(e) {
    const { _id } = this.props.task;
    axios.delete(`/api/delete_task/${_id}`);
    this.resetState();
  }

  handleUpdate(e) {
    e.preventDefault();

    const { _id } = this.props.task;
    const title = e.target.elements["title"].value;

    axios.put(`/api/update_task/${_id}`, { title });
    this.toggleEdit();
  }

  render() {
    const status = store.getState().user.status;

    return (
      <div
        className={`task-item list-group-item ${
          this.state.isComplete ? "bg-success" : ""
        }`}
      >
        {this.state.isEditing ? (
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
            <button className="btn btn-primary" onClick={this.handleComplete}>
              Complete
            </button>
            {status == "admin" && (
              <button className="btn btn-warning" onClick={this.toggleEdit}>
                Edit
              </button>
            )}
            {status == "admin" &&
              this.state.isComplete && (
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
