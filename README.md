# @philiprehberger/uid

[![CI](https://github.com/philiprehberger/ts-uid/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-uid/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/uid)](https://www.npmjs.com/package/@philiprehberger/uid)
[![License](https://img.shields.io/github/license/philiprehberger/ts-uid)](LICENSE)
[![Sponsor](https://img.shields.io/badge/sponsor-GitHub%20Sponsors-ec6cb9)](https://github.com/sponsors/philiprehberger)

Collision-resistant, time-sortable, compact unique IDs in base62.

## Installation

```bash
npm install @philiprehberger/uid
```

## Usage

```ts
import { uid, extractTime, isValid } from '@philiprehberger/uid';

// Generate a 20-character sortable ID
const id = uid();
// => "0K8mT4x2RqNpLwZjHd3f"

// Custom length
const short = uid({ length: 12 });

// With prefix
const userId = uid({ prefix: 'usr_' });
// => "usr_0K8mT4x2RqNpLwZjHd3f"

// Extract embedded timestamp
const created = extractTime(id);
console.log(created); // Date object

// Validate format
isValid(id);     // true
isValid('abc');  // false
```

## API

### `uid(options?)`

Generate a unique, time-sortable base62 ID.

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `length` | `number` | `20` | Total length of the ID (excluding prefix) |
| `prefix` | `string` | `''` | String prepended to the ID |

Returns a `string` with 8 time-encoded characters followed by random base62 characters.

### `extractTime(id)`

Extract the embedded timestamp from an ID.

- **`id`** -- The ID string (with or without prefix)
- Returns a `Date` object

### `isValid(id)`

Check if a string matches the expected ID format.

- **`id`** -- The string to validate
- Returns `boolean`

## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
