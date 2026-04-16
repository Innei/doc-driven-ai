import { Clock } from 'lucide-react';
import type { HistoryRecord } from '~/lib/types';
import { COPY } from '~/lib/copy';
import { HistoryRow } from './HistoryRow';
import * as styles from './HistoryList.css';

interface Props {
  history: HistoryRecord[];
  onRestore: (record: HistoryRecord) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function HistoryList({ history, onRestore, onRemove, onClear }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>
          <Clock className={styles.icon} size={16} strokeWidth={2} />
          {COPY.history.heading}
        </h2>
        {history.length > 0 && (
          <button className={styles.clearBtn} onClick={onClear} type="button">
            {COPY.history.clear}
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <div className={styles.empty}>{COPY.history.empty}</div>
      ) : (
        <div>
          {history.map((record) => (
            <HistoryRow
              key={record.id}
              record={record}
              onRestore={() => onRestore(record)}
              onRemove={() => onRemove(record.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
