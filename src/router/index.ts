import { createRouter, createWebHistory } from 'vue-router';

import NotFoundView from '@/pages/NotFound/NotFoundView.vue';
import HomeView from '@/pages/Home/HomeView.vue';
import UnitsView from '@/pages/Units/UnitsView.vue';
import UnitDetailView from '@/pages/UnitDetail/UnitDetailView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/units',
      name: 'units',
      component: UnitsView,
    },
    {
      path: '/units/:id',
      name: 'unitDetail',
      component: UnitDetailView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundView,
    },
  ],
});

export default router;
