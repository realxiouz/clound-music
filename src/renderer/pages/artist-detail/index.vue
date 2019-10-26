<template>
  <div>
    <div class="pa-30 flex">
      <el-image style="width:200px;height:200px" :src="current.picUrl" class="mr-30"></el-image>
      <div class="flex-left">
        <div class="flex">
          <div>
            <el-tag>歌手</el-tag>
            <span>{{current.name}}</span>
          </div>
          <button @click="handleSub">{{current.followed?'已收藏':'收藏'}}</button>
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
        <album class="px-30" :a-id="current.id"/>
      </el-tab-pane>
      <el-tab-pane label="MV" lazy>
        <mv class="px-30" :a-id="current.id"/>
      </el-tab-pane>
      <el-tab-pane label="歌手详情" lazy>
        <a-desc class="px-30" :a-id="current.id"/>
      </el-tab-pane>
      <el-tab-pane label="相似歌手" lazy>
        <similar class="px-30" :a-id="current.id"/>
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
import { artistSub } from '@/common/api'

export default {
  computed: {
    ...mapState('artist', ['current']),
  },
  methods: {
    handleSub() {
      if (this.current.followed) {
        // cancel
        return
      }
      let p = {
        id: this.current.id,
        t: 1
      }
      artistSub(p).then(r => {
        
      })
    }
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