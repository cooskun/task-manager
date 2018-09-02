import React, { Component } from "react";
import axios from "axios";

import store from "../store";
class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: this.props.user.status
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { _id } = this.props.user;

    // // axios.delete(`/api/delete_user/${username}`);
    axios.delete(`/api/delete_user/${_id}`);
    console.log(_id);
  }

  render() {
    const { status } = store.getState().user;

    return (
      <div className="user-item">
        <span className="user-item__username">{this.props.user.username}</span>
        {/* Admin is not able to be delete. If the user is not admin, attach a delete button */}
        {this.state.status != "admin" ? (
          <span className="user-item__button">
            {status == "admin" && (
              <button className="btn btn-danger" onClick={this.handleDelete}>
                Delete
              </button>
            )}
          </span>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default User;
