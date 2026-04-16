import { useState, useCallback } from 'react';
import { Share2, Check } from 'lucide-react';
import { COPY } from '~/lib/copy';
import type { Palette } from '~/lib/types';
import { encodeSharePayload } from '~/lib/codec';
import * as styles from './ShareButton.css';

interface Props {
  palette: Palette;
}

export function ShareButton({ palette }: Props) {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(() => {
    if (copied) return;
    const hash = encodeSharePayload(palette);
    const url = `${window.location.origin}/p/${hash}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [palette, copied]);

  const label = copied ? COPY.share.buttonDone : COPY.share.buttonIdle;

  return (
    <button className={styles.button} onClick={handleClick} type="button" aria-label={label}>
      {copied ? (
        <Check className={styles.icon} size={14} strokeWidth={2} />
      ) : (
        <Share2 className={styles.icon} size={14} strokeWidth={2} />
      )}
      <span className={styles.label} style={{ opacity: copied ? 0.8 : 1 }}>
        {label}
      </span>
    </button>
  );
}
