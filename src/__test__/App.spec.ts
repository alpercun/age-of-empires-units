import { describe, it, expect, beforeEach } from 'vitest';
import App from '@/App.vue';
import router from '@/router';
import { createPinia, setActivePinia } from 'pinia';
import { mountWithOptions } from '@/utils/mount';

describe('App', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render correctly', async () => {
    const wrapper = mountWithOptions(App, {});

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
