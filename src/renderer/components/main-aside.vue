<template>
  <div class="main-wrap flex direction">
    <div style="height:0;flex:1">
      <div v-for="(i, inx) in menu" :key="inx">
        <div class="f-title">{{i.text}}</div>
        <div class="s-title" :class="$route.path == item.path ? 'active':''" v-for="(item, index) in i.subs" :key="`${inx}-${index}`" @click="$router.push({path: item.path})">
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
        path: `/song-detail`
      })
    }
  },
}
</script>

<style lang="scss" scoped>
 @import '../common/css/var.scss';
 .main-wrap{
   background: $dark2;
   width:200px;
   border-right: 1px solid #23262C;
 }

 .f-title{
   padding: 10px;
 }
 .s-title{
   padding: 10px 15px;
   border-left: 4px solid;
   border-color: transparent;
   background-color: transparent;
   cursor: pointer;
   &.active{
     border-color: $primary1;
     background-color: #26282C;
   }
 }
</style>
