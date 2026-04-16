import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import { COPY } from '~/lib/copy';
import * as styles from './CopyButton.css';

interface Props {
  text: string;
  idleLabel?: string;
  doneLabel?: string;
}

export function CopyButton({ text, idleLabel, doneLabel }: Props) {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(() => {
    if (copied) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [text, copied]);

  const label = copied ? (doneLabel ?? COPY.export.copyDone) : (idleLabel ?? COPY.export.copyIdle);

  return (
    <button className={styles.button} onClick={handleClick} type="button" aria-label={label}>
      {copied ? (
        <Check className={styles.icon} size={14} strokeWidth={2} />
      ) : (
        <Copy className={styles.icon} size={14} strokeWidth={2} />
      )}
      <span className={styles.label} style={{ opacity: copied ? 0.8 : 1 }}>
        {label}
      </span>
    </button>
  );
}
