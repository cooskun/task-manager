import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      if (res.status == 200) {
        this.setState({
          tasks: res.data
        });
      }
    });
  }

  componentDidMount() {
    this.fetchTasks();
  }

  render() {
    return (
      <div className="list-group">
        {this.state.tasks.map((item, index) => {
          return <Task task={item} key={`task-${index}`} />;
        })}

        <Link to="/create_task">
          <button className="btn btn-primary">New Task</button>
        </Link>
      </div>
    );
  }
}

export default TaskList;
