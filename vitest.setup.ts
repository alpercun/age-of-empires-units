import 'vuetify/styles';
import { vi } from 'vitest';

vi.mock('vuetify/styles', () => ({}));

vi.mock('^.+\\.css$', () => ({}));
