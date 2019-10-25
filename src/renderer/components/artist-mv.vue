<template>
  <div>
    <div v-for="(i, inx) in mvs" :key="inx">
      <div>
        <el-image :src="i.imgurl" style="width:160px;height:90px"></el-image>
      </div>
      <div>{{i.name}}</div>
    </div>
  </div>
</template>

<script>
import {getArtistMv} from '@/common/api'

export default {
  created() {
    this._getData()
  },
  data() {
    return {
      mvs:[]
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
      getArtistMv(data).then(r => {
        this.mvs = r.mvs
      })
    }
  },
}
</script>