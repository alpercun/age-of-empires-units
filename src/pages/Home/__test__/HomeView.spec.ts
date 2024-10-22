import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import HomeView from '../HomeView.vue';

describe('HomeView', () => {
  it('should render', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [global.vuetify],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render image', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [global.vuetify],
      },
    });
    const image = wrapper.find('img');
    expect(image.exists()).toBe(true);
  });

  it('should have correct image src', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [global.vuetify],
      },
    });
    const image = wrapper.find('img');
    expect(image.attributes('src')).toBe('/src/assets/images/aoe-image.jpg');
  });
});
