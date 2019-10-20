<template>
  <div class="title-bar">
    <div>某云音乐</div>
    <el-button-group>
      <el-button type="primary" icon="el-icon-edit"></el-button>
      <el-button type="primary" icon="el-icon-share"></el-button>
    </el-button-group>
    <el-autocomplete
      popper-class="my-autocomplete"
      v-model="state"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect">
      <i
        class="el-icon-edit el-input__icon"
        slot="suffix"
        @click="handleSearch">
      </i>
      <template slot-scope="{ item }">
        <div class="name">{{ item.value }}</div>
        <span class="addr">{{ item.address }}</span>
      </template>
    </el-autocomplete>

    <el-avatar icon="el-icon-user-solid" @click="showLogin"></el-avatar>
    <span @click="showLogin">{{'未登录'}}</span>

    <el-dialog title="登录" width="300px" :visible.sync="dialogLogin">
      <el-form :model="form" label-position="left" label-width="60px">
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLogin = false">取 消</el-button>
        <el-button type="primary" @click="handleLogin">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { login } from '@/common/api'
export default {
  data() {
    return {
      dialogLogin: false,
      form: {}
    }
  },
  methods: {
    handleSearch() {

    },
    showLogin() {
      console.log('111')
      this.dialogLogin = true
    },
    handleLogin() {
      login(this.form).then(r => {})
    }
  }
}
</script>

<style lang="scss" scoped>
  .title-bar{
    height: 50px;
    background: #222225;
    border-bottom: 2px solid #931616;
    color: #fff;
    display: flex;
    align-items: center;
  }
</style>