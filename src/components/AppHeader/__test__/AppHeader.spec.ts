import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import AppHeader from '../AppHeader.vue';
import { mountWithOptions } from '@/utils/mount';
import { vi } from 'vitest';
import router from '@/router';
import { VueWrapper } from '@vue/test-utils';

beforeAll(() => {
  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

describe('AppHeader', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mountWithOptions(AppHeader, {
      props: {
        isDarkTheme: false,
      },
    });
  });

  it('should render the header correctly', () => {
    expect(wrapper.find('.app-header').exists()).toBe(true);
    expect(wrapper.find('img').attributes('alt')).toBe('Age of Empires Logo');
  });

  it('should render the theme switch', () => {
    const vSwitch = wrapper.findComponent({ name: 'VSwitch' });
    expect(vSwitch.exists()).toBe(true);
  });

  it('should render navigation buttons', () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    expect(buttons.length).toBe(2);
    expect(buttons[0].text()).toBe('Home');
    expect(buttons[1].text()).toBe('Units');
  });

  it('should navigate to home page when home button is clicked', async () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    await buttons[0].trigger('click');
    await wrapper.vm.$nextTick();
    await router.push('/');
    await wrapper.vm.$nextTick();
    expect(router.currentRoute.value.name).toBe('home');
  });

  it('should navigate to units page when units button is clicked', async () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    await buttons[1].trigger('click');
    await wrapper.vm.$nextTick();
    await router.push('/units');
    await wrapper.vm.$nextTick();
    expect(router.currentRoute.value.name).toBe('units');
  });

  it('should emit update:isDarkTheme event when v-switch is toggled', async () => {
    const wrapper = mountWithOptions(AppHeader, {
      props: {
        isDarkTheme: false,
      },
    });

    const vSwitch = wrapper.findComponent({ name: 'VSwitch' });
    expect(vSwitch.exists()).toBe(true);

    await vSwitch.vm.$emit('update:modelValue', true);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:isDarkTheme')).toBeTruthy();
    expect(wrapper.emitted('update:isDarkTheme')![0]).toEqual([true]);

    await vSwitch.vm.$emit('update:modelValue', false);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:isDarkTheme')![1]).toEqual([false]);

    await vSwitch.vm.$emit('update:modelValue', null);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:isDarkTheme')![2]).toEqual([false]);
  });
});
