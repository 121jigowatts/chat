import React from "react";
import socketClient from "socket.io-client";

const server = "http://localhost:3000";
const socket = socketClient(server);

class Logs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { logs: [] };
  }
  componentDidMount() {
    socket.on("chatMessage", (msg) => {
      console.log(msg);
      const editlogs = [...this.state.logs, msg];
      console.log(editlogs);
      this.setState({ logs: editlogs });
    });
  }

  render() {
    return (
      <div>
        {this.state.logs.map((log, index) => {
          return (
            <div key={index}>
              <div>
                <label>
                  {log.name}:{log.message}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Logs;
