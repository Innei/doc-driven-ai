import { Pipette } from 'lucide-react';
import { COPY } from '~/lib/copy';
import * as styles from './ColorInput.css';

interface Props {
  value: string;
  error: boolean;
  onChange: (value: string) => void;
}

export function ColorInput({ value, error, onChange }: Props) {
  return (
    <div className={styles.container}>
      <div className={`${styles.inputWrap} ${error ? styles.inputError : ''}`}>
        <Pipette className={styles.icon} size={16} strokeWidth={2} />
        <input
          className={styles.input}
          type="text"
          value={value}
          placeholder={COPY.input.placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error}
        />
      </div>
      <div className={styles.hint}>
        {error ? COPY.input.error : COPY.input.formats}
      </div>
    </div>
  );
}
