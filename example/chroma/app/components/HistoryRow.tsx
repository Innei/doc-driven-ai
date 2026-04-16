import type { HistoryRecord } from '~/lib/types';
import { COPY } from '~/lib/copy';
import * as styles from './HistoryRow.css';

interface Props {
  record: HistoryRecord;
  onRestore: () => void;
  onRemove: () => void;
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function HistoryRow({ record, onRestore, onRemove }: Props) {
  return (
    <div className={styles.row}>
      <div className={styles.swatch}>
        {record.stops.map((s) => (
          <div key={s.step} className={styles.miniStop} style={{ backgroundColor: s.hex }} />
        ))}
      </div>
      <div className={styles.meta}>
        <span className={styles.time}>{formatTime(record.createdAt)}</span>
        <div className={styles.actions}>
          <button className={styles.actionBtn} onClick={onRestore} type="button">
            {COPY.history.restore}
          </button>
          <button className={styles.actionBtn} onClick={onRemove} type="button">
            {COPY.history.remove}
          </button>
        </div>
      </div>
    </div>
  );
}
