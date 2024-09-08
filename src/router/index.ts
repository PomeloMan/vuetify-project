/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ minimum: 0.1, easing: 'ease', speed: 500 })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts([
    ...routes,
    {
      path: '/app',
      component: () => import('@/App.vue'),
    },
  ]),
}) as Router

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.requireAuth) {
    // to be continued
    // check user auth
    next('/login')
  }

  next()
})

router.afterEach((to, from, failure) => {
  NProgress.done()
  if (failure) {
    console.error(failure)
  }
})

export default router
