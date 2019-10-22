<template>
  <div class="footer flex">
    <div class="control flex between">
      <el-button type="primary" icon="el-icon-edit" circle @click="handlePre"></el-button>
      <el-button type="primary" icon="el-icon-edit" circle @click="handlePlay"></el-button>
      <el-button type="primary" icon="el-icon-edit" circle @click="handleNext"></el-button>
    </div>
    <div class="progress flex" style="width:450px">
      <span>{{playTime|songLength}}</span>
      <el-slider v-model="progress" class="flex-left" :min="0" :max="currentAudio.dt/1000" @change="handleSeek"></el-slider>
      <span>{{currentAudio.dt|songLength}}</span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      progress: 0
    }
  },
  computed: {
    ...mapState('play', ['currentAudio', 'playTime']),
  },
  methods: {
    ...mapActions('play', ['playNextAudio', 'playPreAudio']),
    handleNext() {
      this.playNextAudio()
    },
    handlePre() {
      this.playPreAudio()
    },
    handlePlay() {
      this.$root.$audio.pause()
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