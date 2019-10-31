<template>
  <div
    v-loading="loading"
    class="fill-parent"
    style="box-sizing:border-box"
    element-loading-text="加载中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="flex" style="padding:30px">
      <el-image style="width:200px;height:200px;margin-right:30px" :src="playList.coverImgUrl"></el-image>
      <div class="flex-left">
        <div>
          <el-tag>歌单</el-tag>
          {{playList.name}}</div>
        <div class="flex">
          <el-avatar :src="playList.creator.avatarUrl"></el-avatar>
          <div>{{playList.creator.nickname}}</div>
          <div>{{playList.createTime}}</div>
        </div>
        <div>
          <el-button @click="handlePlaySheet">播放全部</el-button>
        </div>
        <div>标签:&nbsp;{{playList.tags.join('/')}}</div>
        <div>简介:&nbsp;{{playList.description}}</div>
      </div>
    </div>
    <el-table
      :data="playList.tracks"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        :index="indexMethod"
        label=" ">
      </el-table-column>
      <el-table-column
        label="音乐标题"
        width="280">
        <template slot-scope="scope">
          <div class="flex">
            <div class="flex-left text-dot">{{scope.row.name}}{{scope.row.alia.length?scope.row.alia[0]:''}}</div>
            <tag v-if="scope.row.mv" />
            <div></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="歌手"
        width="180"
      >
        <template slot-scope="scope">
          <div class="text-dot">{{ scope.row.ar.map(i => i.name).join('/') }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="专辑"
        width="160">
        <template slot-scope="scope">
          <div class="text-dot">{{ scope.row.al.name }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="时长"
        width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.dt | songLength }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getSongSheetDetail } from '@/common/api'
  import Tag from '@/components/tag'
  import { mapActions, mapMutations, mapState } from 'vuex'

  export default {
    data() {
      return {
        playList: {
          coverImgUrl: '',
          tracks: [],
          creator: {},
          tags: []
        },
        loading: false
      }
    },
    methods: {
      ...mapActions('play', ['playAudio', 'playSongSheet']),
      ...mapMutations('play', ['setListAudio']),
      _getData() {
        let data = {
          id: this.$route.query.id
        }
        this.loading = true
        getSongSheetDetail(data).then(r => {
          this.playList = r.playlist
        }).finally(_ => {
          this.loading = false
        })
      },
      indexMethod(inx) {
        return inx
      },
      handlePlaySheet() {
        // this.setListAudio(this.playList.tracks)
        // this.playAudio()
        this.playSongSheet(this.playList.tracks)
      }
    },
    computed: {
      ...mapState('play', ['currentAudio'])
    },
    components: {
      Tag
    },
    watch: {
      '$route.query.id': {
        handler(val) {
          val && this._getData()
        },
        immediate: true
      }
    }
  }
</script>