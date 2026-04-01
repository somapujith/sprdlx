export type RgbTuple = [number, number, number];

export type DesignThemeId = 'editorial' | 'atelier' | 'analog';

export type DesignThemeDefinition = {
  id: DesignThemeId;
  label: string;
  shortLabel: string;
  description: string;
  surfaceRamp: {
    dark: RgbTuple;
    light: RgbTuple;
    navLightThreshold: number;
  };
};

export const DEFAULT_DESIGN_THEME: DesignThemeId = 'editorial';

export const DESIGN_THEME_ORDER: DesignThemeId[] = ['editorial', 'atelier', 'analog'];

export const DESIGN_THEME_MAP: Record<DesignThemeId, DesignThemeDefinition> = {
  editorial: {
    id: 'editorial',
    label: 'Editorial Brutalism',
    shortLabel: 'Editorial',
    description: 'Sharp contrast, dense typography, and art-direction-first hierarchy.',
    surfaceRamp: {
      dark: [16, 12, 10],
      light: [241, 231, 216],
      navLightThreshold: 0.59,
    },
  },
  atelier: {
    id: 'atelier',
    label: 'Tech Atelier',
    shortLabel: 'Atelier',
    description: 'Precision spacing, low-noise gradients, and calm technical clarity.',
    surfaceRamp: {
      dark: [13, 24, 34],
      light: [233, 243, 250],
      navLightThreshold: 0.56,
    },
  },
  analog: {
    id: 'analog',
    label: 'Analog Future',
    shortLabel: 'Analog',
    description: 'Retro-futurist warmth with tactile textures and atmospheric accents.',
    surfaceRamp: {
      dark: [20, 15, 24],
      light: [245, 230, 197],
      navLightThreshold: 0.6,
    },
  },
};

export function isDesignThemeId(value: string): value is DesignThemeId {
  return Object.prototype.hasOwnProperty.call(DESIGN_THEME_MAP, value);
}
