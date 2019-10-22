<template>
  <div class="main-layout">
    <div style="flex:1;overflow-y:auto" class="main" >
      song-detail
    </div>
    <footer-bar />
  </div>
</template>

<script>
  import FooterBar from '@/components/footer'

  export default {
    components: {
      FooterBar
    }
  }
</script>
<style lang="scss" scoped>
.main-layout{
  display: flex;
  flex-direction: column;
  height: 100%;
  .main{
    height: 0;
    flex: 1;
    display: flex;
  }
}
</style>