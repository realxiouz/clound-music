<template>
  <div>
    <div class="flex wrap">
      <div v-for="(i, inx) in artists" :key="inx"  @click="handleArtist(i)">
        <el-image :src="i.picUrl" style="width:120px;height:120px"></el-image>
        <div class="text-center">
          {{i.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getArtistSimilar} from '@/common/api'
import { mapMutations } from 'vuex'

export default {
  created() {
    this._getData()
  },
  data() {
    return {
      artists: []
    }
  },
  props: {
    aId: {
      type: [String, Number]
    }
  },
  methods: {
    ...mapMutations('artist', ['setCurrent']),
    handleArtist(i) {
      this.setCurrent(i)
      this.$router.push({
        path: `/main/artist-detail/${i.id}`
      })
    },
    _getData() {
      let data = {
        id: this.aId
      }
      getArtistSimilar(data).then(r => {
        this.artists = r.artists
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