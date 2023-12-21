import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import DefalutLayout from '@renderer/layout/DefaultLayput.vue'
import Dict from '@renderer/pages/Dict/index.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/default-layput'
  },
  {
    path: '/dict',
    component: Dict
  },
  {
    path: '/default-layput',
    name: 'DefaultLayout',
    component: DefalutLayout,
    redirect: '/setting',
    children: [
      {
        path: '/setting',
        component: () => import('@renderer/pages/Settings.vue')
      },
      {
        path: '/about',
        component: () => import('@renderer/pages/About.vue')
      },
      {
        path: '/dict',
        name: 'Dict',
        component: Dict
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
