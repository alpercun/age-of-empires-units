import { mount } from '@vue/test-utils';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import UnitDetailView from '../UnitDetailView.vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createPinia, setActivePinia } from 'pinia';
import ResizeObserver from 'resize-observer-polyfill';
import type { ComponentPublicInstance } from 'vue';
import { useUnitsStore } from '@/stores/units';

// useRoute ve onMounted için mock oluştur
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

const vuetify = createVuetify({
  components,
  directives,
});

describe('UnitDetailView', () => {
  beforeAll(() => {
    global.ResizeObserver = ResizeObserver;
    setActivePinia(createPinia());
  });

  it('should be rendered', () => {
    const wrapper = mount(UnitDetailView, {
      global: {
        plugins: [vuetify, createPinia()],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should format label correctly', async () => {
    const wrapper = mount(UnitDetailView, {
      global: { plugins: [vuetify] },
    });

    const { formatLabel } = wrapper.vm as ComponentPublicInstance<
      typeof UnitDetailView
    >;

    expect(formatLabel('build_time')).toBe('⏱️ Build Time');
    expect(formatLabel('line_of_sight')).toBe('👁️ Line Of Sight');
    expect(formatLabel('accuracy')).toBe('✔️ Accuracy');
    expect(formatLabel('unknown_key')).toBe(' Unknown Key');
  });

  it('should format value correctly', async () => {
    const wrapper = mount(UnitDetailView, {
      global: { plugins: [vuetify] },
    });

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
    const unitsStore = useUnitsStore();
    vi.spyOn(unitsStore, 'selectedUnit', 'get').mockReturnValue(null);

    const wrapper = mount(UnitDetailView, {
      global: { plugins: [vuetify] },
    });

    expect(unitsStore.selectedUnit).toBeNull();

    const cannotFindUnit = wrapper.find('.unit-detail-view-not-found');
    expect(cannotFindUnit.exists()).toBe(true);
  });
});
