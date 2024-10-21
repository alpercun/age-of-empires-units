import { mount } from '@vue/test-utils';
import { beforeAll, describe, expect, it } from 'vitest';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import UnitAgeFilter from '../UnitAgeFilter.vue';
import ResizeObserver from 'resize-observer-polyfill';

const vuetify = createVuetify({
  components,
  directives,
});

describe('UnitAgeFilter', () => {
  beforeAll(() => {
    global.ResizeObserver = ResizeObserver;
  });

  it('should renders correctly with provided props', () => {
    const wrapper = mount(UnitAgeFilter, {
      global: {
        plugins: [vuetify],
      },
      props: {
        modelValue: ['All'],
        items: ['All', 'Dark', 'Feudal', 'Castle', 'Imperial'],
      },
    });

    const chips = wrapper.findAll('.v-chip');
    expect(chips).toHaveLength(5);
    expect(chips[0].text()).toBe('All');
    expect(chips[1].text()).toBe('Dark');
    expect(chips[2].text()).toBe('Feudal');
    expect(chips[3].text()).toBe('Castle');
    expect(chips[4].text()).toBe('Imperial');
  });

  it('should emit update:modelValue event when a chip is clicked', () => {
    const wrapper = mount(UnitAgeFilter, {
      global: {
        plugins: [vuetify],
      },
      props: {
        modelValue: ['All'],
        items: ['All', 'Dark', 'Feudal', 'Castle', 'Imperial'],
      },
    });

    const chips = wrapper.findAll('.v-chip');
    chips[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeDefined();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([
      ['All', 'Dark'],
    ]);
  });

  it('should successfully remove a selected item when clicked again', () => {
    const wrapper = mount(UnitAgeFilter, {
      global: {
        plugins: [vuetify],
      },
      props: {
        modelValue: ['All', 'Dark', 'Feudal'],
        items: ['All', 'Dark', 'Feudal', 'Castle', 'Imperial'],
      },
    });

    const chips = wrapper.findAll('.v-chip');
    chips[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeDefined();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([
      ['All', 'Feudal'],
    ]);
  });
});
