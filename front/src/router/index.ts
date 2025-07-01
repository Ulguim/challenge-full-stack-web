/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router/auto'
// eslint-disable-next-line import/no-duplicates
import { routes } from 'vue-router/auto-routes'
import { useAuth } from '@/composables/auth'
import { useApiFetch } from '@/services/http'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

router.beforeEach(async (to, from, next) => {
  const { isAuthenticated } = useAuth()
  const redirectToLogin = () => {
    localStorage.clear()
    next({ path: '/login' })
  }

  if (!to.meta.requiresAuth) {
    return next()
  }

  try {
    if (!isAuthenticated) {
      return redirectToLogin()
    }

    const res = await useApiFetch('/auth/verify', { method: 'GET' })
    if (res.error.value) {
      console.error('Auth verification failed:', res.error.value)
      return redirectToLogin()
    }

    return next()
  } catch (error) {
    console.error('Auth check error:', error)
    return redirectToLogin()
  }
})
// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
