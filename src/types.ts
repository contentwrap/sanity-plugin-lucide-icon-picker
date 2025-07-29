import type { ComponentType } from 'react';

export interface IconObject {
  name: string;
  component: ComponentType<any>;
  tags: string[];
}

/**
 * Configuration options for the Lucide icon picker
 * @public
 */
export interface LucideIconPickerOptions {
  allowedIcons?: string[];
}

/**
 * Value type for selected Lucide icons
 * @public
 */
export type LucideIconPickerValue = string;

export interface AutocompleteIconOption {
  value: string;
  label: string;
  icon: ComponentType<any>;
  tags: string[];
  originalIcon: IconObject;
}
