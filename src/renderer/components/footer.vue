<template>
  <div class="footer flex align-center">
    <div class="control flex between align-center">
      <i @click="handlePre" class="el-icon-caret-left pointer" style="font-size:24px;"></i>
      <i @click="handlePlay" :class="audioPlaying?'el-icon-video-pause':'el-icon-video-play'" class="pointer" style="font-size:36px"></i>
      <i @click="handleNext" class="el-icon-caret-right pointer" style="font-size:24px"></i>
    </div>
    <div class="progress flex align-center" style="width:450px">
      <span>{{playTime|songLength}}</span>
      <el-slider
        v-model="progress"
        class="flex-left"
        style="margin:0 10px 0 15px"
        :min="0"
        :show-tooltip="false"
        :max="currentAudio.dt/1000"
        @change="handleSeek"/>
      <span>{{currentAudio.dt|songLength}}</span>
    </div>
    <div class="flex align-center" style="width:200px">
      <el-slider
        v-model="volume"
        class="flex-left"
        style="margin:0 10px 0 15px"
        :min="0"
        :max="100"
        @change="handleVolumeChange"/>
    </div>
    <div class="pointer" @click="toggleMode">
      <el-tag effect="dark">{{modeObj[this.playMode]}}</el-tag>
    </div>
    <div v-if="listAudio.length" @click="showSongSheet=!showSongSheet">
      歌单-{{listAudio.length}}
    </div>

    <dialog-sheet v-model="showSongSheet" />
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import DialogSheet from './dialog-song-sheet'

export default {
  created() {
    this.modeObj = {
      1: '顺序播放',
      2: '列表循环',
      3: '单曲循环',
      4: '随机播放',
    }
  },
  data() {
    return {
      volume: this.$local.get('volume') || 49,
      progress: 0,
      showSongSheet: false
    }
  },
  computed: {
    ...mapState('play', ['currentAudio', 'playTime', 'audioPlaying', 'listAudio', 'playMode']),
  },
  methods: {
    ...mapMutations('play', ['setAudioPlaying', 'setPlayMode']),
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
      this.$root.$lyric && this.$root.$lyric.seek(val*1000)
    },
    handleVolumeChange(val) {
      this.$root.$audio.volume = val/100
      this.$local.set('volume', val)
    },
    toggleMode() {
      this.setPlayMode(this.playMode + 1 === 5 ? 1 : this.playMode + 1)
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