import { createRouter, createWebHistory } from 'vue-router'

import { store } from '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: () => import('../views/StartScreen.vue'),
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('../views/GameScreen.vue'),
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('../views/ResultsScreen.vue'),
    },
  ],
})

router.beforeEach(async (to, _from) => {
  if (!(store.username && store.username !== '') && !(store.sessionToken && store.sessionToken !== '') && to.name !== 'start') {
    return { name: 'start' }
  }

})

export default router
