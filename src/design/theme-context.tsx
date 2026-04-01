import { createContext, ReactNode, useContext, useLayoutEffect, useMemo, useState } from 'react';
import {
  DEFAULT_DESIGN_THEME,
  DESIGN_THEME_MAP,
  DESIGN_THEME_ORDER,
  DesignThemeDefinition,
  DesignThemeId,
  isDesignThemeId,
} from './themes';

type DesignThemeContextValue = {
  themeId: DesignThemeId;
  theme: DesignThemeDefinition;
  setThemeId: (next: DesignThemeId) => void;
  themes: DesignThemeDefinition[];
};

const STORAGE_KEY = 'sprdlx.design-theme';

const DesignThemeContext = createContext<DesignThemeContextValue | null>(null);

function readPersistedTheme(): DesignThemeId {
  if (typeof window === 'undefined') return DEFAULT_DESIGN_THEME;
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    stored = null;
  }
  const resolved = stored && isDesignThemeId(stored) ? stored : DEFAULT_DESIGN_THEME;
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.designTheme = resolved;
  }
  return resolved;
}

export function DesignThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<DesignThemeId>(() => readPersistedTheme());

  useLayoutEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.designTheme = themeId;
    try {
      window.localStorage.setItem(STORAGE_KEY, themeId);
    } catch {
      // Storage can be blocked in some privacy modes.
    }
  }, [themeId]);

  const value = useMemo<DesignThemeContextValue>(() => {
    return {
      themeId,
      theme: DESIGN_THEME_MAP[themeId],
      setThemeId,
      themes: DESIGN_THEME_ORDER.map((id) => DESIGN_THEME_MAP[id]),
    };
  }, [themeId]);

  return <DesignThemeContext.Provider value={value}>{children}</DesignThemeContext.Provider>;
}

export function useDesignTheme() {
  const context = useContext(DesignThemeContext);
  if (!context) {
    throw new Error('useDesignTheme must be used within a DesignThemeProvider');
  }
  return context;
}
