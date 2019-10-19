<template>
  <div style="background: gray">
    <div v-for="(i, inx) in menu" :key="inx" style="width:200px">
      <div>{{i.text}}</div>
      <div v-for="(item, index) in i.subs" :key="`${inx}-${index}`" @click="$router.push({path: item.path})">
        {{item.text}}
      </div>
    </div>
  </div>
</template>

<script>
import menu from '@/common/data/menu'

export default {
  data() {
    return {
      menu
    }
  }
}
</script>


