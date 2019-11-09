import Vue from 'vue'

Vue.directive('outside', {
  bind() {

  },
  inserted(el, binding) {
    if (binding.value) {
      el.handler = e => {
        if (!e.target.contains(el)) {
          binding.value()
        }
      }
      
      document.addEventListener('click', el.handler)
    }
    
  },
  unbind() {
    el.handler && document.removeEventListener('click', el.handler)
  }
})