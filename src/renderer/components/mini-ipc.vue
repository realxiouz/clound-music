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
  },
  methods: {
    ...mapMutations('play', ['setAudioPlaying']),
    ...mapMutations('mini', ['setMiniId']),
    ...mapActions('play', ['playNextAudio','playPreAudio']),
  },
  computed: {
    ...mapState('play', ['currentAudio', 'audioPlaying']),
    ...mapState('mini', ['miniId']),
  },
  watch: {
    'currentAudio.id': {
      handler(val) {
        this.miniId && this.$electron.remote.BrowserWindow.fromId(this.miniId).webContents.send('audio', JSON.stringify(this.currentAudio))
      },
      immediate: true
    },
  }
}
</script>