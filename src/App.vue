<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { report } from "@/api";

export default {
  components: {},
  created() {
    // 上传访客信息
    report();
  },
};
</script>

<style lang="less" scoped>
#app {
  height: 100%;
  width: 100%;
}
</style>
