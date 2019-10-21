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

    <template v-if="!user.id">
      <el-avatar icon="el-icon-user-solid" @click="showLogin"></el-avatar>
      <span @click="showLogin">未登录</span>
    </template>
    <template v-else>
      <el-avatar :src="user.avatar" @click="showLogin"></el-avatar>
      <span @click="showLogin">{{user.nickname}}</span>
    </template>
    

    <el-dialog title="登录" width="300px" :visible.sync="dialogLogin">
      <el-form :model="form" label-position="left" label-width="60px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogLogin = false">取 消</el-button> -->
        <el-button type="primary" @click="handleLogin">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { loginByPhone } from '@/common/api'
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      dialogLogin: false,
      state: '',
      form: {
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations('auth', ['setUser']),
    querySearch() {},
    handleSelect() {},
    handleSearch() {

    },
    showLogin() {
      this.dialogLogin = true
    },
    handleLogin() {
      loginByPhone(this.form).then(r => {
        this.$local.set('account', r.account)
        this.$local.set('profile', r.profile)
        let user = {
          id: r.account.id,
          avatar: r.profile.avatarUrl,
          nickname: r.profile.nickname
        }
        this.setUser(user)
        this.$local.set('user', user)
        this.dialogLogin = false
      })
    }
  },
  computed: {
    ...mapState('auth', ['user'])
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