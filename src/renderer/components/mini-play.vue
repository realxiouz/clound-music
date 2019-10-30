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
        <span style="font-size:20px" :class="{'color-p': currentAudio.like}" class="pointer no-drag" @click="handleLike">
          <icon-svg name="like"></icon-svg>
        </span>
        <i class="no-drag pointer" style="font-size:20px" :title="modeObj[playMode].title" @click="toggleMode">
          <icon-svg :name="modeObj[playMode].name" />
        </i>
        <i class="el-icon-rank pointer no-drag" style="font-size:20px;" @click="max" title="完整模式"></i>
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
    this.$electron.ipcRenderer.on('miniId', (e, a) => {
      this.setMiniId(a)
    })
    this.$electron.ipcRenderer.on('audio', (e, a) => {
      this.setCurrentAudio(JSON.parse(a))
    })
    this.$electron.ipcRenderer.on('lyric', (e, a) => {
      this.lyric = a
    })

    this.$electron.ipcRenderer.on('playMode', (e, a) => {
      this.playMode = a
    })
    
    this.modeObj = {
      1: {name: 'play-order', title: '顺序播放'},
      2: {name: 'play-list', title: '列表循环'},
      3: {name: 'play-single', title: '单曲循环'},
      4: {name: 'play-random', title: '随机播放'},
    }
  },
  computed: {
    ...mapState('play', ['currentAudio']),
    ...mapState('mini', ['mainId', 'miniId']),
  },
  methods: {
    ...mapMutations('play', ['setCurrentAudio']),
    ...mapMutations('mini', ['setMainId', 'setMiniId']),
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
      this.$electron.remote.BrowserWindow.fromId(this.mainId).show()
      this.$electron.remote.BrowserWindow.fromId(this.miniId).hide()
    },
    toggleMode() {
      this.mainId && this.$electron.remote.BrowserWindow.fromId(this.mainId).webContents.send('toggleModeFromMini')
    },
    handleLike() {
      this.mainId && this.$electron.remote.BrowserWindow.fromId(this.mainId).webContents.send('likeFromMini')
    }
  },
  data() {
    return {
      lyric: '',
      audioPlaying: true,
      playMode: 1
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