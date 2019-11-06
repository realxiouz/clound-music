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
      <div class="img-wrap pointer" @click="showSongDetail">
        <img :src="currentAudio.al.picUrl" style="width:100%;height:100%;" v-show="currentAudio.al.picUrl"/>
        <div class="icon-wrap">
          <icon-svg name="big"/>
        </div>
      </div>
      <div class="flex-left flex direction between" style="height:36px">
          <span class="song text-dot pointer" @click="showSongDetail">{{currentAudio.name}}</span>
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
    ...mapMutations('play', ['setShowSongDetail']),
    ...mapActions('play', ['toggleLike']),
    handleArtist() {
      this.setCurrent(this.currentAudio.ar[0])
      this.$router.push({
        path: `/main/artist-detail/${this.currentAudio.ar[0].id}`
      })
    },
    handleLike() {
      this.toggleLike()
    },
    showSongDetail() {
      this.setShowSongDetail(true)
    }
  },
}
</script>

<style lang="scss" scoped>
 @import '../common/css/var.scss';
 .img-wrap{
   width:45px;
   height:45px;
   margin-right:4px;
   position: relative;
   &:hover{
     .icon-wrap{
       display: flex;
     }
   }
   .icon-wrap{
     display: none;
     position: absolute;
     top: 0;
     bottom: 0;
     left: 0;
     right: 0px;
     background: rgba(0,0,0,.6);
     align-items: center;
     justify-content: space-around;
     font-size: 32px;
   }
 }
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
