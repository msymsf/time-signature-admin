<template>
  <div class="sideNavBar">
    <div class="sideNavBar_global">

      <!-- 头部 -->
      <div class="sideNavBar_header">
        <!-- 头像 -->
        <div class="sideNavBar_avatar">
          <img :src="avatar" alt="头像"/>
        </div>

        <!-- 用户信息 -->
        <div class="sideNavBar_user">
          <div class="sideNavBar_nickname">
            <span>{{ nickname }}</span>
          </div>
          <div class="sideNavBar_username">
            <span>ID: {{ username }}</span>
          </div>
        </div>
      </div>

      <div class="sideNavBar_menus">
        <router-link to="/data" tag="div">
          <div class="sideNavBar_menu sideNavBar_menu_one">
            <span>数据模块</span>
          </div>
        </router-link>
        <router-link to="/study" tag="div">
          <div class="sideNavBar_menu sideNavBar_menu_two">
            <span>学习模块</span>
          </div>
        </router-link>
        <router-link to="/online" tag="div">
          <div class="sideNavBar_menu sideNavBar_menu_three">
            <span>用户模块</span>
          </div>
        </router-link>
        <router-link to="/log" tag="div">
          <div class="sideNavBar_menu sideNavBar_menu_four">
            <span>系统模块</span>
          </div>
        </router-link>
      </div>

      <div class="sideNavBar_logout">
        <span @click="logout">退出登录</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      avatar: '',
      nickname: '',
      username: '',
    }
  },
  created() {
    this.avatar = this.$store.state.avatar
    this.nickname = this.$store.state.nickname
    this.username = this.$store.state.username
  },
  methods: {
    logout() {
      this.$store.commit('logout')
      this.$router.push({path: "/"});
    }
  }
}
</script>

<style scoped lang="less">
.sideNavBar {
  padding: 30px 25px;
  height: 100%;
  width: 100%;
  color: white;
}

.sideNavBar_global {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  border-radius: 35px;
  background-color: #36393f;
}

.sideNavBar_header {
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 40px;
  position: relative;
  top: -3%;
}

.sideNavBar_avatar img {
  width: 100px;
  height: 100px;
}

.sideNavBar_menus {
  width: 70%;
  height: 43%;
  margin: 40px 27px 0 27px;
  text-align: center;
  /*行高*/
  line-height: 40px;
  /*字间距*/
  letter-spacing: 4px;
  color: rgb(240, 231, 231);
}

.sideNavBar_menu {
  margin: 30px 0;
  border-radius: 20px;
  border: 1px solid rgb(151, 148, 148);
}

.sideNavBar_menu:hover {
  color: #333333;
  height: 42px;
  background-color: white;
  cursor: pointer;
}

.sideNavBar_nickname {
  margin-top: 10px;
  font-weight: 500;
  font-family: 微软雅黑, serif;
  font-size: 10px;
  cursor: default;
}

.sideNavBar_username {
  text-align: center;
  font-size: 10px;
  cursor: default;
  margin-bottom: 15px;
}

.sideNavBar_logout {
  text-align: center;
  padding: 10px;
  /*字间距*/
  letter-spacing: 5px;
  margin: 0 38px;
  border: 1px solid #878585;
  border-radius: 10px;
  color: #878585;
}

.sideNavBar_logout:hover {
  cursor: pointer;
  border: 1px solid white;
  color: white;
}
</style>