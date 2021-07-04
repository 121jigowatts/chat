import { div } from "prelude-ls";
import React, { Component } from "react";
import socketClient from "socket.io-client";
import "./Chat.css";

const server = "http://localhost:3000";
const socket = socketClient(server);

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      message: "",
      dateTime: "",
    };
  }

  handleNameChanged = (event) => {
    console.log(event);
    this.setState({ name: event.target.value });
  };

  handleMessageChanged = (event) => {
    console.log(event);
    this.setState({ message: event.target.value });
  };

  handleSend = () => {
    console.log("state:", this.state);
    socket.emit("chatMessage", {
      name: this.state.name,
      message: this.state.message,
      dateTime: new Date().toLocaleTimeString(),
    });
    this.setState({ message: "" });
  };

  render() {
    return (
      <div className="sender">
        <div>
          <label>Name:</label>
          <input
            value={this.state.name}
            onChange={(event) => this.handleNameChanged(event)}
          />
        </div>
        <div>
          <label>Message:</label>
          <input
            value={this.state.message}
            onChange={(event) => this.handleMessageChanged(event)}
          />
        </div>
        <div>
          <button onClick={this.handleSend}>Send</button>
        </div>
      </div>
    );
  }
}

export default Chat;
