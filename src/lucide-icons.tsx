import * as LucideIcons from 'lucide-react';
import React from 'react';

import { IconObject } from './types';

// Get all Lucide icon names by filtering out non-icon exports
const getAllLucideIconNames = (): string[] => {
  const allKeys = Object.keys(LucideIcons);

  return allKeys.filter((key) => {
    // Filter out non-icon exports like 'createLucideIcon', 'Icon', etc.
    const excludedExports = [
      'createLucideIcon',
      'Icon',
      'default',
      'dynamicIconImports',
      'icons',
    ];

    const exportValue = LucideIcons[key as keyof typeof LucideIcons];

    // Check if it's excluded
    if (excludedExports.includes(key)) {
      return false;
    }

    // Check if it's a valid Lucide icon (React forwardRef object)
    const isValidIcon =
      typeof exportValue === 'object' &&
      exportValue !== null &&
      '$$typeof' in exportValue &&
      'render' in exportValue;

    if (!isValidIcon) {
      return false;
    }

    // Deduplicate: Skip Lucide prefixed versions if base version exists
    // e.g., skip "LucideContact" if "Contact" exists
    if (key.startsWith('Lucide')) {
      const baseVersion = key.replace('Lucide', '');
      if (allKeys.includes(baseVersion)) {
        const baseExportValue =
          LucideIcons[baseVersion as keyof typeof LucideIcons];
        const baseIsValidIcon =
          typeof baseExportValue === 'object' &&
          baseExportValue !== null &&
          '$$typeof' in baseExportValue &&
          'render' in baseExportValue;

        // Skip this Lucide prefixed version if base version is also a valid icon
        if (baseIsValidIcon) {
          return false;
        }
      }
    }

    // Deduplicate: Skip Icon suffixed versions if base version exists
    // e.g., skip "ClockIcon" if "Clock" exists
    if (key.endsWith('Icon')) {
      const baseVersion = key.replace('Icon', '');
      if (allKeys.includes(baseVersion)) {
        const baseExportValue =
          LucideIcons[baseVersion as keyof typeof LucideIcons];
        const baseIsValidIcon =
          typeof baseExportValue === 'object' &&
          baseExportValue !== null &&
          '$$typeof' in baseExportValue &&
          'render' in baseExportValue;

        // Skip this Icon version if base version is also a valid icon
        if (baseIsValidIcon) {
          return false;
        }
      }
    }

    return true;
  });
};

// Convert PascalCase icon name to kebab-case
const toKebabCase = (name: string): string => {
  return name
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
};

// Create tags for search functionality
const createTags = (iconName: string): string[] => {
  const kebabCase = toKebabCase(iconName);
  const words = kebabCase.split('-');

  return [
    iconName, // PascalCase name
    kebabCase, // kebab-case name
    ...words, // Individual words
    iconName.toLowerCase(), // lowercase version
  ];
};

// Get all Lucide icons as IconObject array
export const getAllLucideIcons = (): IconObject[] => {
  const iconNames = getAllLucideIconNames();

  return iconNames.map((name) => {
    const IconComponent = LucideIcons[
      name as keyof typeof LucideIcons
    ] as React.ComponentType<any>;

    return {
      name: toKebabCase(name),
      component: () => <IconComponent width="1.5em" height="1.5em" />,
      tags: createTags(name),
    };
  });
};

// Get all Lucide icons as Autocomplete options
export const getAllLucideIconsAsOptions = () => {
  const icons = getAllLucideIcons();

  return icons.map((icon) => ({
    value: icon.name,
    label: icon.name,
    icon: icon.component,
    tags: icon.tags,
    originalIcon: icon,
  }));
};
