import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import axios from "axios";
import "../../style/app.scss";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLogged: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.loginForm = this.loginForm.bind(this);
  }
  handleLogin(e) {
    e.preventDefault();
    const { users } = this.state;
    const username = document.forms["form_login"]["username"].value;
    const password = document.forms["form_login"]["password"].value;
    let usernames = [];
    users.map(item => {
      usernames.push(item.username);
    });
    if (usernames.includes(username)) {
      users.map(item => {
        if (item.username == username) {
          /* Username is okay. Now check if password is correct */
          // Password is correct
          if (item.password == password) {
            this.setState({ isLogged: true });
          } else {
            alert("Password is wrong");
          }
        }
      });
    } else {
      alert("Username couldn't find");
    }
  }
  fetchUsers() {
    axios.get("/api/get_users").then(res => {
      this.setState({
        users: res.data
      });
    });
  }
  componentDidMount() {
    this.fetchUsers();
  }
  loginForm() {
    return (
      <div className="row justify-content-center">
        <div className="login__wrapper">
          <h1 className="text-center">LOGIN</h1>
          <form
            id="form_login"
            className="login__form"
            onSubmit={this.handleLogin}
          >
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                name="username"
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
              />
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  render() {
    return (
      <Route
        exact
        path="/"
        render={() =>
          this.state.isLogged ? <Redirect to="/dashboard" /> : this.loginForm()
        }
      />
    );
  }
}
export default Login;
