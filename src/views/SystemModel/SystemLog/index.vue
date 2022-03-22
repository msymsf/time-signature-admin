<template>
  <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
    <el-form-item label="模块">
      <el-input placeholder="学习模块" v-model="ruleForm.optModule"></el-input>
    </el-form-item>
    <el-form-item label="操作类型">
      <el-input placeholder="新增或修改" v-model="ruleForm.optType"></el-input>
    </el-form-item>
    <el-form-item label="操作描述">
      <el-input
        placeholder="保存或更新课程"
        v-model="ruleForm.optDesc"
      ></el-input>
    </el-form-item>
    <el-form-item label="请求方式">
      <el-input placeholder="POST" v-model="ruleForm.requestMethod"></el-input>
    </el-form-item>
    <el-form-item label="操作人员">
      <el-input placeholder="空白" v-model="ruleForm.nickname"></el-input>
    </el-form-item>
    <el-form-item label="登录IP">
      <el-input placeholder="127.0.0.1" v-model="ruleForm.ipAddress"></el-input>
    </el-form-item>
    <el-form-item label="登录地址">
      <el-input
        placeholder="山西省晋中市"
        v-model="ruleForm.ipSource"
      ></el-input>
    </el-form-item>
    <el-form-item label="创建时间">
      <div class="block">
        <el-date-picker
          v-model="value"
          type="datetime"
          placeholder="2022-03-22 11:39:50"
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
  name: "Users",
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