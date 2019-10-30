<template>
  <div class="title-bar drag">
    <div class="no-drag" @click="$router.push('/main/find')">某云音乐</div>
    <el-button-group>
      <el-button class="no-drag" type="primary" icon="el-icon-edit" @click="handleBack"></el-button>
      <el-button class="no-drag" type="primary" icon="el-icon-share"></el-button>
    </el-button-group>
    <el-autocomplete
      style="width:355px;"
      class="no-drag"
      popper-class="my-autocomplete"
      v-model="kw"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect">
      <i
        class="el-icon-edit el-input__icon"
        slot="suffix"
        @click="handleSearch">
      </i>
      <template slot-scope="{ item }">
        <div class="search-item">
          <div class="word flex align-center">
            <div>{{ item.searchWord }}</div>
            <div class="count">{{item.score}}</div>
            <img style="width:auto;height:13px" v-if="item.iconUrl" :src="item.iconUrl" />
            <!-- <el-image style="width:auto;height:13px" v-if="item.iconUrl" :src="item.iconUrl"></el-image> -->
          </div>
          <span class="content">{{ item.content }}</span>
        </div>
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
    <el-button-group>
      <el-button class="no-drag" type="primary" @click="handleMini">mini</el-button>
      <el-button class="no-drag" type="primary" @click="handleMin">min</el-button>
    </el-button-group>
  </div>
</template>

<script>
import { loginByPhone, searchSuggest } from '@/common/api'
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      kw: '',
      suggest: [],
    }
  },
  methods: {
    ...mapMutations('auth', ['setUser', 'setShowLoginForm']),
    querySearch(str, cb) {
      if(!str){
        this.suggest.length ? cb(this.suggest) :
        searchSuggest().then(r => {
          cb(r.data)
          this.suggest = r.data
        })
      }
      
    },
    handleSelect(i) {
      this.kw = i.searchWord
      this.kw && this.$router.push({
        path: `/main/search/${this.kw}`
      })
    },
    handleSearch() {

    },
    showLogin() {
      this.setShowLoginForm(true)
    },
    handleBack() {
      if (history.length === 1) {
        this.$message('不能后退了')
        return
      }
      this.$router.go(-1)
    },
    handleMini() {
      // if (this.miniId) {
      //   return
      // }
      this.$electron.ipcRenderer.send('mini')
    },
    handleMin() {
      // this.$electron.ipcRenderer.send('min')
      this.$electron.remote.BrowserWindow.fromId(2).show()
      this.$electron.remote.BrowserWindow.fromId(1).hide()
    },
  },
  computed: {
    ...mapState('play', ['currentAudio']),
    ...mapState('auth', ['user']),
    ...mapState('mini', ['miniId']),
    canBack() {
      return history.length > 1
    }
  },
  watch: {
    // 'history.length': {
    //   handler(v) {
    //     this.canBack = v > 1
    //   }
    // }
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

  .search-item{
    .word{
      font-size: 12px;
      .count{
        font-size: 10px;
        margin: 0 10px;
      }
    }
    .content{
      font-size: 10px;
      line-height: 1;
    }
  }
</style>