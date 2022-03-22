<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
import {getRegion} from "@/api";

export default {
  data() {
    return {
      echarts: null,
      type: 2,
      option: {
        title: {
          text: "访客分布",
          left: "right",
          top: 0,
          padding: 23,
          textStyle: {
            color: "#D7D7D7",
          },
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "地区",
            type: "pie",
            radius: "50%",
            label: {
              color: "rgba(215, 215, 215, 1)",
            },
            data: [
              // {value: 1048, name: "山西"},
              // {value: 735, name: "北京"},
              // {value: 580, name: "上海"},
              // {value: 484, name: "天津"},
              // {value: 300, name: "深圳"},
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      }
    }
  },
  methods: {
    getData() {
      let lineCharts = echarts.init(this.$refs.charts);
      this.echarts = lineCharts
      getRegion(this.type).then(({data}) => {
        if (data.flag) {
          data.data.forEach(item => {
            this.option.series[0].data.push(item)
            lineCharts.setOption(this.option);
          })
        }
      })

    }
  },
  mounted() {
    this.getData()
  },
};
</script>
<style scoped>
.charts {
  width: 100%;
  height: 95%;
}
</style>