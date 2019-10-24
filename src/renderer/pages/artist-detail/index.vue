<template>
  <div>
    <div class="pa-30 flex">
      <el-image style="width:200px;height:200px" :src="current.picUrl" class="mr-30"></el-image>
      <div class="flex-left">
        <div>
          <div>
            <el-tag>歌手</el-tag>
            <span>{{current.name}}</span>
          </div>
          
        </div>
        <div>
          单曲数:{{current.musicSize}}
        </div>
        <div>
          专辑数:{{current.albumSize}}
        </div>
      </div>
    </div>
    <el-tabs>
      <el-tab-pane label="专辑" lazy>
        <album :a-id="current.id"/>
      </el-tab-pane>
      <el-tab-pane label="MV" lazy>
        <mv :a-id="current.id"/>
      </el-tab-pane>
      <el-tab-pane label="歌手详情" lazy>
        <a-desc :a-id="current.id"/>
      </el-tab-pane>
      <el-tab-pane label="相似歌手" lazy>
        <similar :a-id="current.id"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Album from '@/components/artist-album'
import Mv from '@/components/artist-mv'
import Similar from '@/components/artist-similar'
import ADesc from '@/components/artist-desc'

export default {
  computed: {
    ...mapState('artist', ['current']),
  },
  components: {
    Album,
    ADesc,
    Mv,
    Similar
  }
}
</script>

<style lang="scss" scoped>

  
</style>