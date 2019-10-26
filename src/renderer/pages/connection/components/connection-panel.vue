<template>
  <div>
    <div class="flex">
      <div class="">
        <span>{{typeObj[this.type].title}}</span>
        <span v-if="count">({{count}})</span>
      </div>
      <el-input placeholder="搜素..."></el-input>
    </div>
    <div>
      <div
        v-for="(i, inx) in list"
        :key="inx"
      >
        <item :bean='i' :type="type" :is-odd="inx%2===1" />
      </div>
    </div>
  </div>
</template>

<script>
import {getArtistSubList, getAlbumSubList} from '@/common/api'
import Item from './item'

const typeObj = {
  0: {
    method: getAlbumSubList,
    title: '收藏的专辑'
  },
  1: {
    method: getArtistSubList,
    title: '收藏的歌手'
  },
}
export default {
  created() {
    this.typeObj = typeObj
    this._getData()
  },
  data() {
    return {
      count: 0,
      list: [],
    }
  },
  props: {
    type: {
      type: Number,
    }
  },
  methods: {
    _getData() {
      typeObj[this.type].method().then(r => {
        this.count = r.count
        this.list = r.data
      })
    }
  },
  components: {
    Item
  }
}
</script>