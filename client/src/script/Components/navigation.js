import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="row pt-3 pb-3">
          <ul className="nav col">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <Link to="/dashboard">Tasks</Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <Link to="/users">Users</Link>
              </a>
            </li>
          </ul>
          <div className="col-4 nav__side--right">
            <Link to="/create_task">
              <button className="btn btn-primary">Create New Task</button>
            </Link>
            <Link to="/create_user">
              <button className="btn btn-primary">Create New User</button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Navigation;
