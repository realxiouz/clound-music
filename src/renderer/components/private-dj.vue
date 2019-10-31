<template>
  <div>
    <nav-bar text="主播电台" />
    <div v-loading='loading' class="flex wrap" style="margin-left:-18px">
      <div
        v-for="(i, inx) in sheets"
        :key="inx"
        class="wrap1"
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
import { privateDj } from '@/common/api'
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
      privateDj({limit: 9}).then(r => {
        this.sheets = r.result
      }).finally(_ => {
        this.loading = false
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