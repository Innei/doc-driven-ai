import type { Stop } from '~/lib/types';
import { StopCard } from './StopCard';
import * as styles from './SwatchRow.css';

interface Props {
  stops: Stop[];
}

export function SwatchRow({ stops }: Props) {
  return (
    <div className={styles.row} role="list" aria-label="Color scale">
      {stops.map((stop) => (
        <StopCard key={stop.step} stop={stop} />
      ))}
    </div>
  );
}
