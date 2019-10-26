<template>
  <div class="wrap" :class="{odd: isOdd}">
    <div v-if="type===0" class="flex align-center fill-parent" >
      <el-image class="pic" :src='bean.picUrl'></el-image>
      <div style="width:400px">{{bean.name}}</div>
      <div style="width:190px">{{bean.artists[0].name}}</div>
      <div>{{bean.size}}首</div>
    </div>
    <div v-if="type===1" class="flex align-center fill-parent" @click="handleArtist">
      <el-image class="pic" :src='bean.picUrl'></el-image>
      <div style="width:400px">{{bean.name}}</div>
      <div style="width:190px">专辑:&nbsp;{{bean.albumSize}}</div>
      <div>MV:&nbsp;{{bean.mvSize}}</div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  props: {
    bean: {
      type: Object
    },
    type: {
      type: Number
    },
    isOdd: {
      type: Boolean
    }
  },
  methods: {
    ...mapMutations('artist', ['setCurrent']),
    handleArtist() {
      this.setCurrent(this.bean)
      this.$router.push({
        path: `/main/artist-detail/${this.bean.id}`
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.wrap{
  height: 60px;
  background: #1A1C20;
  cursor: pointer;
  &:hover{
    background: #232529;
  }
  &.odd{
    &:hover{
      background: #232529;
    }
    background-color: #16181C;
  }
}

.pic{
  width:40px;
  height:40px;
  margin: 0 10px 0 30px;
}
  
</style>