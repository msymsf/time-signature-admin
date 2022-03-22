<template>
  <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
    <el-form-item label="菜单名称">
      <el-input placeholder="菜单名称" v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="图标">
      <svg
        class="icon"
        width="32px"
        height="32px"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#000000"
          d="M960 128H64c-35.3 0-64 28.6-64 64v640c0 35.3 28.7 64 64 64h160c8.8 0 16-7.2 16-16v-12c0-2.2 1.8-4 4-4h151c2.2 0 4 1.8 4 4v12c0 8.8 7.2 16 16 16h193c8.8 0 16-7.2 16-16v-12c0-2.2 1.8-4 4-4h152c2.2 0 4 1.8 4 4v12c0 8.8 7.2 16 16 16h160c35.3 0 64-28.7 64-64V192c0-35.4-28.7-64-64-64zM576 680v-48c0-4.4 3.6-8 8-8h304c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H584c-4.4 0-8-3.6-8-8z m0-128v-48c0-4.4 3.6-8 8-8h304c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H584c-4.4 0-8-3.6-8-8z m320-128c0 4.4-3.6 8-8 8H584c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h304c4.4 0 8 3.6 8 8v48zM447.2 736h-288c-8.8 0-16.8-3.6-22.6-9.4-5.8-5.8-9.4-13.8-9.4-22.6 0-57.1 27.2-107.8 69.3-140 4-3.1 4.3-9 0.5-12.3-33-29.3-53.8-72.1-53.8-119.7 0-87.7 70.5-158.9 157.9-160 87.8-1.1 160.7 69.6 162 157.4 0.8 48.6-20.1 92.4-53.7 122.2-3.8 3.4-3.6 9.3 0.5 12.4 21.1 16.1 38.4 36.8 50.4 60.6 12.1 23.8 18.9 50.8 18.9 79.3 0 17.8-14.3 32.1-32 32.1z"
        />
      </svg>
    </el-form-item>
    <el-form-item label="排序">
      <el-input placeholder="序号" v-model="ruleForm.orderNum"></el-input>
    </el-form-item>
    <el-form-item label="访问路径">
      <el-input placeholder="访问路径" v-model="ruleForm.path"></el-input>
    </el-form-item>
    <el-form-item label="组件路径">
      <el-input placeholder="组件路径" v-model="ruleForm.component"></el-input>
    </el-form-item>
    <el-form-item label="是否隐藏">
      <el-switch
        active-color="#13ce66"
        inactive-color="#dadde5"
        @change="change(scope.row)"
      >
      </el-switch>
    </el-form-item>
    <el-form-item label="创建时间">
      <div class="block">
        <el-date-picker
          v-model="value"
          type="datetime"
          placeholder="2022-03-22"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
    </el-form-item>
    <el-button type="primary" @click="Update">保存</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-form>
</template>

<script>
export default {
  name: "SystemMenu",
  data() {
    return {
      ruleForm: {},
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      value: "",
    };
  },
  methods: {
    async initformData(form) {
      let formResult = await this.$API.form.reqform(form.id);
      if (formResult.code == 200) {
        this.form = formResult.data;
      }
      let tradeMarkResult = await this.$API.form.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      let saleResult = await this.$API.form.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    async Update() {
      let result = await this.$API.reqUpdate(this.study);
      if (result.code == 200) {
        this.$message({ type: "success", message: "保存成功" });
      }
      Object.assign(this._data, this.$options.data());
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
/deep/ .el-form-item__label {
  text-align: left;
}
/deep/ .el-input__inner {
  width: 220px;
}
.el-form-item {
  padding: 0 30px;
}
</style>