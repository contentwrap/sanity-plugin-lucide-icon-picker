import { definePlugin, defineType } from 'sanity';

import LucideIconPicker from './LucideIconPicker';

export type { LucideIconPickerOptions, LucideIconPickerValue } from './types';

/**
 * Sanity schema type definition for Lucide icons
 * @public
 */
export const lucideIconType = defineType({
  title: 'Lucide Icon',
  name: 'lucide-icon',
  type: 'string',
  components: { input: LucideIconPicker },
});

/**
 * Sanity plugin for Lucide icon picker
 * @public
 */
export const lucideIconPicker = definePlugin(() => {
  return {
    name: 'sanity-plugin-lucide-icon-picker',
    schema: {
      types: [lucideIconType],
    },
  };
});
