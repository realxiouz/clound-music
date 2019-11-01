<template>
  <div class="flex wrap" style="margin-left:-41px">
    <div v-for="(i, inx) in mvs" :key="inx" style="width:160px;padding: 0 0 41px 41px" @click="handleMv(i)">
      <div>
        <el-image :src="i.imgurl" style="width:160px;height:90px"></el-image>
      </div>
      <div style="margin-top:6px" class="text-dot">{{i.name}}</div>
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
    },
    handleMv(i) {
      this.$router.push({
        path: `/mv-detail/${i.id}`
      })
    }
  },
  watch: {
    'aId': {
      handler(val) {
        this._getData()
      }
    }
  },
}
</script>