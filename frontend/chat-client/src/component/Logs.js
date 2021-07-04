import React from "react";
import socketClient from "socket.io-client";
import "./Logs.css";

const server = "http://localhost:3000";
const socket = socketClient(server);

class Logs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { logs: [] };
    this.ref = React.createRef();
  }
  componentDidMount() {
    socket.on("chatMessage", (msg) => {
      console.log(msg);
      const editlogs = [...this.state.logs, msg];
      console.log(editlogs);
      this.setState({ logs: editlogs });
      this.scrollToBottom();
    });
  }

  scrollToBottom = () => {
    this.ref.current.scrollIntoView();
  };

  render() {
    return (
      <div className="logs">
        {this.state.logs.map((log, index) => {
          return (
            <div key={index}>
              <div>
                <label>
                  {log.name}({log.dateTime}):{log.message}
                </label>
              </div>
            </div>
          );
        })}
        <div id="end-of-messages" ref={this.ref}></div>
      </div>
    );
  }
}

export default Logs;
