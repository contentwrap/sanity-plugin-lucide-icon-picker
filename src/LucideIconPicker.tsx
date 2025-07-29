import { TrashIcon } from '@sanity/icons';
import { Autocomplete, Box, Button, Card, Flex, Text } from '@sanity/ui';
import { type JSX, useCallback, useEffect, useMemo, useState } from 'react';
import { type StringInputProps, set, unset } from 'sanity';

import { SelectedIconCard } from './SelectedIconCard';
import { getAllLucideIconsAsOptions } from './lucide-icons';
import type { LucideIconPickerOptions } from './types';

const LucideIconPicker = ({
  schemaType,
  value,
  readOnly,
  onChange,
}: StringInputProps): JSX.Element => {
  const [isInReplaceMode, setIsInReplaceMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Get all icon options for autocomplete with lazy loading
  const allIconOptions = useMemo(() => {
    const options: LucideIconPickerOptions =
      (schemaType.options as LucideIconPickerOptions) || {};
    const allOptions = getAllLucideIconsAsOptions();

    // Apply icon whitelist if provided
    if (options.allowedIcons) {
      return allOptions.filter((option) =>
        options.allowedIcons!.includes(option.value),
      );
    }

    return allOptions;
  }, [schemaType.options]);

  // Filtered options based on search query (lazy loaded)
  const iconOptions = useMemo(() => {
    if (!debouncedQuery || !debouncedQuery.trim()) {
      // Return first 200 options for initial load
      return allIconOptions.slice(0, 200);
    }

    const searchTerm = debouncedQuery.toLowerCase();
    const filtered = allIconOptions.filter((option) =>
      option.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    );

    // Return first 100 search results
    return filtered.slice(0, 100);
  }, [allIconOptions, debouncedQuery]);

  // Find current selected option with defensive programming (MOVED UP)
  const selectedOption = useMemo(() => {
    if (!value || typeof value !== 'string') {
      return undefined;
    }

    return allIconOptions.find((opt) => opt.value === value);
  }, [allIconOptions, value]);

  // Handle query change for autocomplete
  const handleQueryChange = useCallback((query: string | null) => {
    setSearchQuery(query || '');
  }, []);

  // Render each option with icon and name
  const renderOption = useCallback((option: any) => {
    return (
      <Card as="button" padding={2} radius={2} tone="inherit">
        <Flex align="center" gap={3}>
          <Box
            style={{ fontSize: '1.2em', display: 'flex', alignItems: 'center' }}
          >
            {option?.icon ? (
              <option.icon />
            ) : (
              <Text size={1} muted>
                ?
              </Text>
            )}
          </Box>
          <Text size={1} weight="medium">
            {option?.label || 'Unknown icon'}
          </Text>
        </Flex>
      </Card>
    );
  }, []);

  // Handle selection
  const handleChange = useCallback(
    (selectedValue: string | undefined) => {
      onChange(selectedValue ? set(selectedValue) : unset());
      setIsInReplaceMode(false);
      setSearchQuery('');
    },
    [onChange],
  );

  // Handle clear (actually remove the value)
  const handleClear = useCallback(() => {
    onChange(unset());
    setIsInReplaceMode(false);
    setSearchQuery('');
  }, [onChange]);

  // Handle replace (switch to replace mode with current value pre-filled)
  const handleReplace = useCallback(() => {
    setIsInReplaceMode(true);
    // Pre-fill with current selection
    if (selectedOption) {
      setSearchQuery(selectedOption.label);
    }
  }, [selectedOption]);

  // Handle blur (click away) - revert to card view
  const handleBlur = useCallback(() => {
    if (isInReplaceMode) {
      setIsInReplaceMode(false);
      setSearchQuery('');
    }
  }, [isInReplaceMode]);

  // Show selected card if icon is selected and not in replace mode
  if (value && !isInReplaceMode) {
    // If we have a stored value but can't find the icon, show a fallback card
    if (!selectedOption) {
      return (
        <Card
          border
          padding={1}
          radius={2}
          tone="caution"
          onClick={() => {
            if (!readOnly) {
              handleReplace();
            }
          }}
        >
          <Flex align="center" justify="space-between">
            <Flex align="center" gap={2} padding={2}>
              <Box
                style={{
                  fontSize: '1.25rem',
                  marginBottom: '-0.25rem',
                  lineHeight: 1,
                }}
              >
                <Text size={1} muted>
                  ?
                </Text>
              </Box>
              <Box>
                <Text size={1} weight="medium">
                  {value} (not found)
                </Text>
              </Box>
            </Flex>
            {!readOnly && (
              <Button
                icon={TrashIcon}
                mode="ghost"
                tone="critical"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                title="Clear invalid icon"
              />
            )}
          </Flex>
        </Card>
      );
    }

    return (
      <SelectedIconCard
        selectedIcon={selectedOption}
        onReplace={handleReplace}
        onClear={handleClear}
        readOnly={readOnly}
      />
    );
  }

  // Show autocomplete for searching/selecting or replace mode
  return (
    <Autocomplete
      id="lucide-icon-picker"
      options={iconOptions}
      value={isInReplaceMode ? selectedOption?.value : undefined}
      placeholder={
        isInReplaceMode ? 'Replace icon...' : 'Search for an icon...'
      }
      onQueryChange={handleQueryChange}
      renderOption={renderOption}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={readOnly}
      openButton
      autoFocus={isInReplaceMode}
      {...(isInReplaceMode && selectedOption ? { onClear: handleClear } : {})}
    />
  );
};

export default LucideIconPicker;
