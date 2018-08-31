import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Task from "./task";
import CreateUser from "./create-user.js";
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }
  fetchTasks() {
    axios.get("/api/get_tasks").then(res => {
      this.setState({
        tasks: res.data
      });
    });
  }
  componentDidMount() {
    this.fetchTasks();
  }
  componentDidUpdate() {
    this.fetchTasks();
  }
  render() {
    return (
      <React.Fragment>
        <h1>Tasks</h1>
        <div className="list-group">
          {this.state.tasks.map((item, index) => {
            return <Task task={item} key={`task-${index}`} />;
          })}
        </div>
      </React.Fragment>
    );
  }
}
export default TaskList;
