<template>
  <div>
    <banner />
    <div class="flex direction">
      <song-sheet :style="{order: $store.state.setting.order.findIndex(i=>i==='推荐歌单')}" />
      <private-mv :style="{order: $store.state.setting.order.findIndex(i=>i==='推荐MV')}" />
      <private-content :style="{order: $store.state.setting.order.findIndex(i=>i==='独家放送')}" />
      <private-dj :style="{order: $store.state.setting.order.findIndex(i=>i==='主播电台')}" />
    </div>
    <div class="text-center" style="padding-bottom:20px">
      <div style="padding:15px">现在可以根据个人喜好,自由调整栏目顺序了~</div>
      <el-button type="primary" @click="showSort=true">调整栏目顺序</el-button>
    </div>
    <el-dialog title="调整栏目顺序" width="300px" :visible.sync="showSort" :show-close="true">
      <draggable v-model="orderSync">
        <transition-group>
          <div v-for="(i, inx) in orderSync" :key="inx" class="flex align-center between" style="height:30px">
            <span>{{i}}</span>
            <i class="el-icon-s-operation" />
          </div>
        </transition-group>
      </draggable>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="$store.commit('setting/setOrder', orderSync);showSort=false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Banner from '@/components/banner'
import SongSheet from '@/components/song-sheet'
import PrivateContent from '@/components/private-content'
import PrivateDj from '@/components/private-dj'
import PrivateMv from '@/components/private-mv'
import draggable from 'vuedraggable'

export default {
  mounted() {
    this.orderSync = [...this.$store.state.setting.order]
  },
  data() {
    return {
      showSort: false,
      orderSync: []
    }
  },
  components: {
    draggable, Banner, SongSheet, PrivateContent, PrivateDj, PrivateMv
  }
}
</script>
