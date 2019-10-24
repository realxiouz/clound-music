<template>
  <div style="padding:0 30px;">
    <el-tabs>
      <el-tab-pane label="个性推荐">
        <recommend />
      </el-tab-pane>
      <el-tab-pane label="歌单">
        songs
      </el-tab-pane>
      <el-tab-pane label="歌手" lazy>
        <artist />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Recommend from './components/recommend'
import Artist from './components/artist'

export default {
  components: {
    Recommend,
    Artist,
  }
}
</script>