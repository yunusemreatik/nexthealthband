type Entry = { count: number; firstAttempt: number; lockedUntil?: number };
const store = new Map<string, Entry>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const LOCKOUT_MS = 15 * 60 * 1000;

export function checkRateLimit(key: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (entry?.lockedUntil && now < entry.lockedUntil) {
    return { allowed: false, retryAfter: Math.ceil((entry.lockedUntil - now) / 1000) };
  }

  if (!entry || now - entry.firstAttempt > WINDOW_MS) {
    store.set(key, { count: 1, firstAttempt: now });
    return { allowed: true };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    const lockedUntil = now + LOCKOUT_MS;
    store.set(key, { ...entry, lockedUntil });
    return { allowed: false, retryAfter: Math.ceil(LOCKOUT_MS / 1000) };
  }

  store.set(key, { ...entry, count: entry.count + 1 });
  return { allowed: true };
}

export function resetRateLimit(key: string) {
  store.delete(key);
}
