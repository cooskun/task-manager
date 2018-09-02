import React, { Component } from "react";
import axios from "axios";
import Task from "./task";

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    };
  }

  fetchTasks() {
    axios.get("/api/get_tasks").then(res => {
      this.setState({ tasks: res.data });
    });
  }

  componentDidMount() {
    this.fetchTasks();
  }

  componentDidUpdate() {
    this.fetchTasks();
  }

  render() {
    const { tasks } = this.state;

    return (
      <React.Fragment>
        <h1>Tasks</h1>
        <div className="list-group">
          {tasks.map(item => {
            return <Task task={item} key={item.id} />;
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default TaskList;
