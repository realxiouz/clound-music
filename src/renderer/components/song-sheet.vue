<template>
  <div v-loading='loading' class="flex wrap">
    <item
      date
    />
    <item
      v-for="(i, inx) in sheets"
      :key="inx"
      :bean="i"
    />
  </div>
</template>

<script>
import { getSongSheet } from '@/common/api'
import Item from './song-sheet-item'

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
    Item
  }
}
</script>

