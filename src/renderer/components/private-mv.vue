<template>
  <div>
    <nav-bar text="推荐MV" />
    <div v-loading='loading' class="flex wrap" style="margin-left:-18px">
      <div
        v-for="(i, inx) in sheets"
        :key="inx"
        class="wrap1 pointer"
        @click="handleMv(i.id)"
      >
        <div style="width: 243px; height: 136px" class="pos-r text-center">
          <el-image
            class="fill-parent"
            :src="i.picUrl"
            fit="fill"
          />
        </div>
        <div class="line2" style="margin:8px 0 3px">
          {{i.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { privateMv } from '@/common/api'
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
      privateMv().then(r => {
        this.sheets = r.result.slice(0, 3)
      }).finally(_ => {
        this.loading = false
      })
    },
    handleMv(id) {
      this.$router.push({
        path: `/mv-detail/${id}`
      })
    }
  },
  components: {
    NavBar
  }
}
</script>

<style lang="scss" scoped>
  .wrap1{
    width: 243px;
    padding: 0 0 18px 18px;
    // float: left;
  }
</style>