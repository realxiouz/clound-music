<template>
  <div class="main-layout">
    <div class="main">
      <left-side />
      <keep-alive>
        <router-view style="flex:1;overflow-y:auto" />
      </keep-alive>
    </div>
    <footer-bar />
  </div>
</template>

<script>
  import FooterBar from '@/components/footer'
  import LeftSide from '@/components/main-aside'

  export default {
    components: {
      FooterBar, LeftSide
    }
  }
</script>
<style lang="scss" scoped>
@import '../../common/css/var.scss';
.main-layout{
  display: flex;
  flex-direction: column;
  height: 100%;
  .main{
    height: 0;
    flex: 1;
    display: flex;
    background: $dark1;
  }
}
</style>