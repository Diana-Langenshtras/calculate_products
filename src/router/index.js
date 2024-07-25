import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Statistics from '../pages/Statistics.vue'
import Library from '../pages/Library.vue'

const routes = [
  { name: "start", path: '/', component: Home},
  { name: "statistics", path: '/statistics', component: Statistics},
  { name: "library", path: '/library', component: Library},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router