import { mount } from '@vue/test-utils';
import type { Component } from 'vue';
import type { MountingOptions } from '@/types/interfaces';

export const mountWithOptions = (
  component: Component,
  options: MountingOptions,
) => {
  return mount(component, {
    global: {
      plugins: [global.vuetify],
      ...(options.global || {}),
    },
    props: options.props,
    ...options,
  });
};
