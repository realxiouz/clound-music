<template>
  <div>
    <el-tooltip placement="bottom-start" :disabled="!showTip">
      <template v-slot:content>
        <div class="tips flex direction">
          <div class="add">添加标签</div>
          <div class="all" @click="catChange('全部')">全部歌单</div>
          <el-scrollbar style="height:0;flex:1">
            <div v-for="(i, inx) in cats" :key="inx" class="flex cat-wrap">
              <div class="flex-left">{{i.name}}</div>
              <div class="flex wrap">
                <div class="cat" v-for="(item, index) in i.sub" :key="index" @click="catChange(item.name)">{{item.name}}</div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </template>
      <div
        @click="showTip=true"
        style="display:inline-block;padding:4px 6px;background-color:#25272B;border-radius:3px">
        {{cat}}&nbsp;&nbsp;<i class="el-icon-arrow-down" />
      </div>
    </el-tooltip>
    <div style="margin-top:12px">
      热门标签:
      <el-tag v-for="(i, inx) in hotTags" :key="inx" @click="catChange(i.name)">
        {{i.name}}
      </el-tag>
    </div>
    <div class="flex wrap" style="margin-left:-15px">
      <div class="pointer" v-for="(i, inx) in sheets" :key="inx" style="width:180px;padding:0 0 15px 15px" @click="toSheet(i.id)">
        <div>
          <el-image :src="i.coverImgUrl" style="width:180px;height:180px"></el-image>
        </div>
        <div>
          {{i.name}}
        </div>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="limit"
      :total="total"
      :current-page="page"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script>
import {getSheetCat, getSheetHotCat, getSheetByCat} from '@/common/api'

export default {
  created() {
    this._getData()
  },
  data() {
    return {
      cat: '全部',
      cats: [],
      hotTags: [],
      sheets: [],
      showTip: false,

      page: 1,
      limit: 40,
      total: 0,
    }
  },
  methods: {
    _getData() {
      Promise.all([
        getSheetCat(),
        getSheetHotCat(),
        getSheetByCat({cat: '华语', offset: this.offset, limit: this.limit})
      ]).then(a => {
        this.formatCats(a[0])
        this.hotTags = a[1].tags
        this.sheets = a[2].playlists
        this.total = a[2].total
      })
    },
    toSheet(id) {
      this.$router.push({path: `/main/sheet?id=${id}`})
    },
    handlePageChange(page) {
      this.page = page
      let data = {cat: '华语', offset: this.offset, limit: this.limit}
      this.getSheetData()
    },
    formatCats({sub, categories}) {
      for (const key in categories) {
        this.cats.push({
          name: categories[key],
          key,
          sub: sub.filter(i => i.category == key)
        })
      }
    },
    getSheetData() {
      let data = {cat: this.cat, offset: this.offset, limit: this.limit}
      getSheetByCat(data).then(r => {
        this.sheets = r.playlists
        this.total = r.total
      })
    },
    catChange(cat) {
      this.page = 1
      this.cat = cat
      this.getSheetData()
    },
    close() {
      this.showTip = false
    }
  },
  computed: {
    offset() {
      return (this.page - 1) * this.limit
    }
  },
}
</script>

<style lang="scss" scoped>
.tips{
  width:540px;
  height:410px;
  .add{
    padding: 15px 20px;
    border-bottom: 1px solid #3A393D;
  }
  .all{
    margin: 10px 20px;
    text-align: center;
    border: 1px solid #3A393D;
    line-height: 36px;
  }
  .cat-wrap{
    margin: 0px 20px;
    .cat{
      width: 85px;
      height: 32px;
      box-sizing: border-box;
      text-align: center;
    }
  }
}
</style>

<style>
.el-tooltip__popper{
  padding: 0 !important;
}
</style>