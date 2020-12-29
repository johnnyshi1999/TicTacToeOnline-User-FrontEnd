import io from "socket.io-client"
import API from "./api"

const socket  = {
  connection: null,
  connect: () => {
    this.connection = io.connect(API.url);
    return this.connection;
  },

  emit: (message, data) => {
    if (data) {
      this.connection.emit(message, data);
    }
    else {
      this.connection.emit(message);
    }
  },

  disconnect: () => {
    this.connection.disconnect();
  }
};

export {socket};