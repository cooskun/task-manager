import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import User from "./user";
import Navigation from "./navigation";
class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
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
  componentDidUpdate() {
    this.fetchUsers();
  }
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <h1>Users</h1>
        <ul class="list-group">
          {this.state.users.map((item, index) => {
            return (
              <li key={item._id} className="list-group-item">
                <User user={item} />
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}
export default UserList;
