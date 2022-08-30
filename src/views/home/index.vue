<template>
  <div>
    <div class="container-fluid">
      <el-row class="spannel-list" :gutter="10">
        <el-col :xs="12" :sm="6">
          <div class="spannel">
            <em>10015</em><span>篇</span>
            <b>总文章数</b>
          </div>
        </el-col>
        <el-col :xs="12" :sm="6">
          <div class="spannel">
            <em>123</em><span>篇</span>
            <b>日新增文章数</b>
          </div>
        </el-col>
        <el-col :xs="12" :sm="6">
          <div class="spannel">
            <em>35</em><span>条</span>
            <b>评论总数</b>
          </div>
        </el-col>
        <el-col :xs="12" :sm="6">
          <div class="spannel">
            <em>123</em><span>条</span>
            <b>日新增评论数</b>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="container-fluid">
      <el-row class="curve-pie" :gutter="10">
        <el-col :xs="16" :sm="16">
          <div class="graph_pannel" id="curve_show"></div>
        </el-col>
        <el-col :xs="8" :sm="8">
          <div class="graph_pannel" id="pie_show"></div>
        </el-col>
      </el-row>
    </div>

    <div class="container-fluid">
      <div class="graph_pannel" id="foot_show"></div>
    </div>
  </div>
</template>

<script>
// echarts内部使用命名导出 export const 变量名 多个
// 正常导入import {变量名，变量名} from 'echarts'需要一个个导出来
import * as echarts from "echarts";
export default {
  name: "home",
  mounted() {
    this.initCurveFn();
    this.picChartFn();
    this.columnChartFn()
  },
  methods: {
    // 设置底部柱状图

    initCurveFn() {
      // 基于准备好的dom,初始化echarts实例
      const myChart = echarts.init(document.getElementById("foot_show"));
      // 绘制图表
      var data = [];
      for (let i = 0; i < 5; ++i) {
        data.push(Math.round(Math.random() * 200));
      }

      const option = {
        xAxis: {
          max: "dataMax",
        },
        yAxis: {
          type: "category",
          data: ["A", "B", "C", "D", "E"],
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
          max: 2, // only the largest 3 bars will be displayed
        },
        series: [
          {
            realtimeSort: true,
            name: "X",
            type: "bar",
            data: data,
            label: {
              show: true,
              position: "right",
              valueAnimation: true,
            },
          },
        ],
        legend: {
          show: true,
        },
        animationDuration: 3000,
        animationDurationUpdate: 3000,
        animationEasing: "linear",
        animationEasingUpdate: "linear",
      };

      function update() {
        var data = option.series[0].data;
        for (var i = 0; i < data.length; ++i) {
          if (Math.random() > 0.9) {
            data[i] += Math.round(Math.random() * 2000);
          } else {
            data[i] += Math.round(Math.random() * 200);
          }
        }
        myChart.setOption(option);
      }

      setInterval(function () {
        update();
      }, 3000);
      myChart.setOption(option);
    },
    // 设置饼状图
    picChartFn() {
      const opie = echarts.init(document.getElementById("pie_show"));
      const option = {
        series: [
          {
            type: "pie",
            data: [
              {
                value: 100,
                name: "A",
              },
              {
                value: 200,
                name: "B",
              },
              {
                value: 300,
                name: "C",
              },
              {
                value: 400,
                name: "D",
              },
              {
                value: 500,
                name: "E",
              },
            ],
            roseType: "area",
          },
        ],
      };
      opie.setOption(option);
    },
    // 初始化面积图
    columnChartFn() {
      const myChart1 = echarts.init(document.getElementById("curve_show"));
      const option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {},
          },
        ],
      };
      myChart1.setOption(option)
    },
  },
};
</script>

<style lang="less" scoped>
.spannel_list {
  margin-top: 20px;
}
.spannel {
  height: 100px;
  overflow: hidden;
  text-align: center;
  position: relative;
  background-color: #fff;
  border: 1px solid #e7e7e9;
  margin-bottom: 20px;
}
.spannel em {
  font-style: normal;
  font-size: 50px;
  line-height: 50px;
  display: inline-block;
  margin: 10px 0 0 20px;
  font-family: "Arial";
  color: #83a2ed;
}
.spannel span {
  font-size: 14px;
  display: inline-block;
  color: #83a2ed;
  margin-left: 10px;
}
.spannel b {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  line-height: 24px;
  background: #e5e5e5;
  color: #333;
  font-size: 14px;
  font-weight: normal;
}
.scolor01 em,
.scolor01 span {
  color: #6ac6e2;
}
.scolor02 em,
.scolor02 span {
  color: #5fd9de;
}
.scolor03 em,
.scolor03 span {
  color: #58d88e;
}

.graph_pannel {
  height: 350px;
  border: 1px solid #e7e7e9;
  background-color: #fff !important;
  margin-bottom: 20px;
}
</style>