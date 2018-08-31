import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
// Components
import Login from "./Components/login";
import UserList from "./Components/user-list";
import Dashboard from "./Components/dashboard";
import CreateUser from "./Components/create-user";
import CreateTask from "./Components/create-task";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false
    };
  }
  render() {
    return (
      <Router>
        <div className="container">
          <Route
            exact
            path="/"
            component={this.state.isLogged ? Dashboard : Login}
          />
          <Route path="/login" component={Login} />
          <Route path="/users" component={UserList} />
          <Route path="/tasks" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/create_user" component={CreateUser} />
          <Route path="/create_task" component={CreateTask} />
        </div>
      </Router>
    );
  }
}
export default App;
