<template>
  <div style="background-color: #292C33">
    <div class="flex main align-center">
      <el-image :src="currentAudio.al.picUrl" class="img-alb drag"></el-image>
      <div class="toggle" style="width:100px;height:100%;">
        <div class="action">
          <el-tag @click="pre">x</el-tag>
          <el-tag @click="togglePlay">p</el-tag>
          <el-tag @click="next">n</el-tag>
        </div>
        <div class="info">
          <div>{{currentAudio.name}}</div>
          <div>{{currentAudio.ar[0].name}}</div>
        </div>
      </div>
      <div>
        <el-tag @click="max">max</el-tag>
        <el-tag @click="min">max</el-tag>
      </div>
    </div>
    <div class="lyric text-dot drag">{{lyric}}</div>
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
      lyric: ''
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
    }
    .info{
      display: block;
    }
    &:hover{
      .info{
        display: none;
      }
      .action{
        display: block;
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