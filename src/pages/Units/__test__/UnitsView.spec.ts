import { mount } from '@vue/test-utils';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import UnitsView from '../UnitsView.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useUnitsStore } from '@/stores/units';
import { ResourceType } from '@/stores/units';

describe('UnitsView', () => {
  beforeAll(() => {
    setActivePinia(createPinia());
  });

  it('should be rendered', () => {
    const wrapper = mount(UnitsView, {
      global: { plugins: [global.vuetify] },
    });

    const title = wrapper.find('h1');
    expect(title.text()).toBe('Units');

    const unitAgeFilter = wrapper.findComponent({ name: 'UnitAgeFilter' });
    expect(unitAgeFilter.exists()).toBe(true);

    const resourceCostFilter = wrapper.findComponent({
      name: 'ResourceCostFilter',
    });
    expect(resourceCostFilter.exists()).toBe(true);

    const unitList = wrapper.findComponent({ name: 'UnitList' });
    expect(unitList.exists()).toBe(true);
  });

  it('should update store when resource cost filters are updated', async () => {
    const unitsStore = useUnitsStore();
    vi.spyOn(unitsStore, 'setCostWood');
    vi.spyOn(unitsStore, 'setCostFood');
    vi.spyOn(unitsStore, 'setCostGold');

    const wrapper = mount(UnitsView, {
      global: { plugins: [global.vuetify] },
    });
    const resourceCostFilters = wrapper.findAllComponents({
      name: 'ResourceCostFilter',
    });

    await resourceCostFilters[0].vm.$emit('update', {
      selected: true,
      type: ResourceType.Wood,
      range: { min: 0, max: 100 },
    });
    expect(unitsStore.setCostWood).toHaveBeenCalledWith({
      selected: true,
      type: ResourceType.Wood,
      range: { min: 0, max: 100 },
    });

    await resourceCostFilters[1].vm.$emit('update', {
      selected: true,
      type: ResourceType.Food,
      range: { min: 10, max: 150 },
    });
    expect(unitsStore.setCostFood).toHaveBeenCalledWith({
      selected: true,
      type: ResourceType.Food,
      range: { min: 10, max: 150 },
    });

    await resourceCostFilters[2].vm.$emit('update', {
      selected: true,
      type: ResourceType.Gold,
      range: { min: 20, max: 200 },
    });
    expect(unitsStore.setCostGold).toHaveBeenCalledWith({
      selected: true,
      type: ResourceType.Gold,
      range: { min: 20, max: 200 },
    });
  });

  it('should update store when unit age filter is updated', async () => {
    const unitsStore = useUnitsStore();

    const wrapper = mount(UnitsView, {
      global: {
        plugins: [global.vuetify],
      },
    });

    const unitAgeFilter = wrapper.findComponent({ name: 'UnitAgeFilter' });

    await unitAgeFilter.vm.$emit('update:modelValue', ['Dark', 'Feudal']);

    expect(unitsStore.selectedAges).toEqual(['Dark', 'Feudal']);
  });
});
