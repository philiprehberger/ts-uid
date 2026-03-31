# @philiprehberger/uid

[![CI](https://github.com/philiprehberger/ts-uid/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-uid/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/uid.svg)](https://www.npmjs.com/package/@philiprehberger/uid)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/ts-uid)](https://github.com/philiprehberger/ts-uid/commits/main)

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

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/ts-uid)

🐛 [Report issues](https://github.com/philiprehberger/ts-uid/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/ts-uid/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
