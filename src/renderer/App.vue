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
  import { mapMutations } from 'vuex'

  export default {
    name: 'chin',
    created() {
      this._initApp()
    },
    components: {
      TitleBar
    },
    methods: {
      ...mapMutations('auth', ['setUser']),
      _initApp() {
        let user = this.$local.get('user')
        user && this.setUser(user)
      }
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
