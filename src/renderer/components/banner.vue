<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px" v-loading="loading">
      <el-carousel-item v-for="(i, inx) in imgs" :key="inx">
        <img :src="i.imageUrl" style="width:540px;height:200px"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getBanners } from '@/common/api'
export default {
  created() {
    this._getData()
  },
  data() {
    return {
      imgs: [],
      loading: false
    }
  },
  methods: {
    _getData() {
      this.loading = true
      getBanners().then(r => {
        this.imgs = r.banners
      }).finally(_ => {
        this.loading = false
      })
    }
  }
}
</script>