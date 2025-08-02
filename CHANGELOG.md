# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-08-02

### Improved

- Improved package size by reorganizing dependencies to move Sanity packages to peer dependencies
- Improved build configuration by disabling source maps for smaller bundle size
- Improved TypeScript configuration by fixing treeshake configuration errors
- Improved dependency externalization for better package optimization
- Updated package to use ESM module type for modern JavaScript compatibility
- Removed React and Sanity from devDependencies to reduce bundle size

## [1.0.0] - 2025-07-29

### Added

- Initial release
