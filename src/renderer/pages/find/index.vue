<template>
  <div>
    <el-tabs>
      <el-tab-pane label="个性推荐">
        <recommend />
      </el-tab-pane>
      <el-tab-pane label="歌单" lazy>
        <sheet />
      </el-tab-pane>
      <el-tab-pane label="歌手" lazy>
        <artist />
      </el-tab-pane>
      <el-tab-pane label="排行榜" lazy>
        <top />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Recommend from './components/recommend'
import Artist from './components/artist'
import Sheet from './components/sheet'
import Top from './components/top'

export default {
  components: {
    Recommend,
    Artist,
    Sheet,
    Top,
  }
}
</script>