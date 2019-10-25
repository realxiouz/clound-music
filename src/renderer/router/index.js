import Vue from 'vue'
import Router from 'vue-router'

import MainLayout from "@/pages/layout/main"
import Find from '@/pages/find'
import FM from '@/pages/FM'
import Sheet from '@/pages/sheet'
import SongDetail from '@/pages/song-detail'
import ArtistDetail from '@/pages/artist-detail'
import AlbumDetail from '@/pages/album-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main/find'
    },
    {
      path: '/main',
      component: MainLayout,
      redirect: '/main/find',
      children: [
        {
          path: 'find',
          component: Find
        },
        {
          path: 'fm',
          component: FM
        },
        {
          path: 'sheet',
          component: Sheet
        },
        {
          path: 'artist-detail/:id?',
          component: ArtistDetail
        },
        {
          path: 'album-detail/:id?',
          component: AlbumDetail
        }
      ]
    },
    {
      path: '/song-detail',
      component: SongDetail
    }
  ]
})
