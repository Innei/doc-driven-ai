import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ExternalLink } from 'lucide-react';

import { SwatchRow } from '~/components/SwatchRow';
import { CodePanel } from '~/components/CodePanel';
import { CopyButton } from '~/components/CopyButton';
import type { Palette } from '~/lib/types';
import { decodeShareHash } from '~/lib/codec';
import { generateScale } from '~/lib/color/scale';
import { parseColor } from '~/lib/color/parse';
import { nanoid } from 'nanoid';
import { COPY } from '~/lib/copy';
import { vars } from '~/styles/tokens.css';
import * as styles from './SharePage.css';

export default function SharePage() {
  const { hash } = useParams<{ hash: string }>();
  const navigate = useNavigate();
  const [palette, setPalette] = useState<Palette | null>(null);
  const [format, setFormat] = useState<'css' | 'tailwind' | 'json'>('css');

  useEffect(() => {
    if (!hash) {
      navigate('/', { replace: true });
      return;
    }
    const payload = decodeShareHash(hash);
    if (!payload) {
      navigate('/', { replace: true });
      return;
    }
    const baseHex = parseColor(payload.c);
    if (!baseHex) {
      navigate('/', { replace: true });
      return;
    }
    const p: Palette = {
      id: nanoid(8),
      baseHex,
      name: payload.n ?? null,
      stops: generateScale(baseHex),
      createdAt: Date.now(),
    };
    setPalette(p);
  }, [hash, navigate]);

  if (!palette) {
    // 开发文档 §1.2：首屏短暂空白（主题底色 + 单个中性色块占位）
    return (
      <main className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>CHROMA</h1>
        </div>
        <div className={styles.chipWrap}>
          <div className={styles.colorChip} style={{ backgroundColor: vars.color.surface2 }} />
          <div className={styles.chipInfo}>
            <div className={styles.chipName}>Loading…</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>CHROMA</h1>
      </div>

      <div className={styles.chipWrap}>
        <div className={styles.colorChip} style={{ backgroundColor: palette.baseHex }} />
        <div className={styles.chipInfo}>
          <div className={styles.chipName}>{palette.name || 'Shared palette'}</div>
          <div className={styles.chipHex}>{palette.baseHex}</div>
        </div>
      </div>

      <SwatchRow stops={palette.stops} />

      <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <CodePanel palette={palette} format={format} onFormatChange={setFormat} />
        <div className={styles.actions}>
          <CopyButton text={palette.baseHex} idleLabel={COPY.sharePage.copyColor} doneLabel={COPY.export.copyDone} />
          <a className={styles.linkBtn} href={`/?color=${encodeURIComponent(palette.baseHex)}`}>
            <ExternalLink size={14} strokeWidth={2} />
            {COPY.sharePage.openTool}
          </a>
        </div>
      </section>
    </main>
  );
}
