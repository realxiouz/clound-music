<template>
  <div id="app" class="app">
    <title-bar />
    <div style="flex:1;height:0">
      <router-view></router-view>
    </div>
    <audio :src="currentAudio.url" autoplay ref="audio"></audio>
  </div>
</template>

<script>
  import TitleBar from '@/components/title-bar'
  import { mapMutations, mapState, mapActions } from 'vuex'

  export default {
    name: 'chin',
    created() {
      this._initApp()
    },
    mounted() {
      this.$refs.audio.addEventListener('ended', this.playNextAudio)
      this.$refs.audio.addEventListener('timeupdate', _ => {
        this.setPlayTime(this.$refs.audio.currentTime*1000)
      })
      this.$root.$audio = this.$refs.audio
    },
    components: {
      TitleBar
    },
    computed: {
      ...mapState('play', ['currentAudio']),
    },
    methods: {
      ...mapMutations('auth', ['setUser']),
      ...mapMutations('play', ['setPlayTime']),
      ...mapActions('play', ['playNextAudio']),
      _initApp() {
        let user = this.$local.get('user')
        user && this.setUser(user)
      }
    }
  }
</script>

<style lang="scss">
@import './common/css/var.scss';
body{
  margin: 0;
  color: $light1;
  font-size: 12px;
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
