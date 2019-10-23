<template>
  <div class="main-layout">
    <div style="flex:1;overflow-y:auto" class="main" >
      <div v-if="lyric&&lyric.lines&&lyric.lines.length">
        <div v-for="(i, inx) in lyric.lines" :key="inx" :style="line=== inx ? 'color:yellow':''">
          {{i.txt}}
        </div>
      </div>
      <div v-if="nolyric">歌曲没有歌词</div>
    </div>
    <footer-bar />
  </div>
</template>

<script>
  import FooterBar from '@/components/footer'
  import { getSongLyric } from '@/common/api'
  import Lyric from '@/common/js/lyric'
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        lyric: null,
        line: 0,
        nolyric: false
      }
    },
    computed: {
      ...mapState('play', ['playTime', 'currentAudio', 'audioPlaying'])
    },
    methods: {
      _getLyric(id) {
        getSongLyric({id}).then(r => {
          if (r.nolyric) {
            this.nolyric = true
            return
          }
          this.nolyric = false
          this.lyric = new Lyric(r.lrc.lyric, ({lineNum, txt}) => {
            this.line = lineNum
          })
          // console.log(this.lyric.lrc)
          this.lyric.seek(this.playTime)
          this.$root.$lyric = this.lyric
        })
      },
    },
    components: {
      FooterBar
    },
    watch: {
      'currentAudio.id': {
        handler(val) {
          this.lyric && this.lyric.stop()
          this.lyric = null
          this.line = 0
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
      // 'playTime': {
      //   handler(val) {
      //     this.lyric && this.lyric.seek(val)
      //   }
      // }
    }
  }
</script>
<style lang="scss" scoped>
@import '../../common/css/var.scss';
.main-layout{
  display: flex;
  flex-direction: column;
  height: 100%;
  .main{
    height: 0;
    flex: 1;
    display: flex;
    background: $dark1;
  }
}
</style>