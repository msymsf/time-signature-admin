<template>
    <div class="charts" ref="charts"></div>

</template>

<script>
import * as echarts from "echarts";
import {getAdmin} from "@/api";

export default {
  data() {
    return {
      charts: null,
      option: {
        title: {
          text: "网站一周访问量",
          left: "center",
          top: 70,
          textStyle: {
            color: "#D7D7D7",
          },
        },
        grid: {
          top: "25%",
        },
        xAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [],
            type: "line",
            smooth: true,
          },
        ],
      },
    };
  },
  methods: {
    getData() {
      let lineCharts = echarts.init(this.$refs.charts);
      this.charts = lineCharts
      getAdmin().then(({data}) => {
        if (data.flag) {
          data.data.uniqueViewDTOList.forEach((item) => {
            this.option.series[0].data.push(item.viewsCount);
            lineCharts.setOption(this.option);
          });
        }
      });
    },
  },
  mounted() {
    this.getData();
  },

  watch: {
    '$store.state.viewData': function () {
      const option = this.charts.getOption();
      option.series[0].data = this.$store.state.viewData;

      this.charts.setOption(option);
    },
  },
};
</script>

<style scoped>
.charts {
  border-radius: 20px;
  width: 100%;
  height: 98%;
  background-color: #36393f;
}
</style>