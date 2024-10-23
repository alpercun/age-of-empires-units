import { describe, expect, it } from 'vitest';
import UnitAgeFilter from '../UnitAgeFilter.vue';
import { mountWithOptions } from '@/utils/mount';

describe('UnitAgeFilter', () => {
  const defaultProps = {
    modelValue: ['All'],
    items: ['All', 'Dark', 'Feudal', 'Castle', 'Imperial'],
  };

  it('should renders correctly with provided props', () => {
    const wrapper = mountWithOptions(UnitAgeFilter, {
      props: defaultProps,
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
    const wrapper = mountWithOptions(UnitAgeFilter, {
      props: defaultProps,
    });

    const chips = wrapper.findAll('.v-chip');
    chips[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeDefined();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([
      ['All', 'Dark'],
    ]);
  });

  it('should successfully remove a selected item when clicked again', () => {
    const wrapper = mountWithOptions(UnitAgeFilter, {
      props: { ...defaultProps, modelValue: ['All', 'Dark', 'Feudal'] },
    });

    const chips = wrapper.findAll('.v-chip');
    chips[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeDefined();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([
      ['All', 'Feudal'],
    ]);
  });
});
