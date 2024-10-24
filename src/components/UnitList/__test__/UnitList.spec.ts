import { describe, it, expect, beforeAll, vi, beforeEach } from 'vitest';
import UnitList from '../UnitList.vue';
import { useUnitsStore } from '@/stores/units';
import { createPinia, setActivePinia } from 'pinia';
import type { Unit } from '@/types/interfaces';
import { mountWithOptions } from '@/utils/mount';

const mockRouterPush = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockRouterPush }),
}));

describe('UnitList', () => {
  beforeAll(() => {
    setActivePinia(createPinia());
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should table render correctly', () => {
    const unitsStore = useUnitsStore();
    const wrapper = mountWithOptions(UnitList, {
      props: {
        units: unitsStore.units,
        headers: [
          { id: 'id', title: 'ID', key: 'id' },
          { id: 'name', title: 'Name', key: 'name' },
          { id: 'age', title: 'Age', key: 'age' },
          { id: 'cost', title: 'Cost', key: 'cost' },
        ],
      },
    });

    const table = wrapper.findComponent({ name: 'v-data-table-virtual' });
    expect(table).toBeDefined();
  });

  it('should navigate to unit detail page when a row is clicked', async () => {
    const unitsStore = useUnitsStore();
    const wrapper = mountWithOptions(UnitList, {
      props: {
        units: unitsStore.units,
        headers: [
          { id: 'id', title: 'ID', key: 'id' },
          { id: 'name', title: 'Name', key: 'name' },
          { id: 'age', title: 'Age', key: 'age' },
          { id: 'cost', title: 'Cost', key: 'cost' },
        ],
      },
    });

    const table = wrapper.findComponent({ name: 'v-data-table-virtual' });
    const row = table.find('.v-data-table__tr--clickable');
    const getId = row.find('td').text();

    await row.trigger('click');
    expect(mockRouterPush).toHaveBeenCalledWith(`/units/${getId}`);
  });

  it('should visible controls render correctly', () => {
    const unitsStore = useUnitsStore();
    const wrapper = mountWithOptions(UnitList, {
      props: {
        units: unitsStore.units,
        headers: [
          { id: 'id', title: 'ID', key: 'id' },
          { id: 'name', title: 'Name', key: 'name' },
          { id: 'age', title: 'Age', key: 'age' },
          { id: 'cost', title: 'Cost', key: 'cost' },
        ],
      },
    });

    const visibleControls = wrapper.findComponent({ name: 'v-select' });
    expect(visibleControls).toBeDefined();
  });

  it('should hide column from table when it is hidden in v-select', async () => {
    const headers = [
      { id: 'name', title: 'Name', key: 'name' },
      { id: 'cost', title: 'Cost', key: 'cost' },
      { id: 'age', title: 'Age', key: 'age' },
    ];

    const units = [
      { id: 1, name: 'Unit 1', cost: { Food: 50 }, age: 'Dark' },
      { id: 2, name: 'Unit 2', cost: { Wood: 100 }, age: 'Feudal' },
    ];

    const wrapper = mountWithOptions(UnitList, {
      props: {
        units: units as Unit[],
        headers,
      },
    });
    const vSelect = wrapper.findComponent({ name: 'v-select' });
    expect(vSelect.exists()).toBe(true);

    headers.forEach(header => {
      expect(wrapper.text()).toContain(header.title);
    });

    await vSelect.vm.$emit('update:modelValue', ['name', 'age']);
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Name');
    expect(wrapper.text()).not.toContain('Cost');
    expect(wrapper.text()).toContain('Age');

    const dataTable = wrapper.findComponent({ name: 'v-data-table-virtual' });
    expect(dataTable.exists()).toBe(true);

    const visibleHeaders = dataTable.props('headers');
    expect(visibleHeaders).toHaveLength(2);
    expect(visibleHeaders.map((h: { key: string }) => h.key)).toEqual([
      'name',
      'age',
    ]);
  });

  it('should prevent deselecting all columns in v-select', async () => {
    const headers = [
      { id: 'name', title: 'Name', key: 'name' },
      { id: 'cost', title: 'Cost', key: 'cost' },
      { id: 'age', title: 'Age', key: 'age' },
    ];

    const units = [
      { id: 1, name: 'Unit 1', cost: { Food: 50 }, age: 'Dark' },
      { id: 2, name: 'Unit 2', cost: { Wood: 100 }, age: 'Feudal' },
    ];

    const wrapper = mountWithOptions(UnitList, {
      props: {
        units: units as Unit[],
        headers,
      },
    });

    const vSelect = wrapper.findComponent({ name: 'v-select' });
    expect(vSelect.exists()).toBe(true);

    expect(vSelect.props('modelValue')).toEqual(['name', 'cost', 'age']);

    await vSelect.vm.$emit('update:modelValue', []);
    await wrapper.vm.$nextTick();

    expect(vSelect.props('modelValue')).toEqual(['name']);

    await vSelect.vm.$emit('update:modelValue', ['cost']);
    await wrapper.vm.$nextTick();

    expect(vSelect.props('modelValue')).toEqual(['cost']);

    await vSelect.vm.$emit('update:modelValue', []);
    await wrapper.vm.$nextTick();

    expect(vSelect.props('modelValue')).toEqual(['cost']);
  });
});
