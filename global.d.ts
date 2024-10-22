/* eslint-disable no-var */
import { createVuetify } from 'vuetify';

declare global {
  var vuetify: ReturnType<typeof createVuetify>;
}

export {};
