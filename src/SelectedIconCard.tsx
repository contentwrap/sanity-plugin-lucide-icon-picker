import { EllipsisHorizontalIcon, SyncIcon, TrashIcon } from '@sanity/icons';
import {
  Box,
  Button,
  Card,
  Flex,
  Menu,
  MenuItem,
  Popover,
  Text,
} from '@sanity/ui';
import React, { useEffect, useState } from 'react';

import type { AutocompleteIconOption } from './types';

interface SelectedIconCardProps {
  selectedIcon: AutocompleteIconOption;
  onReplace: () => void;
  onClear: () => void;
  readOnly?: boolean;
}

export const SelectedIconCard: React.FC<SelectedIconCardProps> = ({
  selectedIcon,
  onReplace,
  onClear,
  readOnly = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle Escape key to close popover
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <Card
      border
      padding={1}
      radius={2}
      tone="default"
      onClick={() => {
        if (!readOnly) {
          onReplace();
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
            {selectedIcon?.icon ? (
              <selectedIcon.icon />
            ) : (
              <Text size={1} muted>
                ?
              </Text>
            )}
          </Box>
          <Box>
            <Text size={1} weight="medium">
              {selectedIcon?.label || 'Unknown icon'}
            </Text>
          </Box>
        </Flex>
        {!readOnly && (
          <Popover
            content={
              <Menu>
                <MenuItem
                  icon={TrashIcon}
                  text="Clear"
                  tone="critical"
                  onClick={(e) => {
                    onClear();
                    setIsMenuOpen(false);
                    e.stopPropagation();
                  }}
                />
                <MenuItem
                  icon={SyncIcon}
                  text="Replace"
                  onClick={(e) => {
                    onReplace();
                    setIsMenuOpen(false);
                    e.stopPropagation();
                  }}
                />
              </Menu>
            }
            open={isMenuOpen}
            portal
            constrainSize
          >
            <Button
              icon={EllipsisHorizontalIcon}
              mode="bleed"
              padding={2}
              onClick={(e) => {
                setIsMenuOpen(!isMenuOpen);
                e.stopPropagation();
              }}
            />
          </Popover>
        )}
      </Flex>
    </Card>
  );
};
