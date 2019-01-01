# 单独知识点练习
## websocket
### websocket后台nodejs代码
```javascript
// 引入WebSocket模块
var ws = require('nodejs-websocket')
var PORT = 3000

// on就是addListener，添加一个监听事件调用回调函数
// Scream server example:"hi"->"HI!!!",服务器把字母大写
var server = ws.createServer(function(conn){
    console.log('New connection')
    conn.on("text",function(str){
        console.log("Received"+str)
        // conn.sendText(str.toUpperCase()+"!!!") //大写收到的数据
        conn.sendText(str)  //收到直接发回去
    })
    conn.on("close",function(code,reason){
        console.log("connection closed")
    })
    conn.on("error",function(err){
        console.log("handle err")
        console.log(err)
    })
}).listen(PORT)

console.log('websocket server listening on port ' + PORT)
```
### websocket前端代码

```javascript
let oWs = null;
let wsAddress = 'ws://localhost:3000';
let wsStatus = '';
let reconnectTimer = null;
let heartbeatTimer = null;
let isUserClose = false;

function createWs(){
  if ('WebSocket' in window) {
    oWs = new WebSocket(wsAddress);
    oWs.onopen = function(event){
      wsStatus = 'websocket已建立';
      showMessage(wsStatus);
      setTimeout(sendHeartBeat, 2000);
    }

    oWs.onerror = function(event){
      wsStatus = 'websocket发生错误';
      showMessage(wsStatus);
    }

    oWs.onmessage = function(event){
      wsStatus = `收到消息：${JSON.stringify(event.data)}`;
      showMessage(wsStatus);
    }

    oWs.onclose = function(){
      if(isUserClose){
        wsStatus = 'websocket已关闭';
        showMessage(wsStatus);
      } else {
        reconnectTimer = setTimeout(function () {
          if (oWs && (oWs.readyState !== 1)) {
            createWs()
          } else {
            clearTimeout(reconnectTimer)
          }
        }, 1000);
      }
    }
    function sendHeartBeat() {
      const datahb = {type: 'heartbeat'};
      oWs.send(JSON.stringify(datahb));
      heartbeatTimer = setTimeout(sendHeartBeat, 1000);
    }
  } else {
    alert("Your browser do not support WebSocket, please use chrome.")
  }
}

function closeWs(){
  if(oWs){
    oWs.close();
    clearTimeout(heartbeatTimer);
    clearTimeout(reconnectTimer);
  }
  oWs = null;
  heartbeatTimer = null;
  reconnectTimer = null;
}

function showMessage(str){
  document.querySelector("#msg").innerText = str;
}

window.onload = function(){
  let oBtn1 = document.querySelector('#btn1');
  let oBtn2 = document.querySelector('#btn2');

  oBtn1.onclick = function(){
    isUserClose = false;
    createWs();
  };
  oBtn2.onclick = function(){
    isUserClose = true;
    closeWs();
  }
}
```
