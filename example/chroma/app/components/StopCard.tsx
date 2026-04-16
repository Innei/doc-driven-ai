import type { Stop } from '~/lib/types';
import { COPY } from '~/lib/copy';
import * as styles from './StopCard.css';

interface Props {
  stop: Stop;
}

export function StopCard({ stop }: Props) {
  const passWhite = stop.contrastOnWhite >= 4.5;
  const passBlack = stop.contrastOnBlack >= 4.5;
  const aaWhite = passWhite ? COPY.swatch.passAA : COPY.swatch.failAA;
  const aaBlack = passBlack ? COPY.swatch.passAA : COPY.swatch.failAA;

  return (
    <div className={styles.card}>
      <div
        className={styles.fill}
        style={{ backgroundColor: stop.hex }}
        aria-label={`${stop.step} ${stop.hex}`}
      />
      <div className={styles.info}>
        <div className={styles.step}>{stop.step}</div>
        <div className={styles.hex}>{stop.hex}</div>
        <div className={styles.badge}>
          <span
            className={passWhite ? styles.aaPass : undefined}
            title={`${COPY.swatch.contrastOnWhite} ${stop.contrastOnWhite}`}
          >
            {aaWhite}
          </span>
          <span
            className={passBlack ? styles.aaPass : undefined}
            title={`${COPY.swatch.contrastOnBlack} ${stop.contrastOnBlack}`}
          >
            {aaBlack}
          </span>
        </div>
      </div>
    </div>
  );
}
