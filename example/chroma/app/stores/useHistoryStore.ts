import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { HistoryRecord, Palette } from '~/lib/types';
import type { HistoryState } from './history.types';

const MAX_HISTORY = 20;

function toRecord(palette: Palette): HistoryRecord {
  return {
    ...palette,
    _version: 1,
  };
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],

      addToHistory: (palette) => {
        const record = toRecord(palette);
        set((state) => {
          // 去重：如果最后一条的 baseHex 相同，不添加
          const last = state.history[0];
          if (last && last.baseHex === record.baseHex) {
            return state;
          }
          const next = [record, ...state.history].slice(0, MAX_HISTORY);
          return { history: next };
        });
      },

      removeFromHistory: (id) =>
        set((state) => ({
          history: state.history.filter((r) => r.id !== id),
        })),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'chroma-history',
      version: 1,
      partialize: (state) => ({ history: state.history }),
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} }
      ),
    }
  )
);
