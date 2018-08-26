import React, { Component } from "react";

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="list-group-item">
        <h2 className="h4">{this.props.task.title}</h2>
        <div>{this.props.task.describe}</div>
      </div>
    );
  }
}

export default Task;
