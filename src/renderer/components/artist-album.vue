<template>
  <div>
    {{aId}}
  </div>
</template>

<script>
import { getArtistAlbum, getArtistSong } from '@/common/api'

export default {
  created() {
    this._getData()
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
      Promise.all([getArtistSong(data), getArtistAlbum(data)]).then(arr => {})
    }
  },
}
</script>