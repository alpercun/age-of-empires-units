import { beforeAll, describe, expect, it, vi } from 'vitest';
import UnitDetailView from '../UnitDetailView.vue';
import { createPinia, setActivePinia } from 'pinia';
import type { ComponentPublicInstance } from 'vue';
import { mountWithOptions } from '@/utils/mount';
import { useUnitsStore } from '@/stores/units';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({ params: { id: '1' } })),
}));

vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    onMounted: vi.fn(callback => callback()),
  };
});

describe('UnitDetailView', () => {
  beforeAll(() => {
    setActivePinia(createPinia());
  });

  it('should be rendered', () => {
    const wrapper = mountWithOptions(UnitDetailView, {});
    expect(wrapper.exists()).toBe(true);
  });

  it('should format label correctly', async () => {
    const wrapper = mountWithOptions(UnitDetailView, {});

    const { formatLabel } = wrapper.vm as ComponentPublicInstance<
      typeof UnitDetailView
    >;

    expect(formatLabel('build_time')).toBe('⏱️ Build Time');
    expect(formatLabel('line_of_sight')).toBe('👁️ Line Of Sight');
    expect(formatLabel('accuracy')).toBe('✔️ Accuracy');
    expect(formatLabel('unknown_key')).toBe(' Unknown Key');
  });

  it('should format value correctly', async () => {
    const wrapper = mountWithOptions(UnitDetailView, {});

    const { formatValue } = wrapper.vm as ComponentPublicInstance<
      typeof UnitDetailView
    >;

    expect(formatValue(null)).toBe('-');
    expect(formatValue(undefined)).toBe('-');
    expect(formatValue('0/0')).toBe('0/0');
    expect(formatValue(42)).toBe('42');
    expect(formatValue(['1 spearmen', '+10 infantry', '+2 rams'])).toBe(
      '1 spearmen, +10 infantry, +2 rams',
    );
    expect(formatValue({ Food: 45, Gold: 50 })).toBe(
      '🍎 Food: 45, 💰 Gold: 50',
    );
  });

  it('should not set selected unit if not found', async () => {
    vi.mock('vue-router', () => ({
      useRoute: vi.fn(() => ({ params: { id: '123123' } })),
    }));

    const wrapper = mountWithOptions(UnitDetailView, {});

    await wrapper.vm.$nextTick();

    const cannotFindUnit = wrapper.find('.unit-detail-view-cannot-found');
    expect(cannotFindUnit.exists()).toBe(true);

    const image = cannotFindUnit.find('.unit-detail-view-cannot-found-image');
    expect(image.exists()).toBe(true);
    expect(image.attributes('src')).toBe('/src/assets/images/cannot-found.png');
    expect(image.attributes('alt')).toBe('Cannot found unit');

    const description = cannotFindUnit.find(
      '.unit-detail-view-cannot-found-description',
    );
    expect(description.exists()).toBe(true);
    expect(description.text()).toBe(
      'Sorry, the unit you are looking for does not exist.',
    );

    const link = cannotFindUnit.find('.unit-detail-view-cannot-found-link');
    expect(link.exists()).toBe(true);
    expect(link.attributes('to')).toBe('/units');
    expect(link.text()).toBe('Back to Units');
  });

  it('should set selected unit if found', async () => {
    const mockUnit = {
      id: 1,
      name: 'Archer',
      description:
        'Quick and light. Weak at close range; excels at battle from distance',
      expansion: 'Age of Kings',
      age: 'Feudal',
      cost: {
        Wood: 25,
        Gold: 45,
      },
      build_time: 35,
      reload_time: 2,
      attack_delay: 0.35,
      movement_rate: 0.96,
      line_of_sight: 6,
      hit_points: 4,
      range: 30,
      attack: 4,
      armor: '0/0',
      accuracy: '80%',
    };

    const unitsStore = useUnitsStore();
    vi.spyOn(unitsStore, 'getSelectedUnit').mockReturnValue(mockUnit);

    const wrapper = mountWithOptions(UnitDetailView, {});

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.unit).toEqual(mockUnit);
    expect(wrapper.find('.unit-detail-view-title').text()).toBe('Archer');
    expect(wrapper.find('.unit-detail-view-description').text()).toBe(
      'Quick and light. Weak at close range; excels at battle from distance',
    );
  });
});
