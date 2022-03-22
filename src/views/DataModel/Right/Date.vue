<template>
  <el-calendar v-model="value" @click="getView"></el-calendar>
</template>

<script>
import { getWebsiteView } from "@/api";

export default {
  data() {
    return {
      value: new Date(),
      viewData: [],
    };
  },
  methods: {
    getView(date) {
      getWebsiteView(date).then(({ data }) => {
        if (data.flag) {
          data.data.forEach((item) => {
            this.viewData.push(item.viewsCount);
          });
          this.$store.state.viewData = this.viewData
          this.viewData = []
        }
      });
    },
  },
  watch: {
    value: function () {
      const year = this.value.getFullYear();
      const month = this.value.getMonth() + 1;
      const date = this.value.getDate();
      this.getView(year + "-" + month + "-" + date);
    },
  },
};
</script>

<style scoped>
/deep/ .el-button {
  background-color: transparent;
  border: none;
  color: white;
}

.el-calendar {
  border-radius: 20px;
  color: white;
  background-color: transparent;
}

/deep/ .el-calendar__title {
  color: white;
}

/deep/ .el-calendar-table thead th {
  color: white;
}

/deep/ .el-calendar[data-v-31b6545e] {
  color: black;
}

/deep/ .el-calendar-day:hover {
  color: black;
}

.el-calendar /deep/ .el-calendar-table .el-calendar-day {
  height: 31.5px;
}
</style>