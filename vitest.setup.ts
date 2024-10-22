import 'vuetify/styles';
import { vi } from 'vitest';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import ResizeObserver from 'resize-observer-polyfill';

vi.mock('vuetify/styles', () => ({}));

vi.mock('^.+\\.css$', () => ({}));

global.ResizeObserver = ResizeObserver;

const vuetify = createVuetify({
  components,
  directives,
});

global.vuetify = vuetify;
