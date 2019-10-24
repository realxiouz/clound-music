<template>
  <div>
    <div>mv</div>
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
      })
    }
  },
}
</script>