<template>
  <div></div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  created() {
    this.$electron.ipcRenderer.on('miniId', (e, a) => {
      this.setMiniId(a)
    })
    this.$electron.ipcRenderer.on('mainId', (e, a) => {
      this.setMainId(a)
    })
    this.$electron.ipcRenderer.on('miniClose', (e, a) => {
      this.setMiniId(0)
    })
    this.$electron.ipcRenderer.on('nextFromMini', _ => {
      this.playNextAudio()
    })
    this.$electron.ipcRenderer.on('preFromMini', (e, a) => {
      this.playPreAudio()
    })
    this.$electron.ipcRenderer.on('toggleFromMini', (e, a) => {
      if (this.audioPlaying) {
        this.$root.$audio.pause()
        this.setAudioPlaying(false)
      } else {
        this.$root.$audio.play()
        this.setAudioPlaying(true)
      }
    })

    this.$electron.ipcRenderer.on('toggleModeFromMini', (e, a) => {
      let mode = this.playMode + 1 === 5 ? 1 : this.playMode + 1
      this.setPlayMode(mode)
      this.$local.set('playMode', mode)
    })

    this.$electron.ipcRenderer.on('likeFromMini', (e, a) => {
      this.toggleLike()
    })
  },
  methods: {
    ...mapMutations('play', ['setAudioPlaying', 'setPlayMode']),
    ...mapMutations('mini', ['setMiniId', 'setMainId']),
    ...mapActions('play', ['playNextAudio','playPreAudio', 'toggleLike']),
  },
  computed: {
    ...mapState('play', ['currentAudio', 'audioPlaying', 'playMode']),
    ...mapState('mini', ['miniId']),
  },
  watch: {
    'currentAudio.id': {
      handler(val) {
        this.miniId && this.$electron.remote.BrowserWindow.fromId(this.miniId).webContents.send('audio', JSON.stringify(this.currentAudio))
      },
      immediate: true
    },
    'playMode': {
      handler(val) {
        val && this.miniId && this.$electron.remote.BrowserWindow.fromId(this.miniId).webContents.send('playMode', val)
      },
      immediate: true
    }
  }
}
</script>