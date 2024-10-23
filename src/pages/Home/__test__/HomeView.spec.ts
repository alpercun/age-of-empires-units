import { describe, expect, it } from 'vitest';
import HomeView from '../HomeView.vue';
import { mountWithOptions } from '@/utils/mount';
describe('HomeView', () => {
  it('should render', () => {
    const wrapper = mountWithOptions(HomeView, {});
    expect(wrapper.exists()).toBe(true);
  });

  it('should render image', () => {
    const wrapper = mountWithOptions(HomeView, {});
    const image = wrapper.find('img');
    expect(image.exists()).toBe(true);
  });

  it('should have correct image src', () => {
    const wrapper = mountWithOptions(HomeView, {});
    const image = wrapper.find('img');
    expect(image.attributes('src')).toBe('/src/assets/images/aoe-image.jpg');
  });
});
