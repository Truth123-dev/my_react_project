export function getStored<T>(key: string): T | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : null;
}

export function setStored<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
}

export function removeStored(key: string) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(key);
}
