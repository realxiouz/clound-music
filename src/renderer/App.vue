<template>
  <div id="app" class="app">
    <template v-if="$route.path != '/mini'">
      <title-bar />
      <mini-ipc />
      <audio-lyric />
    </template>
    <div style="flex:1;height:0">
      <router-view></router-view>
    </div>

    <el-dialog title="登录" width="300px" :visible="showLoginForm" :show-close="false">
      <el-form :model="form" label-position="left" label-width="60px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleLogin">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import TitleBar from '@/components/title-bar'
  import MiniIpc from '@/components/mini-ipc'
  import AudioLyric from '@/components/audio-lyric'

  import { mapMutations, mapState, mapActions } from 'vuex'
  import { loginByPhone, getMySheet, likeSongList } from '@/common/api'

  export default {
    name: 'chin',
    created() {
      this._initApp()
    },
    data() {
      return {
        form: {
          phone: '',
          password: ''
        },
      }
    },
    components: {
      TitleBar, MiniIpc, AudioLyric
    },
    computed: {
      ...mapState('play', ['currentAudio']),
      ...mapState('auth', ['showLoginForm']),
    },
    methods: {
      ...mapMutations('auth', ['setUser', 'setShowLoginForm']),
      ...mapMutations('play', ['setPlayMode', 'setLikeList']),
      _initApp() {
        let user = this.$local.get('user')
        user && this.setUser(user)

        let mode = this.$local.get('playMode') || 1
        this.setPlayMode(mode)
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
          this.setShowLoginForm(false)

          return Promise.all([
            getMySheet({uid: r.account.id}),
            likeSongList({uid: r.account.id})
          ]) 
        }).then(r => {
          this.setLikeList(r[1].ids)
        })
      },
    }
  }
</script>

<style lang="scss">
@import './common/css/var.scss';
body{
  margin: 0;
  color: $light1;
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
  background-color: $dark1;
}
.app{
  display: flex;
  flex-direction: column;
  height: 100vh;
}

::-webkit-scrollbar {
  width: 8px;
}
</style>
