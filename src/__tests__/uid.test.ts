import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { uid, extractTime, isValid } from '../../dist/index.js';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('uid', () => {
  it('should return a 20-character string by default', () => {
    const id = uid();
    assert.strictEqual(id.length, 20);
  });

  it('should return unique values', () => {
    const ids = new Set<string>();
    for (let i = 0; i < 1000; i++) {
      ids.add(uid());
    }
    assert.strictEqual(ids.size, 1000);
  });

  it('should produce sortable IDs', async () => {
    const id1 = uid();
    await sleep(2);
    const id2 = uid();
    assert.ok(id1 < id2, `Expected ${id1} < ${id2}`);
  });

  it('should respect custom length', () => {
    const id = uid({ length: 12 });
    assert.strictEqual(id.length, 12);
  });

  it('should apply prefix', () => {
    const id = uid({ prefix: 'usr_' });
    assert.ok(id.startsWith('usr_'));
    assert.strictEqual(id.length, 20 + 4);
  });

  it('should extract time close to now', () => {
    const before = Date.now();
    const id = uid();
    const after = Date.now();
    const extracted = extractTime(id).getTime();
    assert.ok(
      extracted >= before && extracted <= after,
      `Extracted time ${extracted} not in range [${before}, ${after}]`,
    );
  });

  it('should validate valid IDs', () => {
    const id = uid();
    assert.strictEqual(isValid(id), true);
  });

  it('should reject too-short strings', () => {
    assert.strictEqual(isValid('abc'), false);
    assert.strictEqual(isValid(''), false);
  });

  it('should validate prefixed IDs', () => {
    const id = uid({ prefix: 'usr_' });
    assert.strictEqual(isValid(id), true);
  });
});
