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
            <router-link to="/online" tag="span">
              <span>在线用户</span>
            </router-link>
          </template>
          <template v-slot:id2><span>用户管理</span></template>
          <template v-slot:id3>
            <router-link to="/role" tag="span">
              <span>角色管理</span>
            </router-link>
          </template>
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
          <el-table-column prop="avatar" label="头像" align="center">
            <template slot-scope="scope">
              <img
                :src="scope.row.avatar"
                alt="头像"
                style="width: 35px; height: 35px"
              />
            </template>
          </el-table-column>
          <el-table-column prop="nickname" label="昵称" align="center">
          </el-table-column>
          <el-table-column prop="roleList" label="角色" align="center">
            <template slot-scope="scope">
              <el-tag
                type="success"
                v-for="(item, index) of scope.row.roleList"
                :key="index"
                style="margin-right: 4px; margin-top: 4px"
                >{{ item.roleName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="ipAddress" label="ip地址" align="center">
          </el-table-column>
          <el-table-column prop="ipSource" label="登录地址" align="center">
          </el-table-column>
          <el-table-column prop="isDisable" label="禁用" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isDisable"
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
              {{ scope.row.createTime | date }}
            </template>
          </el-table-column>
          <el-table-column
            prop="lastLoginTime"
            label="上次登录时间"
            align="center"
          >
            <template slot-scope="scope">
              <i class="el-icon-time" style="margin-right: 5px" />
              {{ scope.row.createTime | dateTime }}
            </template>
          </el-table-column>
          <el-table-column prop="operate" label="编辑" align="center">
            <template>
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
                <Users></Users>
              </el-dialog>
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
import { getUser } from "@/api";
import Users from "./Users";

export default {
  components: {
    SideNavBar,
    HeaderNavBar,
    Users,
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
      keywords: "",
      value: "false",
      tableData: [],
      pageSize: 8, //每页数据条数
      currPage: 1, //默认开始页面
      dialogVisible: false,
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      getUser(this.keywords).then(({ data }) => {
        if (data.flag) {
          this.tableData = data.data.recordList;
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
    }

    .cell img {
      border-radius: 50%;
    }

    .el-pagination {
      margin: 2.48% 0;
    }
  }
}
</style>