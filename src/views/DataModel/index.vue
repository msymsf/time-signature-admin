<template>
  <el-container style="background-color: #202225">
    <!-- 侧边栏 -->
    <el-aside width="auto">
      <SideNavBar/>
    </el-aside>
    <el-container class="main-container">
      <!-- 导航栏 -->
      <el-header height="80px" style="padding: 0">
        <HeaderNavBar>
          <template v-slot:id1><span>网站访问量</span></template>
          <template v-slot:id2><span>平均学习时长</span></template>
          <template v-slot:id3><span>未完善模块</span></template>
          <template v-slot:id4><span>未完善模块</span></template>
          <template v-slot:id5><span>未完善模块</span></template>
        </HeaderNavBar>
      </el-header>
      <!-- 内容 -->
      <el-main>

        <div class="left">
          <WebsiteView></WebsiteView>
        </div>
        <div class="right">
          <div class="right_date">
            <Date></Date>
          </div>
          <div class="right_region">
            <Region></Region>
          </div>

        </div>

        <router-view :key="$route.fullPath"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {getAdmin, getUserArea} from "@/api";
import WebsiteView from "@/views/DataModel/Left/WebsiteView";
import Date from "@/views/DataModel/Right/Date";
import Region from "@/views/DataModel/Right/Region";
import HeaderNavBar from "@/components/HeaderNavBar.vue";
import SideNavBar from "@/components/SideNavBar.vue";

export default {
  components: {
    WebsiteView,
    Date,
    Region,
    SideNavBar,
    HeaderNavBar,
  },
  data() {
    return {
      loading: true,
      type: 1,
      viewsCount: 0,
      userCount: 0,
      viewCount: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        color: ["#3888fa"],
        legend: {
          data: ["访问量"],
        },
        grid: {
          left: "0%",
          right: "0%",
          bottom: "0%",
          top: "10%",
          containLabel: true,
        },
        xAxis: {
          data: [],
          axisLine: {
            lineStyle: {
              // 设置x轴颜色
              color: "#666",
            },
          },
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              // 设置y轴颜色
              color: "#048CCE",
            },
          },
        },
        series: [
          {
            name: "访问量",
            type: "line",
            data: [],
            smooth: true,
          },
        ],
      },
      userAreaMap: {
        tooltip: {
          formatter: function (e) {
            var value = e.value ? e.value : 0;
            return e.seriesName + "<br />" + e.name + "：" + value;
          },
        },
        visualMap: {
          min: 0,
          max: 1000,
          right: 26,
          bottom: 40,
          showLabel: !0,
          pieces: [
            {
              gt: 100,
              label: "100人以上",
              color: "#ED5351",
            },
            {
              gte: 51,
              lte: 100,
              label: "51-100人",
              color: "#59D9A5",
            },
            {
              gte: 21,
              lte: 50,
              label: "21-50人",
              color: "#F6C021",
            },
            {
              label: "1-20人",
              gt: 0,
              lte: 20,
              color: "#6DCAEC",
            },
          ],
          show: !0,
        },
        geo: {
          map: "china",
          zoom: 1.2,
          layoutCenter: ["50%", "50%"], //地图中心在屏幕中的位置
          //   label: {
          //     normal: {
          //       show: !0,
          //       fontSize: "12",
          //       color: "rgba(0,0,0,0.7)"
          //     }
          //   },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)",
            },
            emphasis: {
              areaColor: "#F5DEB3",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0,
            },
          },
        },
        series: [
          {
            name: "用户人数",
            type: "map",
            geoIndex: 0,
            data: [],
            areaColor: "#0FB8F0",
          },
        ],
      },
    };
  },
  created() {
    this.listUserArea();
    this.getData();
  },
  methods: {
    getData() {
      getAdmin().then(({data}) => {
        //网站访问量
        this.viewsCount = data.data.viewsCount;
        //用户数量
        this.userCount = data.data.userCount;
        //一周访问量数据
        if (data.data.uniqueViewDTOList != null) {
          data.data.uniqueViewDTOList.forEach((item) => {
            this.viewCount.xAxis.data.push(item.day);
            this.viewCount.series[0].data.push(item.viewsCount);
          });
        }
        this.loading = false;
      });
    },
    listUserArea() {
      getUserArea({type: this.type}).then(({data}) => {
        this.userAreaMap.series[0].data = data.data;
      });
    },
  },
};
</script>

<style scoped lang='less'>
.main-container {
  transition: margin-left 0.45s;
  width: 100%;
  min-height: 100vh;

  .el-main {
    //width: 100%;
    //background-color: #36393f;
    background-color: #202225;
    margin-top: 50px;
    margin-right: 25px;
    border-radius: 25px;
    margin-bottom: 30px;
    padding: 0;
    display: flex;
    justify-content: space-between;


    .left {
      top: 0;
      bottom: 0;
      overflow: hidden;
      height: 100%;
      width: 70%;
      border-radius: 20px;
      background-color: #36393f;
    }

    .right {
      top: 0;
      bottom: 0;
      overflow: hidden;
      height: 100%;
      width: 28.5%;
      border-radius: 20px;
      background-color: #202225;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .right_date {
        top: 0;
        bottom: 0;
        overflow: hidden;
        height: 58.5%;
        width: 100%;
        border-radius: 20px;
        background-color: #36393f;
      }

      .right_region {
        top: 0;
        bottom: 0;
        overflow: hidden;
        height: 40%;
        width: 100%;
        border-radius: 20px;
        background-color: #36393f;
      }
    }

  }
}
</style>
