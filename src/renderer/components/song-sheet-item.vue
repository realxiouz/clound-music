<template>
  <div>
    <div style="width: 140px; height: 140px" class="pos-r text-center">
      <template v-if="date">
        <span>{{weekStr}}</span>
        <br/>
        <span>{{dateStr}}</span>
      </template>
      <template v-else>
        <el-image
          style="width: 140px; height: 140px"
          :src="bean.picUrl"
          fit="fill"
        />
        <i class="el-icon-video-play pos-a" style="right:5px;bottom:5px"/>
      </template>
    </div>
    <div style="width:140px">
      {{date?'每日歌曲推荐':bean.name}}
    </div>
  </div>
</template>

<script>
const week = {
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
  7: '星期天',
}
export default {
  props: {
    bean: {
      type: Object,
      default: _ => ({})
    },
    date: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      weekStr: week[new Date().getDay()],
      dateStr: new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>