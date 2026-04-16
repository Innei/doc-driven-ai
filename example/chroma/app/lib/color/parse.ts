import { parse as culoriParse, formatHex } from 'culori';

// 开发文档 §2.2：Palette.baseHex 始终为小写 7 字符 HEX
export function parseColor(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const color = culoriParse(trimmed);
  if (!color) return null;

  const hex = formatHex(color);
  if (!hex) return null;

  // 确保 7 字符小写格式
  return normalizeHex(hex);
}

function normalizeHex(hex: string): string | null {
  const lower = hex.toLowerCase();
  if (/^#[0-9a-f]{6}$/.test(lower)) return lower;
  if (/^#[0-9a-f]{3}$/.test(lower)) {
    const [r, g, b] = lower.slice(1);
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return null;
}
