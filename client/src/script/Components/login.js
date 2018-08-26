import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import axios from "axios";

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLogged: false
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();

    console.log("Login test");

    const loginInputs = document.getElementById("loginForm").elements;
    const username = loginInputs["username"].value;
    const password = loginInputs["password"].value;
    const { users } = this.state;

    users.map((item, index) => {
      if (item.username == username && item.password == password) {
        console.log("Login success");
        this.setState({ isLogged: true });
      }
    });
  }

  fetchUsers() {
    axios.get("/api/get_users").then(res => {
      if (res.status == 200) {
        this.setState({
          users: res.data
        });
      }
    });
  }

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    return (
      <Route
        exact
        path="/"
        render={() =>
          this.state.isLogged ? (
            <Redirect to="/tasks" />
          ) : (
            <div>
              <form
                id="loginForm"
                className="form-group"
                onSubmit={this.handleLogin}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="User"
                  name="username"
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.handleLogin}
                >
                  Login
                </button>
              </form>
            </div>
          )
        }
      />
    );
  }
}

export default Intro;
