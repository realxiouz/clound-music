<template>
  <div>
    <div>
      <div class="cur-song-wrap">
        <img src="http://p2.music.126.net/qnfmceDCf6iJSh-AVt5Fjw==/109951163076131707.jpg" class="cur-song" :class="`step${step}`">
        <!-- <img src="https://p2.music.126.net/lzG7aYBCvm7dgTed_3Eu3w==/109951164371998525.jpg" class="cur-song"> -->
      </div>
    </div>
    <div style="margin-top:100px">
      <button @click="handleNext">next</button>
      <button @click="handleNext1">next</button>
    </div>
  </div>
</template>

<script>
import {personalFm} from '@/common/api'

export default {
  created() {
    this._getData()
  },
  data() {
    return {
      curSong: {},
      preSong: {},
      arr: [],
      cls: ['cur-song', 'before'],
      step: 0,
    }
  },
  methods: {
    _getData() {
      personalFm().then(r => {
        
      })
    },
    handleNext() {
      // switch(this.step) {
      //   case 0:
      //     this.cls = ['cur-song', 'before']
      //     break
      //   case 1:
      //     this.cls = ['cur-song']
      //     break
      //   case 2:
      //     this.cls = ['cur-song', 'after']
      //     break
      // }
      this.step++
      if (this.step == 4) {
        this.step = 0
      }
    },
    handleNext1() {

      this.cls = ['cur-song', 'after']
    }
  }
}
</script>

<style lang="scss" scoped>

.cur-song-wrap{
  position: relative;
  margin-left: 100px;
  height: 300px;
}

.cur-song{
  width: 300px;
  height: 300px;
  position: absolute;
  opacity: 1;
  transform: scale(1, 1) translateX(0);
  transition: all .3s;
  &.step0{
    opacity: 0;
    transform: translateX(300px);
  }
  &.step1{
    
  }
  &.step2{
    transform: translateX(-60px) scale(.8,.8);
  }
  &.step3{
    transform: translateX(-114px) scale(.64,.64);
    opacity: 0;
  }
}
</style>
