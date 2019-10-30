import Vue from 'vue'

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('.', false, /\.svg$/)
requireAll(req)

import IconSvg from '@/components/icon-svg'
Vue.component('icon-svg', IconSvg)