<template>
  <div class="loginPage">
    <div class="loginContains">
      <div class="loginLogo">
        <span>双体系开发中心</span>
      </div>
      <div class="loginMain">
        <div class="loginForm">
          <h2>时签后台管理系统</h2>
          <form>
            <div class="loginInfo">
              <input v-model="username" type="text" name="username" required />
              <label>用户名</label>
            </div>
            <div class="loginInfo">
              <input
                v-model="password"
                type="password"
                name="password"
                required
              />
              <label>密码</label>
            </div>
            <a-button
              type="primary"
              shape="round"
              size="large"
              block
              :loading="loading"
              @click="login"
            >
              登录
            </a-button>
          </form>
        </div>
        <div class="loginImg">
          <img src="../assets/img/bg.png" alt="图片" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api";

export default {
  data() {
    return {
      username: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      let params = new URLSearchParams();
      params.append("username", this.username);
      params.append("password", this.password);
      login(params).then(({ data }) => {
        this.loading = false;
        if (data.flag) {
          // 登录后保存用户信息
          this.$store.commit("login", data.data);
          this.$message.success("登录成功");
          this.$router.push({ path: "/data" });
        } else {
          this.$message.error("登录失败！" + data.message);
        }
      });
    },
  },
};
</script>
<style scoped>
.loginPage {
  height: 100%;
  background-image: -moz-linear-gradient(
    135deg,
    rgb(168, 215, 255),
    rgb(173, 198, 255)
  );

  background-image: -webkit-linear-gradient(
    135deg,
    rgb(168, 215, 255),
    rgb(173, 198, 255)
  );

  background-image: linear-gradient(
    135deg,
    rgb(168, 215, 255),
    rgb(173, 198, 255)
  );
}
.loginContains {
  /*定位*/
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /*宽度高度*/
  width: 900px;
  /* height: 550px; */
  /*圆角边框*/
  /*border: 2px solid;*/
  border-radius: 20px;
  /*元素的总高度和宽度包含内边距和边框(padding 与 border)*/
  box-sizing: border-box;
  /*阴影*/
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  /*背景色*/
  background-image: -moz-linear-gradient(
    45deg,
    rgb(246, 204, 255),
    rgb(163, 255, 246)
  );

  background-image: -webkit-linear-gradient(
    45deg,
    rgb(246, 204, 255),
    rgb(163, 255, 246)
  );

  background-image: linear-gradient(
    45deg,
    rgb(246, 204, 255),
    rgb(163, 255, 246)
  );
}

.loginLogo {
  /*字体*/
  font-family: "华文行楷", serif;
  font-size: 30px;
  font-weight: 550;
  /*宽度高度*/
  width: 100%;
  height: 60px;
  /*边距*/
  /*padding-left: 20px;*/
  padding-top: 40px;
  /*居中*/
  text-align: center;
}

.loginMain {
  width: 100%;
}

.loginForm {
  /*边距*/
  padding: 100px 120px;
  /*宽度*/
  width: 500px;
  /*元素的总高度和宽度包含内边距和边框(padding 与 border)*/
  box-sizing: border-box;
  /*浮动*/
  float: left;
}

.loginForm h2 {
  /*边距*/
  margin: 0 0 30px;
  padding: 0;
  /*字体颜色 粗细*/
  color: black;
  font-weight: 600;
  /*居中*/
  text-align: center;
}

.loginInfo {
  /*定位*/
  position: relative;
}

.loginInfo input {
  /*宽度*/
  width: 100%;
  /*边距*/
  padding: 10px 0;
  /*输入字体大小*/
  font-size: 16px;
  /*输入字体颜色*/
  color: #4c4949;
  /*底边框*/
  margin-bottom: 30px;
  /*只留底边线*/
  border: none;
  border-bottom: 1px solid #767474;
  /*使聚焦时边框消失*/
  outline: none;
  /*使背景透明*/
  background: transparent;
}

.loginInfo label {
  /*定位*/
  position: absolute;
  top: 0;
  left: 0;
  /*边距*/
  padding: 10px 0;
  /*字体大小*/
  font-size: 16px;
  /*字体颜色*/
  color: #b8b2b2;
  pointer-events: none;
  transition: 0.5s;
}

.loginInfo input:focus ~ label,
.loginInfo input:valid ~ label {
  top: -20px;
  left: 0;
  color: black;
  font-size: 12px;
}

.loginImg img {
  /*定位*/
  position: relative;
  left: -8%;
  margin-top: 50px;
  /*宽度高度*/
  width: 350px;
  height: 350px;
  /*浮动*/
  float: right;
}
</style>