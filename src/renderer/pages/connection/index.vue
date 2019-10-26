<template>
  <div>
    <el-tabs>
      <el-tab-pane label="专辑" lazy>
        <panel :type="0" />
      </el-tab-pane>
      <el-tab-pane label="歌手" lazy>
        <panel :type="1" />
      </el-tab-pane>
      <!-- <el-tab-pane label="视屏" lazy>
        <a-desc class="px-30" :a-id="current.id"/>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import Panel from './components/connection-panel'
export default {
  components: {
    Panel
  }
}
</script>