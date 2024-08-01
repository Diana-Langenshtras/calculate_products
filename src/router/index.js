import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import StatisticsPage from '../pages/StatisticsPage.vue'
import LibraryPage from '../pages/LibraryPage.vue'

const routes = [
  { name: "start", path: '/', component: HomePage},
  { name: "statistics", path: '/statistics', component: StatisticsPage},
  { name: "library", path: '/library', component: LibraryPage},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router