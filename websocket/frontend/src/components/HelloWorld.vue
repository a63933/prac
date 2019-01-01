<template lang="html">
  <div class="">
    <p>{{wsStatus}}</p>
    <input type="button" ref="btn1" @click="createWs" name="" value="点击连接websocket">
    <input type="button" ref="btn2" @click="closeWs" name="" value="点击断开websocket">
  </div>
</template>

<script>
export default {
  data () {
    return {
      oWs: null,
      wsAddress: 'ws://localhost:3000',
      wsStatus: '',
      reconnectTimer: null,
      heartbeatTimer: null,
      isUserClose: false
    }
  },
  created () {
    setTimeout(() => {

    }, 20)
  },
  methods: {
    createWs () {
      let oThis = this
      if (oThis.oWs) { return }
      oThis.isUserClose = false
      if ('WebSocket' in window) {
        oThis.oWs = new WebSocket(oThis.wsAddress)
        console.log(oThis.oWs)

        oThis.oWs.onopen = function () {
          oThis.wsStatus = 'websocket已建立'
          setTimeout(oThis.sendHeartBeat, 2000)
        }

        oThis.oWs.onerror = function () {
          oThis.wsStatus = 'websocket发生错误'
        }

        oThis.oWs.onmessage = function (event) {
          console.log('a')
          oThis.wsStatus = `收到消息：${JSON.stringify(event.data)}`
        }

        oThis.oWs.onclose = function () {
          if (oThis.isUserClose) {
            oThis.wsStatus = 'websocket已关闭'
          } else {
            oThis.reconnectTimer = setTimeout(function () {
              if (oThis.oWs && (oThis.oWs.readyState !== 1)) {
                oThis.createWs()
              } else {
                clearTimeout(oThis.reconnectTimer)
              }
            }, 1000)
          }
        }
      } else {
        alert('Your browser do not support WebSocket, please use chrome.')
      }
    },
    sendHeartBeat () {
      const datahb = {type: 'heartbeat'}
      this.oWs.send(JSON.stringify(datahb))
      this.heartbeatTimer = setTimeout(this.sendHeartBeat, 1000)
    },
    closeWs () {
      this.isUserClose = true
      if (this.oWs) {
        this.oWs.close()
        clearTimeout(this.heartbeatTimer)
        clearTimeout(this.reconnectTimer)
      }
      this.oWs = null
      this.heartbeatTimer = null
      this.reconnectTimer = null
    }
  }
}
</script>

<style lang="css">
</style>
