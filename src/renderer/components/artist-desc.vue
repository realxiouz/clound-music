<template>
  <div>
    <div class="wrap">
       <div class="main">{{current.name}}简介</div>
      <div class="sub" v-html="briefDesc"></div>
    </div>
   
    <div class="wrap" v-for="(i, inx) in introduction" :key="inx">
      <div class="main">{{i.ti}}</div>
      <div class="sub" v-html="i.txt"></div>
    </div>
  </div>
</template>

<script>
import {getArtistDesc} from '@/common/api'
import { mapState } from 'vuex'

export default {
  created() {
    this._getData()
  },
  data() {
    return {
      briefDesc: '',
      introduction: []
    }
  },
  props: {
    aId: {
      type: [String, Number]
    }
  },
  computed: {
    ...mapState('artist', ['current'])
  },
  methods: {
    _getData() {
      let data = {
        id: this.aId
      }
      getArtistDesc(data).then(r => {
        this.briefDesc = '<span style="width:2em;display:inline-block;"></span>' + r.briefDesc
        this.introduction = r.introduction.map(i => {
          i.txt = '<span style="width:2em;display:inline-block;"></span>' + i.txt.replace(/\n/g, '<br/><span style="width:2em;display:inline-block;"></span>')
          return i
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../common/css/var.scss' ;
.wrap{
  margin-bottom: 15px;
}
.main{
  color: $light1;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
}
.sub{
  color: $light2;
  line-height: 2;
  font-size: 14px;
}  
</style>