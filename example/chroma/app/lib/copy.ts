// UI 文案 — CHROMA-COPY.md

export const COPY = {
  input: {
    placeholder: '#5e6ad2',
    error: '无法识别的颜色格式',
    formats: '支持 HEX、HSL、OKLCH',
  },
  swatch: {
    contrastOnWhite: 'on white',
    contrastOnBlack: 'on black',
    passAA: 'AA',
    failAA: '—',
  },
  export: {
    formatCss: 'CSS Variables',
    formatTailwind: 'Tailwind Config',
    formatJson: 'JSON',
    copyIdle: 'Copy',
    copyDone: 'Copied!',
  },
  share: {
    buttonIdle: 'Share',
    buttonDone: 'Link copied',
  },
  history: {
    heading: 'History',
    empty: 'No palettes yet',
    restore: 'Restore',
    remove: 'Remove',
    clear: 'Clear all',
    clearConfirm: 'Clear history?',
  },
  presets: {
    heading: 'Presets',
  },
  sharePage: {
    copyColor: 'Copy base color',
    openTool: 'Open in CHROMA',
  },
} as const;
