import type { UidOptions } from './types';

const BASE62 =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function encodeBase62(num: number, length: number): string {
  let result = '';
  let n = num;
  for (let i = 0; i < length; i++) {
    result = BASE62[n % 62] + result;
    n = Math.floor(n / 62);
  }
  return result;
}

function randomBase62(length: number): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += BASE62[bytes[i] % 62];
  }
  return result;
}

let lastTime = 0;
let counter = 0;

export function uid(options?: UidOptions): string {
  const { length = 20, prefix = '' } = options ?? {};
  const timeChars = 8;
  const randomChars = length - timeChars;

  let now = Date.now();
  if (now === lastTime) {
    counter++;
  } else {
    lastTime = now;
    counter = 0;
  }

  const timePart = encodeBase62(now, timeChars);
  const randomPart = randomBase62(Math.max(0, randomChars));

  if (counter > 0 && randomPart.length > 0) {
    const counterChar = BASE62[counter % 62];
    return prefix + timePart + counterChar + randomPart.slice(1);
  }

  return prefix + timePart + randomPart;
}

export function extractTime(id: string): Date {
  const stripped = id.replace(/^[^0-9A-Za-z]*/, '');
  const timeStr = stripped.slice(0, 8);
  let time = 0;
  for (const ch of timeStr) {
    time = time * 62 + BASE62.indexOf(ch);
  }
  return new Date(time);
}

export function isValid(id: string): boolean {
  if (id.length < 8) return false;
  return /^[a-zA-Z_]*[0-9A-Za-z]{8,}$/.test(id);
}
