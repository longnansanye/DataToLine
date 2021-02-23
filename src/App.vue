<template>
  <div id="app">
    <div id="hichart" class="box">
    <highcharts-component :options="options" :styles="styles" ref="simpleChart"></highcharts-component>
    </div>
    <div class="filebutton" align="center">
      <input type="text" id="textfield" class="txt" />
      <el-button type="primary" v-on:click="openFile()" round>选择文件</el-button>
      <el-button type="primary" v-on:click="showRealPath()" round>更新文件数据</el-button>
      <input type="file" name="filename" id="open" style="display:none" accet="csv" onchange="document.getElementById('textfield').value=this.value"/>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import Highmaps from 'highcharts/modules/map';
import $ from 'jquery'
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
      chart: null,
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
        width: 600,
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
    updateChart() {
      // 通过 refs 获取组件信息
      this.$refs.simpleChart.chart.series[0].update({
        data: [26.5, 23.3, 18.3, 13.9, 9.6, 15.0, 22, 33, 44, 55, 66, 72]
      })
    },
    createChart(filename) {
      var options = {
        xAxis: {
          categories: []
        },
        series: []
      };
      $.get('filename', (data) => {
        // 分隔每一行
        var lines = data.split('\n');
        var series = {
          name: '',
          data: []
        };
        // 遍历每一行
        $.each(lines, function(lineNo, line) {
          var items = line.split(',');
          // 处理第一行，即分类
          if (lineNo === 0) {
            $.each(items, function(itemNo, item) {
              if (itemNo === 0) {
                series.name = item; // 数据列的名字
              }
            });
          } else { // 处理其他的每一行
            $.each(items, function(itemNo, item) {
              if (itemNo === 0) {
                options.xAxis.categories.push(item);
              } else {
                series.data.push(parseFloat(item)); // 数据，记得转换成数值类型
              }
            });
            // 最后将数据 push 到数据列配置里
            options.series.push(series);
          }
        });
        this.$refs.simpleChart.chart.series[0].update(options)
      });
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
    showRealPath () {
      console.log('showRealPath');
      var filename = document.getElementById('textfield').value;
      this.createChart(filename);
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
