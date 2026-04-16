import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { GeneratorState } from './generator.types';
import { parseColor } from '~/lib/color/parse';
import { generateScale } from '~/lib/color/scale';
import type { Palette } from '~/lib/types';

const DEFAULT_INPUT = '#5e6ad2';

function buildPalette(input: string): Palette | null {
  const baseHex = parseColor(input);
  if (!baseHex) return null;
  return {
    id: nanoid(8),
    baseHex,
    name: null,
    stops: generateScale(baseHex),
    createdAt: Date.now(),
  };
}

export const useGeneratorStore = create<GeneratorState>((set) => ({
  input: DEFAULT_INPUT,
  inputError: false,
  palette: buildPalette(DEFAULT_INPUT) || undefined,
  format: 'css',

  setInput: (value: string) => {
    const palette = buildPalette(value);
    set({
      input: value,
      inputError: palette === null && value.trim().length > 0,
      palette: palette || undefined,
    });
  },

  setFormat: (format) => set({ format }),
}));
