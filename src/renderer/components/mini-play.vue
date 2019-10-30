<template>
  <div style="background-color: #292C33" class="drag">
    <div class="flex main align-center">
      <el-image :src="currentAudio.al.picUrl" class="img-alb"></el-image>
      <div class="toggle no-drag" style="width:160px;height:100%;">
        <div class="action flex align-center between no-drag" style="width:100%;height:100%">
          <i @click="pre" class="el-icon-caret-left pointer" style="font-size:24px;"></i>
          <i @click="togglePlay" :class="audioPlaying?'el-icon-video-pause':'el-icon-video-play'" class="pointer" style="font-size:36px"></i>
          <i @click="next" class="el-icon-caret-right pointer" style="font-size:24px"></i>
        </div>
        <div class="info flex direction between">
          <div class="song text-dot">{{currentAudio.name}}</div>
          <div class="ar text-dot">{{currentAudio.ar[0].name}}</div>
        </div>
      </div>
      <div class="flex-left flex align-center between" style="padding: 0 5px">
        <i class="el-icon-star-on pointer no-drag" style="font-size:24px;"></i>
        <i class="el-icon-minus pointer no-drag" style="font-size:24px;" @click="min"></i>
        <i class="el-icon-rank pointer no-drag" style="font-size:24px;" @click="max"></i>
      </div>
    </div>
    <div class="lyric text-dot">{{lyric}}</div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  created() {
    this.$electron.ipcRenderer.send('mini-done')
    
    this.$electron.ipcRenderer.on('mainId', (e, a) => {
      this.setMainId(a)
    })
    this.$electron.ipcRenderer.on('audio', (e, a) => {
      this.setCurrentAudio(JSON.parse(a))
    })
    this.$electron.ipcRenderer.on('lyric', (e, a) => {
      this.lyric = a
    })
    
  },
  computed: {
    ...mapState('play', ['currentAudio']),
    ...mapState('mini', ['mainId']),
  },
  methods: {
    ...mapMutations('play', ['setCurrentAudio']),
    ...mapMutations('mini', ['setMainId']),
    next() {
      this.mainId && this.$electron.remote.BrowserWindow.fromId(this.mainId).webContents.send('nextFromMini')
    },
    pre() {
      this.mainId && this.$electron.remote.BrowserWindow.fromId(this.mainId).webContents.send('preFromMini')
    },
    togglePlay() {
      this.mainId && this.$electron.remote.BrowserWindow.fromId(this.mainId).webContents.send('toggleFromMini')
      this.audioPlaying = !this.audioPlaying
    },
    max() {
      this.$electron.remote.BrowserWindow.fromId(1).show()
      this.$electron.remote.BrowserWindow.fromId(2).hide()
    },
    min() {
      this.$electron.remote.BrowserWindow.fromId(2).hide()
    }
  },
  data() {
    return {
      lyric: '',
      audioPlaying: true,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../common/css/var.scss';
.main{
  height: 44px;
  .img-alb{
    width: 44px;
    height: 44px;
  }

  .toggle{
    .action{
      display: none;
      padding: 0 20px;
      box-sizing: border-box;
    }
    .info{
      display: flex;
      padding: 5px 10px;
      box-sizing: border-box;
      height: 100%;
      .song{
        color: $light1;
        font-size: 14px;
      }
      .ar{
        color: $light2;
      }
    }
    &:hover{
      .info{
        display: none;
      }
      .action{
        display: flex;
      }
    }
  }
}
.lyric{
    text-align: center;
    color: $light1;
    padding: 0 5px;
    height: 30px;
    line-height: 30px;
  }
</style>