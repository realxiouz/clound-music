<template>
  <div id="app" class="app">
    <title-bar />
    <div style="flex:1;height:0">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import TitleBar from '@/components/title-bar'

  export default {
    name: 'chin',
    components: {
      TitleBar
    }
  }
</script>

<style lang="scss">
body{
  margin: 0;
}
.app{
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
