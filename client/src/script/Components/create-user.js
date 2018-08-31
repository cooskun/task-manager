import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

import Navigation from "./navigation";

class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      users: [],
      isCreated: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.elCreateForm = this.elCreateForm.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    axios.get("/api/get_users").then(response => {
      this.setState({ users: response.data });
    });
  }

  // Validation process to make sure I have an unique username
  validUsername(username) {
    const { users } = this.state;
    let isValid = true;

    users.map((item, index) => {
      if (item.username == username) {
        isValid = false;
      }
    });

    return isValid;
  }

  // Insert the user to the database
  handleSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;

    if (this.validUsername(username) == false) {
      alert("This username is not available");

      document.forms["form_add_user"]["username"].value = "";
      document.forms["form_add_user"]["password"].value = "";

      return;
    }

    axios
      .post("/api/create_user", {
        username,
        password
      })
      .then(response => {
        alert("The new user has been created");
        this.resetState();
        this.setState({ isCreated: true });
      })
      .catch(error => {
        console.log(error);
      });
  }

  resetState() {
    this.setState({ username: "", password: "" });
  }

  handleChangeUser(e) {
    this.setState({ username: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  elCreateForm() {
    return (
      <div>
        <h1>Create User</h1>
        <form id="form_add_user" onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="form-control mt-2 mb-2"
            placeholder="Username"
            name="username"
            required
            onChange={this.handleChangeUser}
          />
          <input
            type="password"
            className="form-control mt-2 mb-2"
            placeholder="Password"
            name="password"
            required
            onChange={this.handleChangePassword}
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
          path="/create_user"
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

export default CreateUser;
