<template>
  <div>
    <div class="flex between">
      <span style="font-size:16px">{{text}}</span>
      <span v-if="cb" class="pointer" @click="cb">更多<i class="el-icon-arrow-right"/></span>
      <span v-else></span>
    </div>
    <div style="height:1px;background:#23262C;margin:10px 0"></div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    cb: Function
  }
}
</script>