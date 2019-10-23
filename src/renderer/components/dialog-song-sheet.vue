<template>
  <div>
    <div class="d-mask" :class="{show: value}" @click="$emit('input', false)"></div>
    <div class="d-wrap" :class="{show: value}" >
      <div v-for="(i, inx) in listAudio" :key="inx" class="flex">
        <div class="flex">
          <div style="width:20px">{{calcIndex(i, inx)}}</div>
          <div class="flex-left text-dot" style="width:340px">{{i.name}}{{i.alia.length?i.alia[0]:''}}</div>
            <div></div>
          </div>
          <div class="text-dot" style="width:110px">{{ i.ar.map(i => i.name).join('/') }}</div>
          <div class="text-dot">{{ i.al.name }}</div>
          <span>{{ i.dt | songLength }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    value: {
      type: Boolean
    }
  },
  methods: {
    calcIndex(i, inx) {
      return this.currentAudio.id == i.id ? '播放' : inx + 1
    }
  },
  computed: {
    ...mapState('play', ['listAudio', 'currentAudio'])
  },
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