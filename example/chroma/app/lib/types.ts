// 核心类型定义 — 开发文档 §2.1

export interface Stop {
  step: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
  hex: string;
  oklch: string;
  contrastOnWhite: number;
  contrastOnBlack: number;
}

export interface Palette {
  id: string;
  baseHex: string;
  name: string | null;
  stops: Stop[];
  createdAt: number;
}

export type ExportFormat = 'css' | 'tailwind' | 'json';

export interface HistoryRecord extends Palette {
  _version: 1;
}

export interface SharePayload {
  c: string;
  n?: string;
}

export interface PresetColor {
  id: string;
  name: string;
  hex: string;
}
