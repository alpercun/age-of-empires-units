import type { ComponentMountingOptions } from '@vue/test-utils';
import type { ResourceType } from './enums';

export interface MountingOptions
  extends Partial<ComponentMountingOptions<unknown>> {
  props?: Record<string, unknown>;
}

export type ResourceFilter = {
  selected: boolean;
  type: ResourceType;
  range: {
    min: number;
    max: number;
  };
};

export interface Unit {
  id: number;
  name: string;
  description: string;
  expansion: string;
  age: string;
  cost: {
    Wood?: number;
    Food?: number;
    Gold?: number;
  } | null;
  build_time?: number;
  reload_time?: number;
  attack_delay?: number;
  movement_rate?: number;
  line_of_sight?: number;
  hit_points?: number;
  range?: number | string;
  attack?: number;
  armor?: string | number;
  accuracy?: string | number;
}
