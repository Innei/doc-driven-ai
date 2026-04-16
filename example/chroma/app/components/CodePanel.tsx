import type { ExportFormat, Palette } from '~/lib/types';
import { generateExport } from '~/lib/color/export';
import { COPY } from '~/lib/copy';
import { CopyButton } from './CopyButton';
import * as styles from './CodePanel.css';

const FORMATS: { key: ExportFormat; label: string }[] = [
  { key: 'css', label: COPY.export.formatCss },
  { key: 'tailwind', label: COPY.export.formatTailwind },
  { key: 'json', label: COPY.export.formatJson },
];

interface Props {
  palette: Palette;
  format: ExportFormat;
  onFormatChange: (format: ExportFormat) => void;
}

export function CodePanel({ palette, format, onFormatChange }: Props) {
  const code = generateExport(palette, format);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.tabs} role="tablist">
          {FORMATS.map((f) => (
            <button
              key={f.key}
              className={`${styles.tab} ${format === f.key ? styles.tabActive : ''}`}
              onClick={() => onFormatChange(f.key)}
              role="tab"
              aria-selected={format === f.key}
              type="button"
            >
              {f.label}
            </button>
          ))}
        </div>
        <CopyButton text={code} />
      </div>
      <pre className={styles.codeBlock}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
