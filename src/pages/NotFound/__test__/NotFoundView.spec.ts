import { beforeAll, describe, expect, it } from 'vitest';
import NotFoundView from '../NotFoundView.vue';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import ResizeObserver from 'resize-observer-polyfill';
import { RouterLinkStub } from '@vue/test-utils';

const vuetify = createVuetify({
  components,
  directives,
});

describe('NotFoundView', () => {
  beforeAll(() => {
    global.ResizeObserver = ResizeObserver;
  });

  it('should render', () => {
    const wrapper = mount(NotFoundView, {
      global: {
        plugins: [vuetify],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Page Not Found');
    expect(wrapper.find('.not-found-image').exists()).toBe(true);
  });

  it('should have correct link', () => {
    const wrapper = mount(NotFoundView, {
      global: {
        stubs: { RouterLink: RouterLinkStub },
      },
    });

    const link = wrapper.findComponent(RouterLinkStub);
    expect(link.exists()).toBe(true);
    expect(link.props('to')).toBe('/');
  });
});
