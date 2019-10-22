<template>
  <div style="background: gray;width:200px" class="flex direction">
    <div style="height:0;flex:1">
      <div v-for="(i, inx) in menu" :key="inx">
        <div>{{i.text}}</div>
        <div v-for="(item, index) in i.subs" :key="`${inx}-${index}`" @click="$router.push({path: item.path})">
          {{item.text}}
        </div>
      </div>
    </div>
    <div style="padding:5px" class="flex" v-if="listAudio.length" @click="handleDetail">
      <el-image :src="currentAudio.al.picUrl" style="width:45px;height:45px;margin-right:5px"></el-image>
      <div class="flex-left">
        <div>
          <span>{{currentAudio.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menu from '@/common/data/menu'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      menu
    }
  },
  computed: {
    ...mapState('play', ['currentAudio', 'listAudio'])
  },
  methods: {
    handleDetail() {
      this.$router.push({
        path: `/song-detail/${this.currentAudio.id}`
      })
    }
  }
}
</script>


