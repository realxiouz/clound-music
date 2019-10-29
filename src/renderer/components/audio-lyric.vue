<template>
  <div>
    <audio :src="currentAudio.url" autoplay ref="audio"></audio>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { getSongLyric } from '@/common/api'
import Lyric from '@/common/js/lyric'

export default {
  mounted() {
    this.$refs.audio.addEventListener('ended', this.playNextAudio)
    this.$refs.audio.addEventListener('timeupdate', _ => {
      this.setPlayTime(this.$refs.audio.currentTime*1000)
    })
    this.$refs.audio.volume = (this.$local.get('volume')||50)/100
    this.$root.$audio = this.$refs.audio
  },
  watch: {
    'currentAudio.id': {
      handler(val) {
        this.lyric && this.lyric.stop()
        this.lyric = null
        this.setLyricLines([])
        this.setCurrentLine(0)
        this.$root.$lyric = null
        val && this._getLyric(val)
      },
      immediate: true
    },
    'audioPlaying': {
      handler(val) {
        this.lyric && this.lyric.togglePlay()
      }
    },
    'playMode': {
      handler(v) {
        this.$nextTick(_ => {
          v === 3 ? this.$refs.audio.loop = true : this.$refs.audio.loop = false
        })
      },
      immediate: true
    }
  },
  computed: {
    ...mapState('play', ['playTime', 'currentAudio', 'audioPlaying', 'playMode']),
    ...mapState('mini', ['miniId'])
  },
  data() {
    return {
      lyric: null,
      nolyric: false,
    }
  },
  methods: {
    ...mapMutations('play', ['setCurrentLine', 'setLyricLines', 'setPlayTime', 'setLyricLines', 'setCurrentLine']),
    ...mapActions('play', ['playNextAudio']),
    _getLyric(id) {
      getSongLyric({id}).then(r => {
        if (r.nolyric) {
          this.nolyric = true
          return
        }
        this.nolyric = false
        this.lyric = new Lyric(r.lrc.lyric, ({lineNum, txt}) => {
          this.setCurrentLine(lineNum)
          this.miniId && this.$electron.remote.BrowserWindow.fromId(this.miniId).webContents.send('lyric', txt)
        })
        if (!this.lyric.lines.length) {
          // todo lyric parse err
          console.log(this.lyric.lrc)
          console.log(this.lyric.lines)
        }
        this.setLyricLines(this.lyric.lines)
        this.lyric.seek(this.playTime)
        this.$root.$lyric = this.lyric
      })
    },
  },
}
</script>