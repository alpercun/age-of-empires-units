import { describe, expect, it } from 'vitest';
import NotFoundView from '../NotFoundView.vue';
import { RouterLinkStub } from '@vue/test-utils';
import { mountWithOptions } from '@/utils/mount';

describe('NotFoundView', () => {
  it('should render', () => {
    const wrapper = mountWithOptions(NotFoundView, {
      global: {
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
    const wrapper = mountWithOptions(NotFoundView, {
      global: {
        stubs: { RouterLink: RouterLinkStub },
      },
    });

    const link = wrapper.findComponent(RouterLinkStub);
    expect(link.exists()).toBe(true);
    expect(link.props('to')).toBe('/');
  });
});
