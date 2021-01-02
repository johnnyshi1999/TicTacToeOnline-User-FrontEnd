import openSocket from 'socket.io-client';
import API from "./api"

const socket  = openSocket(API.url);

export default socket;