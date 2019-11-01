<template>
  <div>
    <div class="d-mask" :class="{show: value}" @click="$emit('input', false)"></div>
    <div class="d-wrap" :class="{show: value}" >
      <div ref="songs" style="height:100%;over-flow:hidden">
        <div>
          <div
            @dblclick="playSel(inx)"
            :id="`song${i.id}`"
            v-for="(i, inx) in listAudio" :key="inx" class="flex align-center" style="height:25px;">
            <div style="width:30px;" class="flex align-center">
              <i
              v-if="currentAudio.id === i.id"
              class="el-icon-caret-right"
              style="color:#B82525;font-size:20px" />
            </div>
            <div class="flex-left text-dot" style="width:340px">{{i.name}}{{i.alia.length?i.alia[0]:''}}</div>
            <div class="text-dot" style="width:100px">{{ i.ar.map(i => i.name).join('/') }}</div>
            <!-- <div class="text-dot">{{ i.al.name }}</div> -->
            <div>{{ i.dt | songLength }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BScroll from 'better-scroll'

export default {
  props: {
    value: {
      type: Boolean
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  methods: {
    ...mapActions('play', ['playFromIndex']),
    playSel(inx) {
      this.playFromIndex(inx)
    }
  },
  computed: {
    ...mapState('play', ['listAudio', 'currentAudio'])
  },
  watch: {
    'listAudio': {
      handler(v) {
        this.$nextTick(_ => {
          this.scroll = new BScroll(this.$refs.songs)
        })
      }
    },
    'currentAudio.id': {
      handler(val) {
        this.scroll && this.scroll.scrollToElement(`#song${val}`, 300, null, true)
      }
    },
    'value': {
      handler(val) {
        val && (this.scroll = new BScroll(this.$refs.songs))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .d-mask{
    position: fixed;
    top: 0;
    bottom: 50px;
    left: 0;
    right: 0;
    z-index: 99;
    background-color: transparent;
    visibility: hidden;
		&.show{
			visibility: visible;
			opacity: 1;
		}
  }
  .d-wrap{
    position: fixed;
    width: 580px;
    height: 470px;
    background: #292B2F;
    right: 0;
    bottom: 50px;
    z-index: 100;
    transition: all 0.3s ease;
    transform: translateX(100%);
    overflow-y: auto;
		&.show{
			transform: translateX(0);
		}
  }
</style>