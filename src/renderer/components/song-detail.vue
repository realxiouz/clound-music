<template>
  <transition name="zoom">
    <div class="song-detail-dialog" v-show="showSongDetail">
      <div class="flex" style="width:100%">
        <div class="flex-left"></div>
        <div>
          <div>
            <div>{{currentAudio.name}}</div>
            <div @click="handleAlbum">专辑:{{currentAudio.al.name}}</div>
            <div @click="handleArtist">歌手:{{currentAudio.ar[0].name}}</div>
            <div @click="handleSheet">来源:{{}}</div>
            <!-- <el-button @click="closeDialog">close</el-button> -->
            <div class="pointer" style="font-size:32px" @click="closeDialog">
              <icon-svg name="small"/>
            </div>
            
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
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import { mapState, mapMutations } from 'vuex'

  export default {
    data() {
      return {
        nolyric: false,
        scroll: null
      }
    },
    computed: {
      ...mapState('play', ['playTime', 'currentAudio', 'audioPlaying', 'lyricLines', 'currentLine', 'showSongDetail']),
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
      handleSheet() {},
      closeDialog() {
        // this.setShowSongDetail(false)
        this.$store.commit('play/setShowSongDetail', false)
      }
    },
    components: {
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
@import '../common/css/var.scss';

.song-detail-dialog{
  background: $dark1;
  position: fixed;
  z-index: 100;
  top:52px;
  bottom: 50px;
  left: 0;
  right: 0;
  transform-origin: 5px 563px;
}

.zoom-enter-active,
.zoom-leave-active {
  transition: transform .5s ;
}
.zoom-enter,
.zoom-leave-active {
  transform: scale(0);
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