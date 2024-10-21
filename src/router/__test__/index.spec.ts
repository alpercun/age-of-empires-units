import { describe, it, expect } from 'vitest';
import router from '../index';

import NotFoundView from '@/pages/NotFound/NotFoundView.vue';
import HomeView from '@/pages/Home/HomeView.vue';
import UnitsView from '@/pages/Units/UnitsView.vue';
import UnitDetailView from '@/pages/UnitDetail/UnitDetailView.vue';

describe('Router', () => {
  it('should create the router object correctly', () => {
    expect(router).toBeDefined();
    expect(router).toBeInstanceOf(Object);
    expect(typeof router.push).toBe('function');
    expect(typeof router.replace).toBe('function');
  });

  it('should have the correct number of routes', () => {
    expect(router.getRoutes()).toHaveLength(4);
  });

  it('should configure each route correctly', () => {
    const routes = router.getRoutes();

    const homeRoute = routes.find(route => route.name === 'home');
    expect(homeRoute).toBeDefined();
    expect(homeRoute?.path).toBe('/');
    expect(homeRoute?.components?.default).toBe(HomeView);

    const unitsRoute = routes.find(route => route.name === 'units');
    expect(unitsRoute).toBeDefined();
    expect(unitsRoute?.path).toBe('/units');
    expect(unitsRoute?.components?.default).toBe(UnitsView);

    const unitDetailRoute = routes.find(route => route.name === 'unitDetail');
    expect(unitDetailRoute).toBeDefined();
    expect(unitDetailRoute?.path).toBe('/units/:id');
    expect(unitDetailRoute?.components?.default).toBe(UnitDetailView);

    const notFoundRoute = routes.find(route => route.name === 'notFound');
    expect(notFoundRoute).toBeDefined();
    expect(notFoundRoute?.path).toBe('/:pathMatch(.*)*');
    expect(notFoundRoute?.components?.default).toBe(NotFoundView);
  });

  it('should redirect invalid routes to the 404 page', async () => {
    await router.push('/invalid-page');
    expect(router.currentRoute.value.name).toBe('notFound');
  });
});
