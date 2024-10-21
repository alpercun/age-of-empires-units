import { mount } from '@vue/test-utils';
import { describe, it, beforeAll, expect } from 'vitest';
import App from '@/App.vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import ResizeObserver from 'resize-observer-polyfill';
import router from '@/router';
import { createPinia, setActivePinia } from 'pinia';
const vuetify = createVuetify({
  components,
  directives,
});

describe('App', () => {
  beforeAll(() => {
    global.ResizeObserver = ResizeObserver;
    setActivePinia(createPinia());
  });

  it('should render correctly', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [vuetify, router],
      },
    });

    const appBar = wrapper.find('.v-app-bar');
    expect(appBar.exists()).toBe(true);

    const title = wrapper.find('.v-toolbar-title');
    expect(title.text()).toBe('Age of Empires Units');

    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    expect(buttons.length).toBe(2);
    expect(buttons[0].text()).toBe('Home');
    expect(buttons[1].text()).toBe('Units');

    await buttons[0].trigger('click');
    await wrapper.vm.$nextTick();
    await router.push('/');
    await wrapper.vm.$nextTick();
    expect(router.currentRoute.value.name).toBe('home');

    await buttons[1].trigger('click');
    await wrapper.vm.$nextTick();
    await router.push('/units');
    await wrapper.vm.$nextTick();
    expect(router.currentRoute.value.name).toBe('units');
  });
});
