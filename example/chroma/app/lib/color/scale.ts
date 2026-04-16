import { oklch, formatHex, clampChroma } from 'culori';
import type { Stop } from '~/lib/types';
import { getContrast } from './contrast';

const STEPS: Stop['step'][] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

// 标准亮度曲线（以 500 档 L≈0.55 为基准）
const STANDARD_L = [0.97, 0.94, 0.88, 0.77, 0.64, 0.55, 0.46, 0.37, 0.28, 0.19, 0.10];

// 色度系数曲线：浅色端和深色端都降低
const C_FACTOR = [0.08, 0.15, 0.30, 0.55, 0.80, 1.00, 0.95, 0.85, 0.75, 0.60, 0.45];

// 开发文档 §2.1 / §四·冻结条款：Stop[] 长度始终为 11，顺序 50→950
export function generateScale(baseHex: string): Stop[] {
  const base = oklch(baseHex);
  if (!base) throw new Error('Invalid base color');
  // 类型窄化：base 为 Oklch
  const okBase = base as { l: number; c: number; h: number };

  const baseL = okBase.l;
  const baseC = okBase.c;
  const baseH = okBase.h;

  const deltaL = baseL - 0.55;

  return STEPS.map((step, i) => {
    const targetL = Math.min(0.99, Math.max(0.02, STANDARD_L[i]! + deltaL));
    const targetC = Math.max(0, baseC * C_FACTOR[i]!);

    const color = oklch({
      mode: 'oklch',
      l: targetL,
      c: targetC,
      h: baseH,
    });

    // 裁剪到 sRGB 色域并输出 HEX
    const clamped = clampChroma(color, 'oklch', 'rgb');
    const hex = formatHex(clamped as { mode: 'oklch'; l: number; c: number; h: number })?.toLowerCase() ?? '#000000';

    const contrast = getContrast(hex);
    const clampedOk = clamped as { l: number; c: number; h: number };
    const oklchStr = `oklch(${clampedOk.l.toFixed(3)} ${clampedOk.c.toFixed(3)} ${clampedOk.h.toFixed(3)})`;

    return {
      step,
      hex,
      oklch: oklchStr,
      contrastOnWhite: contrast.white,
      contrastOnBlack: contrast.black,
    };
  });
}
