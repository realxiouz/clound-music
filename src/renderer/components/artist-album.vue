<template>
  <div>
    {{aId}}
  </div>
</template>

<script>
import { getArtistAlbum, getArtistSong } from '@/common/api'
import { mapMutations } from 'vuex'

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
    ...mapMutations('artist', ['setCurrent']),
    _getData() {
      let data = {
        id: this.aId
      }
      Promise.all([getArtistSong(data), getArtistAlbum(data)]).then(arr => {
        this.setCurrent(arr[0].artist)
      })
    }
  },
}
</script>