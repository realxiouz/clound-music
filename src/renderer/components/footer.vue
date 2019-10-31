<template>
  <div class="footer flex align-center">
    <div class="control flex between align-center">
      <i @click="handlePre" class="el-icon-caret-left pointer" style="font-size:24px;" title="上一首"></i>
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
    <div class="flex align-center" style="width:150px;margin-left:20px">
      <span style="font-size:16px">
        <icon-svg :name="volume===0?'volume-mute':'volume-up'" />
      </span>
      <el-slider
        v-model="volume"
        class="flex-left"
        style="margin:0 10px 0 15px"
        :min="0"
        :max="100"
        @change="handleVolumeChange"/>
    </div>
    <i class="pointer" style="font-size:20px;margin-right:20px" :title="modeObj[playMode].title" @click="toggleMode">
      <icon-svg :name="modeObj[playMode].name" />
    </i>

    <div class="flex align-center pointer" v-if="listAudio.length" @click="showSongSheet=!showSongSheet" title="双击切歌">
      <i style="font-size:20px">
        <icon-svg name="sheet" />
      </i>
      <span>&nbsp;<span class="color-p">{{indexAudio+1}}</span>/{{listAudio.length}}</span>
    </div>
    
    <dialog-sheet v-model="showSongSheet" />
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import DialogSheet from './dialog-song-sheet'
import { PLAY_MODE } from '@/common/data/const'

export default {
  created() {
    this.modeObj = PLAY_MODE
  },
  data() {
    return {
      volume: this.$local.get('volume') || 49,
      progress: 0,
      showSongSheet: false
    }
  },
  computed: {
    ...mapState('play', ['currentAudio', 'playTime', 'audioPlaying', 'listAudio', 'playMode', 'indexAudio']),
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
      let mode = this.playMode + 1 === 5 ? 1 : this.playMode + 1
      this.setPlayMode(mode)
      this.$local.set('playMode', mode)
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