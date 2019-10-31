<template>
  <div class="main-wrap flex direction">
    <div style="height:0;flex:1">
      <div v-for="(i, inx) in menu" :key="inx">
        <div class="f-title">{{i.text}}</div>
        <div class="s-title" :class="$route.path == item.path ? 'active':''" v-for="(item, index) in i.subs" :key="`${inx}-${index}`" @click="$router.push({path: item.path})">
          {{item.text}}
        </div>
      </div>

      <div v-if="mySheets.length">
        <div class="f-title flex between pointer" @click="showSheets=!showSheets">
          <span>收藏的歌单</span>
          <i :class="showSheets?'el-icon-arrow-down':'el-icon-arrow-right'"/>
        </div>
        <div v-if="showSheets">
          <div
            class="s-title text-dot"
            :class="$route.query.id == item.id ? 'active':''"
            v-for="(item, inx) in mySheets"
            :key="inx"
            @click="$router.push({path: `/main/sheet?id=${item.id}`})"
          >
            <icon-svg name="sheet" style="font-size:14px" />&nbsp;{{item.name}}
          </div>
        </div>
      </div>
    </div>
    <div class="mini-player flex align-center" v-if="listAudio.length" >
      <el-image :src="currentAudio.al.picUrl" style="width:45px;height:45px;margin-right:4px"></el-image>
      <div class="flex-left flex direction between" style="height:36px">
          <span class="song text-dot" @click="handleDetail">{{currentAudio.name}}</span>
          <span class="artist text-dot" @click="handleArtist">{{currentAudio.ar[0].name}}</span>
      </div>
      <span style="font-size:20px" :class="{'color-p': currentAudio.like}" class="pointer" @click="handleLike">
        <icon-svg name="like"></icon-svg>
      </span>
    </div>
  </div>
</template>

<script>
import menu from '@/common/data/menu'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      menu,
      showSheets: true
    }
  },
  computed: {
    ...mapState('play', ['currentAudio', 'listAudio', 'likeList', 'mySheets']),
    isLike() {
      return this.currentAudio.id && this.likeList.findIndex(i => i === this.currentAudio.id) > -1
    }
  },
  methods: {
    ...mapMutations('artist', ['setCurrent']),
    ...mapActions('play', ['toggleLike']),
    handleDetail() {
      this.$router.push({
        path: `/song-detail`
      })
    },
    handleArtist() {
      this.setCurrent(this.currentAudio.ar[0])
      this.$router.push({
        path: `/main/artist-detail/${this.currentAudio.ar[0].id}`
      })
    },
    handleLike() {
      this.toggleLike()
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

 .mini-player{
   padding: 5px;
   border-top: 1px solid $light2;
   .song{
     color: $light1;
   }
   .artist{
     color: $light2;
     &:hover{
       color: $light1;
     }
   }
 }
</style>
