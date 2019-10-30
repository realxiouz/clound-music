<template>
  <div>
    <el-tabs>
      <el-tab-pane label="歌手">用户管理</el-tab-pane>
      <el-tab-pane label="歌曲">配置管理</el-tab-pane>
      <el-tab-pane label="专辑">角色管理</el-tab-pane>
      <el-tab-pane label="视屏">定时任务补偿</el-tab-pane>
      <el-tab-pane label="歌单">定时任务补偿</el-tab-pane>
      <el-tab-pane label="歌词">定时任务补偿</el-tab-pane>
      <el-tab-pane label="主播电台">定时任务补偿</el-tab-pane>
      <el-tab-pane label="用户">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {searchKeyword} from '@/common/api'

export default {
  data() {
    return {
      
    }
  },
  methods: {
    _getData() {
      let data = {
        keywords: this.$route.params.kw,
        type: 1, // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
      }
      searchKeyword(data).then(r => {

      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm._getData()
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.$nextTick(_ => {
      this._getData()
    })
    next()
  },
}
</script>