import React, { Component } from "react";

import TaskList from "./task-list";
import Navigation from "./navigation";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Navigation />
        <TaskList />
      </React.Fragment>
    );
  }
}

export default Dashboard;
