export type Resource = 'Food' | 'Wood' | 'Gold';

export const resourceIcons: Record<Resource, string> = {
  Food: '🍎',
  Wood: '🪵',
  Gold: '💰',
} as const;
