<template>
  <div class="title-bar">
    <div class="no-drag" @click="$router.push('/main/find')">某云音乐</div>
    <el-button-group>
      <el-button class="no-drag" type="primary" icon="el-icon-edit" @click="handleBack"></el-button>
      <el-button class="no-drag" type="primary" icon="el-icon-share"></el-button>
      <el-button class="no-drag" type="primary" @click="handleMini">mini</el-button>
      <el-button class="no-drag" type="primary" @click="handleMini1">mini1</el-button>
    </el-button-group>
    <el-autocomplete
      class="no-drag"
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
      <el-avatar class="no-drag" icon="el-icon-user-solid" @click="showLogin"></el-avatar>
      <span class="no-drag" @click="showLogin">未登录</span>
    </template>
    <template v-else>
      <el-avatar class="no-drag" :src="user.avatar" @click="showLogin"></el-avatar>
      <span class="no-drag" @click="showLogin">{{user.nickname}}</span>
    </template>
  </div>
</template>

<script>
import { loginByPhone } from '@/common/api'
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      state: '',
    }
  },
  methods: {
    ...mapMutations('auth', ['setUser', 'setShowLoginForm']),
    querySearch() {},
    handleSelect() {},
    handleSearch() {

    },
    showLogin() {
      this.setShowLoginForm(true)
    },
    handleBack() {
      this.$router.go(-1)
    },
    handleMini() {
      this.$electron.ipcRenderer.send('mini')
    },
    handleMini1() {
      this.$electron.remote.BrowserWindow.fromId(2).webContents.send('audio', JSON.stringify(this.currentAudio))
    }
  },
  computed: {
    ...mapState('play', ['currentAudio']),
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
    // -webkit-app-region: drag;
  }
</style>