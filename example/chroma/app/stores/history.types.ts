import type { HistoryRecord, Palette } from '~/lib/types';

export interface HistoryState {
  history: HistoryRecord[];
  addToHistory(palette: Palette): void;
  removeFromHistory(id: string): void;
  clearHistory(): void;
}
