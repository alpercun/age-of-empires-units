import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import HomeView from '../HomeView.vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

describe('HomeView', () => {
  it('should render', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render image', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [vuetify],
      },
    });
    const image = wrapper.find('img');
    expect(image.exists()).toBe(true);
  });

  it('should have correct image src', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [vuetify],
      },
    });
    const image = wrapper.find('img');
    expect(image.attributes('src')).toBe('/src/assets/images/aoe-image.jpg');
  });
});
