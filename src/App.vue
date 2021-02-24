<template>
  <div id="app">
    <div class="box">
    <highcharts-component :options="options" :styles="styles" ref="simpleChart"></highcharts-component>
    </div>
    <div class="filebutton" align="center">
      <input type="text" id="textfield" class="txt" />
      <el-button type="primary" v-on:click="openFile()" round>选择文件更新数据</el-button>
      <input type="file" name="filename" id="open" style="display:none" accet="csv"  onchange="document.getElementById('textfield').value=this.value" @change="loadTextFromFile"/>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import Highmaps from 'highcharts/modules/map';

import HighchartsComponent from './components/datatoline.vue';
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
Highmaps(Highcharts);

export default {
  name: 'app',
  data() {
    console.log('defualt');
    return {
      chart: {
        zoomType: 'x'
      },
      plotOptions: {
        series: {
          turboThreshold: 0 // 关闭性能阈值，解决数量超过默认1000的hicharts err:12错误
        }
      },
      options: {
        title: {text: '亮度曲线图'},
        xAxis: {
          categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
          title: {
            text: '亮度'
          },
          lineWidth: 2,
          lineColor: '#F33',
          id: 'lux-axis'
        },
        series: [{
          name: '亮度',
          data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
          color: '#F33'
        }]
      },
      styles: {
        width: 1200,
        height: 400
      }
    }
  },
  components: {
    HighchartsComponent
  },
  mounted() {
    this.moreChart();
  },
  methods: {
    createChart(data) {
      console.log(data)
      // 1、更新x轴数据
      // 2、更新数据列
      this.$refs.simpleChart.chart.xAxis[0].setCategories(data.xAxis.categories)
      while (this.$refs.simpleChart.chart.series.length) {
        this.$refs.simpleChart.chart.series[0].remove(false);
      }
      for (var i = 0; i < data.series.length; i++) {
        this.$refs.simpleChart.chart.addSeries(data.series[i])
      }
      // 3、增加x轴数据缩放
      this.$refs.simpleChart.chart.update({
        chart: {
          zoomType: 'x'
        }
      })
    },
    moreChart() {
      var options = this.options;

      if (this.chart) {
        this.chart.destroy();
      };
      console.log('moreChart create');

      this.chart = new Highcharts.Chart('hichart', options);
    },
    openFile() {
      document.getElementById('open').click()
      console.log('openFile');
    },
    csvToObject(csvString) {
      var csvarry = csvString.split('\r\n');
      var options = {
        xAxis: {
          categories: []
        },
        series: []
      };
      var datas = [];
      var headers = csvarry[0].split(',');
      for (var i = 1; i < csvarry.length; i++) {
        var data = [];
        var temp = csvarry[i].split(',');
        for (var j = 0; j < temp.length; j++) {
          data.push(temp[j]);
        }
        datas.push(data);
      }
      for (i = 0; i < headers.length; i++) {
        var series = {
          name: '',
          data: []
        };
        for (j = 0; j < csvarry.length - 1; j++) {
          if (i === 0) {
            options.xAxis.categories.push(datas[j][i]);
          } else {
            series.data.push(parseFloat(datas[j][i]));
          }
        }
        if (i > 0) {
          series.name = headers[i];
          options.series.push(series);
        }
      }
      return options;
    },
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      var data = [];
      let self = this;
      reader.onload = function() {
        data = self.csvToObject(this.result);
        console.log(data);
        self.createChart(data)
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.box {
  width: 100%;
  height: 450px;
  display: inline-block;
  border: 1px solid #ccc;
  overflow: hidden;
  position: relative;

  h3 {
    position: absolute;
    top: -10px;
    left: 10px;
    z-index: 1000;
  }
}
</style>
