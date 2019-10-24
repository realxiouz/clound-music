<template>
  <div @click="handleDetail">
    <el-image style="width:140px;height:140px" :src="bean.picUrl"></el-image>
    <div>{{bean.name}}</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    bean: {
      type: Object
    }
  },
  methods: {
    ...mapMutations('artist', ['setCurrent']),
    handleDetail() {
      this.setCurrent(this.bean)
      this.$router.push({
        path: `/main/artist-detail`
      })
    }
  },
}
</script>