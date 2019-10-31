<template>
  <div class="song-item">
    <div style="width: 140px; height: 140px" class="pos-r text-center" @click="handleSheetDetail">
      <template v-if="date">
        <div style="height:100%;background:#fff">
          <div class="text-center" style="padding:20px 0 15px">{{weekStr}}</div>
          <div class="text-center" style="font-size:45px;color:red;font-weight:bold">{{dateStr}}</div>
        </div>
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
    <div class="line2" style="margin:8px 0 3px">
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
  },
  methods: {
    handleSheetDetail() {
      this.$router.push({path: `/main/sheet?id=${this.bean.id}`})
    }
  }
}
</script>

<style lang="scss" scoped>
  .song-item{
    width: 140px;
    padding: 0 0 16px 16px;
    // float: left;
  }
</style>