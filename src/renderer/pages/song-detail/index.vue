<template>
  <div class="main-layout">
    <div style="flex:1;overflow-y:auto" class="main">
      <div class="flex" style="width:100%">
        <div class="flex-left"></div>
        <div>
          <div>
            <div>{{currentAudio.name}}</div>
            <div @click="handleAlbum">专辑:{{currentAudio.al.name}}</div>
            <div @click="handleArtist">歌手:{{currentAudio.ar[0].name}}</div>
            <div @click="handleSheet">来源:{{}}</div>
          </div>
          <div class="lyric-wrap" style="width:400px;height:364px;overflow:hidden;margin-top:20px" id="wrap">
            <div v-if="lyric&&lyric.lines&&lyric.lines.length">
              <div
                v-for="(i, inx) in lyric.lines"
                :key="inx"
                :id="`lyric${inx}`"
                class="lyric"
                :class="{active: line=== inx}"
              >
                {{i.txt}}
              </div>
            </div>
            <div class="lyric" v-if="nolyric">歌曲没有歌词</div>
          </div>
        </div>
      </div>
    </div>
    <footer-bar />
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import FooterBar from '@/components/footer'
  import { getSongLyric } from '@/common/api'
  import Lyric from '@/common/js/lyric'
  import { mapState, mapMutations } from 'vuex'

  export default {
    data() {
      return {
        lyric: null,
        line: 0,
        nolyric: false,
        scroll: null
      }
    },
    computed: {
      ...mapState('play', ['playTime', 'currentAudio', 'audioPlaying']),
      ...mapState('mini', ['miniId'])
    },
    methods: {
      ...mapMutations('artist', ['setCurrent']),
      _getLyric(id) {
        getSongLyric({id}).then(r => {
          if (r.nolyric) {
            this.nolyric = true
            return
          }
          this.nolyric = false
          this.lyric = new Lyric(r.lrc.lyric, ({lineNum, txt}) => {
            this.line = lineNum
            this.miniId && this.$electron.remote.BrowserWindow.fromId(this.miniId).webContents.send('lyric', txt)
          })
          if (!this.lyric.lines.length) {
            // todo lyric parse err
            console.log(this.lyric.lrc)
            console.log(this.lyric.lines)
          }
          this.lyric.seek(this.playTime)
          this.$root.$lyric = this.lyric
          this.$nextTick(_ => {
            this.scroll = new BScroll('#wrap')
          })
        })
      },
      handleArtist() {
        this.setCurrent(this.currentAudio.ar[0])
        this.$router.push({
          path: `/main/artist-detail/${this.currentAudio.ar[0].id}`
        })
      },
      handleAlbum() {
      },
      handleSheet() {}
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
          this.scroll && this.scroll.destroy()
          this.scroll = null
        },
        immediate: true
      },
      'audioPlaying': {
        handler(val) {
          this.lyric && this.lyric.togglePlay()
        }
      },
      'line': {
        handler(val) {
          this.scroll && this.scroll.scrollToElement(`#lyric${val}`, 300, null, true)
        }
      }
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

.lyric{
  font-size: 14px;
  line-height: 2;
  color: $light2;
  &.active{
    color: $light1;
  }
}
</style>