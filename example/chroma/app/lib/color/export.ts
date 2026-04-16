import type { ExportFormat, Palette } from '~/lib/types';

// 开发文档 §2.2：generateExport 是 Palette → 代码字符串的唯一入口
export function generateExport(palette: Palette, format: ExportFormat): string {
  switch (format) {
    case 'css':
      return toCss(palette);
    case 'tailwind':
      return toTailwind(palette);
    case 'json':
      return toJson(palette);
    default:
      return '';
  }
}

function toCss(palette: Palette): string {
  const name = palette.name ?? 'color';
  return palette.stops
    .map((s) => `  --${name}-${s.step}: ${s.hex};`)
    .join('\n');
}

function toTailwind(palette: Palette): string {
  const name = palette.name ?? 'color';
  const entries = palette.stops
    .map((s) => `    ${s.step}: '${s.hex}',`)
    .join('\n');
  return `  '${name}': {\n${entries}\n  }`;
}

function toJson(palette: Palette): string {
  const obj = {
    name: palette.name,
    base: palette.baseHex,
    stops: palette.stops.reduce<Record<string, string>>((acc, s) => {
      acc[String(s.step)] = s.hex;
      return acc;
    }, {}),
  };
  return JSON.stringify(obj, null, 2);
}
