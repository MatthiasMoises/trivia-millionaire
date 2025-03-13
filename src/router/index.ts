import { createRouter, createWebHistory } from 'vue-router'

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

export default router
