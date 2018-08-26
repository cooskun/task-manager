import React, { Component } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";

import Login from "./Components/login";
import TaskList from "./Components/task-list";
import AddUser from "./Components/add-user";
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
        <div style={{ width: "60%", margin: "0 auto" }}>
          <Link to="/add_user">Add User</Link>

          <Route exact path="/" component={Login} />
          <Route path="/add_user" component={AddUser} />
          <Route path="/tasks" component={TaskList} />
          <Route path="/create_task" component={CreateTask} />
        </div>
      </Router>
    );
  }
}

export default App;
