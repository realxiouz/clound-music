<template>
  <div class="footer flex align-center">
    <div class="control flex between">
      <el-button type="primary" icon="el-icon-edit" circle @click="handlePre"></el-button>
      <el-button type="primary" icon="el-icon-edit" circle @click="handlePlay"></el-button>
      <el-button type="primary" icon="el-icon-edit" circle @click="handleNext"></el-button>
    </div>
    <div class="progress flex align-center" style="width:450px">
      <span>{{playTime|songLength}}</span>
      <el-slider
        v-model="progress"
        class="flex-left"
        style="margin:0 10px 0 15px"
        :min="0"
        :max="currentAudio.dt/1000"
        @change="handleSeek"/>
      <span>{{currentAudio.dt|songLength}}</span>
    </div>
    <div class="flex-left"></div>
    <div v-if="listAudio.length" @click="showSongSheet=true">
      歌单-{{listAudio.length}}
    </div>

    <dialog-sheet v-model="showSongSheet" />
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import DialogSheet from './dialog-song-sheet'

export default {
  data() {
    return {
      progress: 0,
      showSongSheet: false
    }
  },
  computed: {
    ...mapState('play', ['currentAudio', 'playTime', 'audioPlaying', 'listAudio']),
  },
  methods: {
    ...mapMutations('play', ['setAudioPlaying']),
    ...mapActions('play', ['playNextAudio', 'playPreAudio']),
    handleNext() {
      this.playNextAudio()
    },
    handlePre() {
      this.playPreAudio()
    },
    handlePlay() {
      if (this.audioPlaying) {
        this.$root.$audio.pause()
        this.setAudioPlaying(false)
      } else {
        this.$root.$audio.play()
        this.setAudioPlaying(true)
      }
    },
    handleSeek(val) {
      this.$root.$audio.currentTime = val
    }
  },
  watch: {
    playTime(val) {
      this.progress = val/1000
    }
  },
  components: {
    DialogSheet
  }
}
</script>

<style lang="scss" scoped>
  .footer{
    height: 50px;
    background: #222225;
    color: #fff;

    .control{
      width: 200px;
      box-sizing: border-box;
      padding: 7px 30px;
    }
  }
</style>