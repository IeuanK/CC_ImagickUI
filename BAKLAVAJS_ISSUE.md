# BaklavaJS v1 Compatibility Issue

## Problem

BaklavaJS v1 packages are incompatible with modern ES module bundlers like Vite because:

1. The packages are distributed as UMD modules wrapped in IIFEs
2. The `package.json` incorrectly points ESM imports to CommonJS files
3. The exports are not properly recognized by Vite's CommonJS transformer

## Error

When trying to build:
```
"Node" is not exported by "node_modules/@baklavajs/core/dist/index.cjs"
```

When trying to run in browser (even with build succeeding):
```
Uncaught TypeError: Class extends value undefined is not a constructor or null
```

## Attempted Solutions

1. **CommonJS transformation** - Added `commonjsOptions` to Vite config, but the IIFE wrapper prevents proper transformation
2. **Rollup CommonJS plugin** - Doesn't work in Vite's plugin system as expected
3. **Module aliases** - Pointed to different dist files, but all suffer from same packaging issues
4. **Wrapper modules** - Started creating wrappers to expose UMD globals, but this is fragile

## Recommended Solutions

### Option 1: Use BaklavaJS v2 (Preferred)
- Upgrade to `@baklavajs/core@^2.x`, `@baklavajs/renderer-vue@^2.x`, etc.
- Better ESM support and modern architecture
- Requires rewriting node implementations to match v2 API

### Option 2: Load BaklavaJS v1 via CDN
- Add script tags to `index.html` to load UMD builds from CDN
- Access via globals (`window.BaklavaJS`, etc.)
- Bypasses bundler entirely

###  Option 3: Different Node Editor Library
- Consider alternatives like:
  - [rete.js](https://github.com/retejs/rete)
  - [react-flow](https://reactflow.dev/) (if willing to use React)
  - [litegraph.js](https://github.com/jagenjo/litegraph.js)

## Current State

The project builds successfully but fails at runtime with the "Class extends value undefined" error because the `Node` class from `@baklavajs/core` is not properly imported.
