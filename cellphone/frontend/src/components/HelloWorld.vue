<template>
  <div class="border">
    <input type="text" name="" value="" v-model="msg">
    <input type="button" name="" value="按钮" @click="sendMsg">
  </div>
</template>

<script>
import ReconnectingWebSocket from 'reconnecting-websocket'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      ws: null
    }
  },
  created () {
    this.initWebSocket()
  },
  methods: {
    initWebSocket () {
      this.ws = new ReconnectingWebSocket('ws://nodeapi.zhaopin.com:1357')
      this.ws.onopen = function (e) {
        console.log('connected!')
      }
      this.ws.onmessage = function (e) {
        console.log('recieved!', e.data)
      }
    },
    sendMsg () {
      this.ws.send(this.msg)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{margin: 0;padding: 0;}
  .border{
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    border-top: 1vh solid #f1f1f1;
    border-right: 10vw solid #f1f1f1;
    border-bottom: 10vh solid #f1f1f1;
    border-left: 10vw solid #f1f1f1;
  }
</style>
