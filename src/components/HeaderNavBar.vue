<template>
  <div class="headerNavBar">
    <div class="headerNavBar_global">
      <div class="headerNavBar_menus">


        <div class="headerNavBar_menu headerNavBar_menu_one">
          <slot name="id1"></slot>
        </div>
        <div class="headerNavBar_menu headerNavBar_menu_two">
          <slot name="id2"></slot>
        </div>
        <div class="headerNavBar_menu headerNavBar_menu_three">
          <slot name="id3"></slot>
        </div>
        <div class="headerNavBar_menu headerNavBar_menu_four">
          <slot name="id4"></slot>
        </div>
        <div class="headerNavBar_menu headerNavBar_menu_five">
          <slot name="id5"></slot>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.headerNavBar {
  height: 100%;
  width: 100%;
}
.headerNavBar_global {
  height: 100%;
  background-color: #36393f;
  border-radius: 20px;
  margin-top: 30px;
  margin-right: 25px;
}
.headerNavBar_menus {
  width: 90%;
  height: 43%;
  text-align: center;
  margin-left: 90px;
  /*行高*/
  line-height: 40px;
  /*字间距*/
  letter-spacing: 4px;
  color: rgb(240, 231, 231);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.headerNavBar_menu {
  height: 40px;
  margin-top: 20px;
  margin-right: 70px;
  width: 180px;
  float: left;
  border-radius: 20px;
  border: 1px solid rgb(151, 148, 148);
}

.headerNavBar_menu:hover {
  color: #333333;
  height: 40px;
  background-color: white;
  cursor: pointer;
}
</style>