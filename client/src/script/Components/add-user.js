import React, { Component } from "react";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <form id="form-addUser" action="/api/create_user" method="POST">
          <input type="text" placeholder="Username" name="username" />
          <input type="password" placeholder="Password" name="password" />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default AddUser;
