import { describe, expect, it } from 'vitest';
import NotFoundView from '../NotFoundView.vue';
import { mount } from '@vue/test-utils';
import { RouterLinkStub } from '@vue/test-utils';

describe('NotFoundView', () => {
  it('should render', () => {
    const wrapper = mount(NotFoundView, {
      global: {
        plugins: [global.vuetify],
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
