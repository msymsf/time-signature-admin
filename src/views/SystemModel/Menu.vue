<template>
  <el-container style="background-color: #202225">
    <!-- 侧边栏 -->
    <el-aside width="auto">
      <SideNavBar />
    </el-aside>
    <el-container class="main-container">
      <!-- 导航栏 -->
      <el-header height="80px" style="padding: 0">
        <HeaderNavBar>
          <template v-slot:id1>
            <router-link to="/log" tag="span">
              <span>日志管理</span>
            </router-link>
          </template>
          <template v-slot:id2><span>菜单管理</span></template>
          <template v-slot:id3><span>接口管理</span></template>
          <template v-slot:id4
            ><span>{{ clientWidth + " " + clientHeight }}</span></template
          >
          <template v-slot:id5><span>未完善模块</span></template>
        </HeaderNavBar>
      </el-header>
      <!-- 内容 -->
      <el-main>
        <el-table
          :data="
            tableData.slice((currPage - 1) * pageSize, currPage * pageSize)
          "
          width="100%"
          :height="height + 'px'"
          style="color: white"
          :header-row-style="{ height: rowHeight + 'px', color: 'white' }"
          :cell-style="rowClass"
          :header-cell-style="headClass"
        >
          <el-table-column prop="name" label="菜单名称" align="center">
          </el-table-column>
          <el-table-column prop="icon" label="图标" align="center">
            <!--                        <template>-->
            <!--                          <svg t="1647420203653" class="icon" viewBox="0 0 1024 1024" version="1.1"-->
            <!--                               xmlns="http://www.w3.org/2000/svg" p-id="4048" width="38" height="38">-->
            <!--                            <path-->
            <!--                                d="M960 128H64c-35.3 0-64 28.6-64 64v640c0 35.3 28.7 64 64 64h160c8.8 0 16-7.2 16-16v-12c0-2.2 1.8-4 4-4h151c2.2 0 4 1.8 4 4v12c0 8.8 7.2 16 16 16h193c8.8 0 16-7.2 16-16v-12c0-2.2 1.8-4 4-4h152c2.2 0 4 1.8 4 4v12c0 8.8 7.2 16 16 16h160c35.3 0 64-28.7 64-64V192c0-35.4-28.7-64-64-64zM576 680v-48c0-4.4 3.6-8 8-8h304c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H584c-4.4 0-8-3.6-8-8z m0-128v-48c0-4.4 3.6-8 8-8h304c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H584c-4.4 0-8-3.6-8-8z m320-128c0 4.4-3.6 8-8 8H584c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h304c4.4 0 8 3.6 8 8v48zM447.2 736h-288c-8.8 0-16.8-3.6-22.6-9.4-5.8-5.8-9.4-13.8-9.4-22.6 0-57.1 27.2-107.8 69.3-140 4-3.1 4.3-9 0.5-12.3-33-29.3-53.8-72.1-53.8-119.7 0-87.7 70.5-158.9 157.9-160 87.8-1.1 160.7 69.6 162 157.4 0.8 48.6-20.1 92.4-53.7 122.2-3.8 3.4-3.6 9.3 0.5 12.4 21.1 16.1 38.4 36.8 50.4 60.6 12.1 23.8 18.9 50.8 18.9 79.3 0 17.8-14.3 32.1-32 32.1z"-->
            <!--                                p-id="4049"></path>-->
            <!--                          </svg>-->
            <!--                        </template>-->
          </el-table-column>
          <el-table-column prop="orderNum" label="排序" align="center">
          </el-table-column>
          <el-table-column prop="path" label="访问路径" align="center">
          </el-table-column>
          <el-table-column prop="component" label="组件路径" align="center">
          </el-table-column>
          <el-table-column prop="isHidden" label="是否隐藏" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isHidden"
                active-color="#13ce66"
                inactive-color="#dadde5"
                @change="change(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time" style="margin-right: 5px" />
              {{ scope.row.updateTime | date }}
            </template>
          </el-table-column>
          <el-table-column
            prop="operate"
            label="编辑"
            align="center"
            width="250%"
          >
            <template slot-scope="scope">
              <el-button
                @click="dialogVisible = true"
                type="primary"
                plain
                size="small"
                >新增
              </el-button>
              <el-dialog
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
              >
                <SystemNew></SystemNew>
              </el-dialog>
              <el-button
                @click="dialogVisible = true"
                plain
                type="warning"
                size="small"
                >修改
              </el-button>
              <el-dialog
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
              >
                <SystemMenu></SystemMenu>
              </el-dialog>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="danger"
                size="small"
                plain
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器-->
        <el-pagination
          id="Direction_paging"
          background
          style="text-align: center"
          layout="prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currPage"
          :page-size="pageSize"
          :total="tableData.length"
        >
        </el-pagination>
        <router-view :key="$route.fullPath" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderNavBar from "@/components/HeaderNavBar.vue";
import SideNavBar from "@/components/SideNavBar.vue";
import { getAdminMenus } from "@/api";
import SystemMenu from "./SystemMenu";
import SystemNew from "./SystemNew";

export default {
  components: {
    SideNavBar,
    HeaderNavBar,
    SystemMenu,
    SystemNew,
  },
  beforeMount() {},
  mounted() {
    let Direction_margin_top =
      document.getElementById("Direction_paging").getBoundingClientRect()
        .width * 0.0248;
    this.height =
      this.clientHeight - 80 - 50 - 30 - Direction_margin_top * 2 - 37; //37我也不知道哪里多出来的..我应该都算进去了，呜呜！！！
    const that = this;
    window.onresize = function temp() {
      that.clientWidth = `${document.documentElement.clientWidth}`;
      that.clientHeight = `${document.documentElement.clientHeight}`;
      //header 80px (main 上边距50 ((table header)分页器的上下边距 = main的width * 0.0248) 下边距30)
      //获取分页器上下边距
      let Direction_margin_top_copy =
        document.getElementById("Direction_paging").getBoundingClientRect()
          .width * 0.0248;
      that.height =
        that.clientHeight -
        80 -
        50 -
        30 -
        Direction_margin_top_copy * 0.0248 * 2;
      location.reload();
    };
  },
  data() {
    return {
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight,
      height: null,
      rowHeight: 115,
      input: "",
      tableData: [],
      pageSize: 8, //每页数据条数
      currPage: 1, //默认开始页面
      dialogVisible: false,
    };
  },
  created() {
    this.getAdminMenus();
  },
  methods: {
    getAdminMenus() {
      getAdminMenus().then(({ data }) => {
        if (data.flag) {
          this.tableData = data.data;
        }
      });
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    // 表头样式设置
    headClass() {
      return "background:#36393f";
    },
    // 表格样式设置
    rowClass() {
      return "background:#36393f";
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currPage = val;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style scoped lang='less'>
.main-container {
  transition: margin-left 0.45s;
  width: 100%;
  max-height: 100vh;

  .el-main {
    background-color: #36393f;
    margin-top: 50px;
    margin-right: 25px;
    border-radius: 25px;
    margin-bottom: 30px;
    padding: 0;
    height: 100%;

    .el-table {
      background-color: #36393f;
      .el-button {
        margin-left: 10px;
      }

      .cell img {
        border-radius: 50%;
      }
    }

    .el-pagination {
      margin: 2.5% 0;
    }
  }
}
</style>