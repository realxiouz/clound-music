<template>
  <div>
    <div>简介</div>
    <div>{{briefDesc}}</div>

    <div v-for="(i, inx) in introduction" :key="inx">
      <div>{{i.ti}}</div>
      <div v-html="i.txt"></div>
    </div>
  </div>
</template>

<script>
import {getArtistDesc} from '@/common/api'

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
  methods: {
    _getData() {
      let data = {
        id: this.aId
      }
      getArtistDesc(data).then(r => {
        this.briefDesc = r.briefDesc
        this.introduction = r.introduction
      })
    }
  },
}
</script>