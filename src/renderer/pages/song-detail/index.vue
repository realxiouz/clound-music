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
            <div>
              <div
                v-for="(i, inx) in lyricLines"
                :key="inx"
                :id="`lyric${inx}`"
                class="lyric"
                :class="{active:currentLine===inx}"
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
  import { mapState, mapMutations } from 'vuex'

  export default {
    data() {
      return {
        nolyric: false,
        scroll: null
      }
    },
    computed: {
      ...mapState('play', ['playTime', 'currentAudio', 'audioPlaying', 'lyricLines', 'currentLine']),
      ...mapState('mini', ['miniId'])
    },
    methods: {
      ...mapMutations('artist', ['setCurrent']),
      
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
      'lyricLines': {
        handler(val) {
          this.$nextTick(_ => {
            this.scroll ? this.scroll.refresh() : this.scroll = new BScroll('#wrap')
          })
        },
        immediate: true
      },
      'currentLine': {
        handler(val) {
          this.scroll && this.scroll.scrollToElement(`#lyric${val}`, 300, null, true)
        }
      }
    },
    beforeDestroy() {
      this.scroll && this.scroll.destroy()
    },
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