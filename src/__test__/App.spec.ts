import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import App from '@/App.vue';
import { createPinia, setActivePinia } from 'pinia';
import { mountWithOptions } from '@/utils/mount';
import { vi } from 'vitest';

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

describe('App', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render correctly', async () => {
    const wrapper = mountWithOptions(App, {});

    const appHeader = wrapper.findComponent({ name: 'AppHeader' });
    expect(appHeader.exists()).toBe(true);

    const vMain = wrapper.findComponent({ name: 'VMain' });
    expect(vMain.exists()).toBe(true);
  });

  it('should handle updateIsDarkTheme event from AppHeader', async () => {
    const wrapper = mountWithOptions(App, {});
    const appHeader = wrapper.findComponent({ name: 'AppHeader' });

    expect(appHeader.exists()).toBe(true);

    expect(wrapper.vm.isDarkTheme).toBe(false);

    await appHeader.vm.$emit('update:isDarkTheme', true);

    expect(wrapper.vm.isDarkTheme).toBe(true);
  });
});
