import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import Navigation from "./navigation";
class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      isCreated: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.elCreateForm = this.elCreateForm.bind(this);
  }
  handleChange(e) {
    this.setState({
      title: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { title } = this.state;
    axios.post("/api/create_task", { title }).then(response => {
      this.setState({ isCreated: true });
      alert("New task has been created");
    });
  }
  elCreateForm() {
    return (
      <div>
        <h1>Create Task</h1>
        <form id="form_create_task" onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="form-control mt-2 mb-2"
            placeholder="Title"
            name="title"
            required
            onChange={this.handleChange}
          />
          <button className="btn btn-primary" type="submit">
            Create
          </button>
        </form>
      </div>
    );
  }
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Route
          exact
          path="/create_task"
          render={() => {
            return this.state.isCreated ? (
              <Redirect to="/tasks" />
            ) : (
              this.elCreateForm()
            );
          }}
        />
      </React.Fragment>
    );
  }
}
export default CreateTask;
