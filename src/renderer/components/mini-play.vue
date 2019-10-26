<template>
  <div>
    <div class="flex main">
      <el-image :src="currentAudio.al.picUrl" class="img-alb"></el-image>
    </div>
    <div class="" v-if="lyric">{{lyric}}</div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  created() {
    this.$electron.ipcRenderer.send('mini-done')
    
    this.$electron.ipcRenderer.on('mainId', (e, a) => {
    })
    this.$electron.ipcRenderer.on('audio', (e, a) => {
      this.setCurrentAudio(JSON.parse(a))
    })
    this.$electron.ipcRenderer.on('lyric', (e, a) => {
      this.lyric = a
    })
    
  },
  computed: {
    ...mapState('play', ['currentAudio'])
  },
  methods: {
    ...mapMutations('play', ['setCurrentAudio'])
  },
  data() {
    return {
      lyric: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  height: 44px;
  .img-alb{
    width: 44px;
    height: 44px;
  }
}
</style>