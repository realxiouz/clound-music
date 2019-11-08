<template>
  <div>
    <el-tooltip placement="bottom-start" manual>
      <template v-slot:content>
        <div style="width:540px;height:410px">
          <div>添加标签</div>
          <div v-for="(i, inx) in cats" :key="inx" class="flex">
            {{i.name}}
            <div class="flex wrap">
              <div v-for="(item, index) in i.sub" :key="index">{{item.name}}</div>
            </div>
          </div>
        </div>
      </template>
      <span>{{cat}} <i class="el-icon-arrow-down" /> </span>
    </el-tooltip>
    <div>
      热门标签:
      <el-tag v-for="(i, inx) in hotTags" :key="inx">
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
      getSheetByCat(data).then(r => {
        this.sheets = r.playlists
        this.total = r.total
      })
    },
    formatCats({sub, categories}) {
      for (const key in categories) {
        this.cats.push({
          name: categories[key],
          key,
          sub: sub.filter(i => i.category == key)
        })
      }
      console.log(this.cats)
    }
  },
  computed: {
    offset() {
      return (this.page - 1) * this.limit
    }
  },
}
</script>