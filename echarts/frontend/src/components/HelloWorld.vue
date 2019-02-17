<template>
  <div>asdf
    <div id="line111" style="width:600px;height:400px;"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      chart1: null,
      chartOption: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
        },
        yAxis: {type: 'value'},
        series: [ {
          data: [820, 932, 901, 934, 1290, 1330, 1320, 989],
          type: 'line',
          name: '预测'
        }, {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          name: '实际'
        }],
        color: [ '#ff9945', '#85c5da'],
        legend: {
          data: [{name: '预测', textStyle: {color: '#ff9945'}}, {name: '实际', textStyle: {color: '#85c5da'}}]
        }
      }
    }
  },
  created () {
    setTimeout(() => {
      this.chart1 = this.$echarts.init(document.getElementById('line111'))
      this.chart1.setOption(this.chartOption)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
