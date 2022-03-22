<template>
  <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
    <el-form-item label="头像">
      <img
        src="@/assets/img/1.jpg"
        alt="头像"
        style="width: 35px; height: 35px"
      />
    </el-form-item>
    <el-form-item label="昵称">
      <el-input placeholder="昵称" v-model="ruleForm.nickname"></el-input>
    </el-form-item>
    <el-form-item label="角色">
      <el-select placeholder="请选择角色" v-model="ruleForm.roleList">
        <el-option
          :label="tm.tmName"
          :value="tm.id"
          v-for="(tm, index) in tradeMarkList"
          :key="tm.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="ip地址">
      <el-input placeholder="ip地址" v-model="ruleForm.ipAddress"></el-input>
    </el-form-item>
    <el-form-item label="登录地址">
      <el-input placeholder="登录地址" v-model="ruleForm.ipSource"></el-input>
    </el-form-item>
    <el-form-item label="禁用">
      <el-switch
        active-color="#13ce66"
        inactive-color="#dadde5"
        @change="change(row)"
      >
      </el-switch>
    </el-form-item>
    <el-form-item label="创建时间">
      <div class="block">
        <el-date-picker
          v-model="value1"
          type="datetime"
          placeholder="选择日期时间"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
    </el-form-item>
    <el-form-item label="上次登录时间">
      <div class="block">
        <el-date-picker
          v-model="value2"
          type="datetime"
          placeholder="选择日期时间"
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
  name: "User",
  data() {
    return {
      ruleForm: {
        Name: "",
        Id: "",
      },
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
      value1: "",
      value2: "",
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