<template>
  <div>
    <nav-bar text="官方榜"/>
    <nav-bar text="全球榜"/>
    <div class="flex wrap" style="margin-left: -16px">
      <div
        v-for="(i, inx) in list"
        :key="inx"
        style="width: 140px;padding: 0 0 16px 16px;"
      >
        <div class="item" :title="i.description">
          <el-image
            style="width: 140px; height: 140px"
            :src="i.coverImgUrl"
            fit="fill"
            class="pointer"
            @click="handleSheetDetail(i.id)"
          />
          <div class="play-count">
            <icon-svg name="ear"></icon-svg>
            {{i.playCount|playCount}}
          </div>
        </div>
        <div style="margin:8px 0 3px">
          {{i.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTopList, getTopListDetail, getTop } from '@/common/api'
import NavBar from '@/components/nav-bar'

export default {
  created() {
    this._getData()
  },
  data() {
    return {
      list: []
    }
  },
  components: {
    NavBar,
  },
  methods: {
    _getData() {
      getTopList().then(r => {
        this.list = r.list.splice(4)
      })
      getTopListDetail().then(r => {})
      getTop({idx: '3'}).then(r => {})
    },
    handleSheetDetail(id) {
      this.$router.push({path: `/main/sheet?id=${id}`})
    }
  },
}
</script>

<style lang="scss" scoped>
.item{
  position: relative;
  width: 140px;
  .play-count{
    position: absolute;
    background-color: rgba($color: #000000, $alpha: .2);
    right: 0;
    padding: 2px;
    top: 0;
  }
}
</style>