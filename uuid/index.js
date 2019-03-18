const http = require('http');
const WebSocket = require('ws').Server;
const uuid = require('uuid');
let wss = new WebSocket({port: 1357});

let connectionList = [];
wss.on('connection', (ws) => {
  let client_uuid = uuid.v4();
  connectionList.push({"uuid": client_uuid, "ws": ws});
  ws.onmessage = function(e){
    console.log(connectionList.length)
    connectionList.forEach((item) => {
      item.ws.send(e.data);
    })
  }
  ws.on('close', () => {
    connectionList = connectionList.filter((item) => {
      return item.uuid !== client_uuid;
    })
  })
})
