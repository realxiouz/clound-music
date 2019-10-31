<template>
  <div class='outter flex between'>
    <div class="left">
      <div>
        <el-tag>MV</el-tag>
        <span>{{mv.name}}</span>
        <span>{{mv.artistName}}</span>
      </div>
      <div class="video-wrap">
        <video style="width:690px;height:394px;background:#000;" :src="mv.url" controls autoplay></video>
      </div>
      <div>

      </div>
    </div>
    <div class="right">
      <div class="title">MV介绍</div>
      <div class="time-count felx between">
        <div>发布时间:</div>
        <div>访问次数:</div>
      </div>
      <div class="desc">
        简介:{{}}
      </div>
      
    </div>
  </div>
</template>

<script>
import {getMvDetail, getMvUrl} from '@/common/api'
import { mapState, mapMutations} from 'vuex'

export default {
  created() {
    this._getData()
    if (this.audioPlaying) {
      this.$root.$audio && this.$root.$audio.pause()
      this.setAudioPlaying(false)
    }
  },
  data() {
    return {
      mv: {}
    }
  },
  methods: {
    ...mapMutations('play', ['setAudioPlaying']),
    _getData() {
      let id = this.$route.params.id
      Promise.all([
        getMvDetail({mvid: id}),
        getMvUrl({id})
      ]).then(arr => {
        this.mv = arr[0].data
        this.mv.url = arr[1].data.url
      })
    }
  },
  computed: {
    ...mapState('play', ['audioPlaying'])
  },
}
</script>

<style lang="scss" scoped>
@import '../../common/css/var.scss';

.outter{
  width: 975px;
  margin:0 auto;
  padding: 25px 0;
  background: $dark1;
  .left{
    width: 690px;
  }
  .right{
    width: 255px;
  }
}
</style>