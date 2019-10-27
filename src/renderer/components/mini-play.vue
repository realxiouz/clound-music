<template>
  <div>
    <div class="flex main align-center">
      <el-image :src="currentAudio.al.picUrl" class="img-alb drag"></el-image>
      <div class="toggle" style="width:100px">
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
    </div>
    <div class="lyric text-dot drag" v-if="lyric">{{lyric}}</div>
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
  background-color: $dark1;
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
    background-color: $dark1;
    text-align: center;
    color: $light1;
    padding: 0 5px;
    height: 30px;
    line-height: 30px;
  }
</style>