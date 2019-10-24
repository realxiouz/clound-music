<template>
  <div>
    <div>
      <el-button-group>
        <el-button
          v-for="(i, inx) in arr1"
          :key="inx"
          plain
          size="mini"
          :type="value1===i.value?'primary':'success '"
          @click="value1=i.value"
        >
          {{i.text}}
        </el-button>
      </el-button-group>
      <el-button-group>
        <el-button
          v-for="(i, inx) in arr2"
          :key="inx"
          plain
          size="mini"
          :type="value2===i.value?'primary':'success '"
          @click="value2=i.value"
        >
          {{i.text}}
        </el-button>
      </el-button-group>
      <br/>
      <el-button-group>
        <el-button
          v-for="(i, inx) in arr3"
          :key="inx"
          plain
          size="mini"
          :type="value3===i.value?'primary':'success '"
          @click="value3=i.value"
        >
          {{i.text}}
        </el-button>
      </el-button-group>
      <div class="flex wrap">
        <artist-item
          v-for="(i, inx) in list"
          :key="inx"
          :bean="i"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getArtistList } from '@/common/api'
import ArtistItem from '@/components/artist-item'

const azIndex = _ => {
  return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].map(i => ({
    text: i,
    value: i
  }))
}

export default {
  created() {
    this._getData()
  },
  data() {
    return {
      arr1: [
        {text: '华语', value: '1'},
        {text: '欧美', value: '2'},
        {text: '日本', value: '6'},
        {text: '韩国', value: '7'},
      ],
      value1: '1',
      arr2: [
        {text: '男歌手', value: '1'},
        {text: '女歌手', value: '2'},
        {text: '乐队组合', value: '3'},
      ],
      value2: '1',
      arr3: azIndex(),
      value3: 'a',
      list: [],
    }
  },
  methods: {
    _getData() {
      let data = {
        cat: this.cat,
        initial: this.value3
      }
      getArtistList(data).then(r => {
        this.list = r.artists
      })
    }
  },
  computed: {
    cat() {
      return `${this.value1}00${this.value2}`
    }
  },
  watch: {
    cat: {
      handler(val) {
        this._getData()
      }
    },
    value3: {
      handler(val) {
        this._getData()
      }
    }
  },
  components: {
    ArtistItem
  }
}
</script>