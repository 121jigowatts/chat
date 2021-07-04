import logo from "./logo.svg";
import "./App.css";
import socketClient from "socket.io-client";
import Chat from "./component/Chat";
import Logs from "./component/Logs";

const server = "http://localhost:3000";

function App() {
  const socket = socketClient(server);
  socket.on("connection", () => {
    console.log(`I'm connected with the backend.`);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Logs />
      <Chat />
    </div>
  );
}

export default App;
