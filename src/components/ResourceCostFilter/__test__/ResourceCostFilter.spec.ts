import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ResourceCostFilter from '../ResourceCostFilter.vue';
import { ResourceType } from '@/stores/units';

describe('ResourceCostFilter', () => {
  it('should render correctly', () => {
    const wrapper = mount(ResourceCostFilter, {
      global: {
        plugins: [global.vuetify],
      },
      props: {
        type: ResourceType.Wood,
        min: 0,
        max: 200,
      },
    });

    const slider = wrapper.find('.resource-cost-filter');
    expect(slider).toBeDefined();
  });

  it('should slider active when checkbox active', () => {
    const wrapper = mount(ResourceCostFilter, {
      global: {
        plugins: [global.vuetify],
      },
      props: {
        type: ResourceType.Wood,
        min: 0,
        max: 200,
      },
    });

    const checkbox = wrapper.find('.v-checkbox');
    checkbox.trigger('click');
    expect(
      wrapper.find('.resource-cost-filter-slider-value-active'),
    ).toBeDefined();
  });

  it('should checkbox checked when checkbox clicked', async () => {
    const wrapper = mount(ResourceCostFilter, {
      global: {
        plugins: [global.vuetify],
      },
      props: {
        type: ResourceType.Wood,
        min: 0,
        max: 200,
      },
    });

    const checkbox = wrapper.find('.v-checkbox');
    await checkbox.trigger('click');
    expect(wrapper.find('.v-selection-control--dirty')).toBeDefined();
  });

  it('should emit update when slider changed', async () => {
    const wrapper = mount(ResourceCostFilter, {
      global: {
        plugins: [global.vuetify],
      },
      props: {
        type: ResourceType.Wood,
        min: 0,
        max: 200,
      },
    });

    const checkbox = wrapper.findComponent({ name: 'v-checkbox' });
    await checkbox.setValue(true);

    expect(wrapper.find('.v-selection-control--dirty')).toBeDefined();

    const slider = wrapper.findComponent({ name: 'v-range-slider' });

    await slider.setValue([10, 100]);
    await wrapper.vm.$nextTick();

    const minMax = wrapper.find('.resource-cost-filter-slider-value');
    expect(minMax.text()).toBe('10 - 100');

    expect(wrapper.emitted('update')).toBeTruthy();
    expect(wrapper.emitted('update')![0][0]).toEqual({
      selected: true,
      type: ResourceType.Wood,
      range: {
        min: 10,
        max: 100,
      },
    });
  });
});
