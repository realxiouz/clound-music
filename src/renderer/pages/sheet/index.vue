<template>
  <div>
    sheet
    <el-table
      :data="playList.tracks"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名称"
        width="280">
      </el-table-column>
      <el-table-column
        label="演奏者"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.ar.map(i => i.name).join('/') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="专辑"
        width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.al.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="时长"
        width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.dt/1000 }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getSongSheetDetail } from '@/common/api'

  export default {
    created() {
      this._getData()
    },
    data() {
      return {
        playList: {
          tracks: []
        }
      }
    },
    methods: {
      _getData() {
        let data = {
          id: this.$route.query.id
        }
        getSongSheetDetail(data).then(r => {
          console.log(r)
          this.playList = r.playlist
        })
      }
    }
  }
</script>