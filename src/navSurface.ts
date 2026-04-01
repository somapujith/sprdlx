export type NavSurface = 'light' | 'dark';

let surface: NavSurface = 'dark';
const listeners = new Set<() => void>();

export function getNavSurface(): NavSurface {
  return surface;
}

export function setNavSurface(next: NavSurface) {
  if (surface === next) return;
  surface = next;
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.navSurface = next;
  }
  listeners.forEach((l) => l());
}

export function subscribeNavSurface(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}
