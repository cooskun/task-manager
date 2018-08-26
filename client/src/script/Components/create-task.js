import React, { Component } from "react";

class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <form id="form-createTask" action="/api/create_task" method="POST">
        <input type="text" placeholder="Title" name="title" />
        <textarea placeholder="Describe" name="describe" />
        <button type="submit">Create</button>
      </form>
    );
  }
}

export default CreateTask;
