import { rgb, wcagContrast } from 'culori';

// 计算与白/黑的 WCAG 对比度，开发文档 §2.1
export function getContrast(hex: string): { white: number; black: number } {
  const color = rgb(hex)!;
  const white = rgb('#ffffff')!;
  const black = rgb('#000000')!;

  return {
    white: round(wcagContrast(color, white)),
    black: round(wcagContrast(color, black)),
  };
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}
