const socket = new WebSocket("ws://localhost:8080/ws");

function connect(cb: (msg: string) => void) {
  console.log("Attempting Connection...");

  socket.onopen = () => {
    console.log("Successfully Connected");
  };

  socket.onmessage = (msg) => {
    console.log(msg);
    cb(msg.data);
  };

  socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
  };

  socket.onerror = error => {
    console.log("Socket Error: ", error);
  };
}

function send(msg: string) {
  console.log("sending msg: ", msg);
  socket.send(msg);
}

export { connect, send };