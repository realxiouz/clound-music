<template>
  <div>
    <nav-bar text="推荐歌单" />
    <div v-loading='loading' class="flex wrap" style="margin-left:-16px">
      <item date/>
      <item
        v-for="(i, inx) in sheets"
        :key="inx"
        :bean="i"
      />
    </div>
  </div>
</template>

<script>
import { getSongSheet } from '@/common/api'
import Item from './song-sheet-item'
import NavBar from './nav-bar'

export default {
  created() {
    this._getData()
  },
  data() {
    return {
      loading: false,
      sheets: []
    }
  },
  methods: {
    _getData(){
      this.loading = true
      getSongSheet({limit: 9}).then(r => {
        this.sheets = r.result
      }).finally(_ => {
        this.loading = false
      })
    }
  },
  components: {
    Item, NavBar
  }
}
</script>

