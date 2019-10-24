<template>
  <div>
    <div>similar</div>
  </div>
</template>

<script>
import {getArtistSimilar} from '@/common/api'

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
      getArtistSimilar(data).then(r => {
      })
    }
  },
}
</script>