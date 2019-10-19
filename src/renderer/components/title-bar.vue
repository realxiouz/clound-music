<template>
  <div class="title-bar">
    <div>某云音乐</div>
    <el-button-group>
      <el-button type="primary" icon="el-icon-edit" size="small"></el-button>
      <el-button type="primary" icon="el-icon-share" size="small"></el-button>
    </el-button-group>
    <el-autocomplete
      size="small"
      popper-class="my-autocomplete"
      v-model="state"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect">
      <i
        class="el-icon-edit el-input__icon"
        slot="suffix"
        @click="handleSearch">
      </i>
      <template slot-scope="{ item }">
        <div class="name">{{ item.value }}</div>
        <span class="addr">{{ item.address }}</span>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
export default {
  methods: {
    handleSearch() {

    }
  }
}
</script>

<style lang="scss" scoped>
  .title-bar{
    height: 50px;
    background: #222225;
    border-bottom: 2px solid #931616;
    color: #fff;
    display: flex;
    align-items: center;
  }
</style>