import { useEffect, useRef, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { Sun, Moon } from 'lucide-react';

import { ColorInput } from '~/components/ColorInput';
import { SwatchRow } from '~/components/SwatchRow';
import { CodePanel } from '~/components/CodePanel';
import { ShareButton } from '~/components/ShareButton';
import { HistoryList } from '~/components/HistoryList';
import { useGeneratorStore } from '~/stores/useGeneratorStore';
import { useHistoryStore } from '~/stores/useHistoryStore';
import { COPY } from '~/lib/copy';
import { PRESETS } from '~/lib/data/presets';
import { applyTheme, getSavedTheme } from '~/lib/theme';
import * as styles from './IndexPage.css';

function useThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getSavedTheme);

  const toggle = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
    setTheme(next);
  }, [theme]);

  return { theme, toggle };
}

export default function Index() {
  const [searchParams] = useSearchParams();
  const { input, inputError, palette, format, setInput, setFormat } = useGeneratorStore();
  const { history, addToHistory, removeFromHistory, clearHistory } = useHistoryStore();
  const { theme, toggle } = useThemeToggle();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initializedRef = useRef(false);

  // 从 query param 初始化颜色（仅一次）
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    const color = searchParams.get('color');
    if (color) {
      setInput(color);
    }
  }, [searchParams, setInput]);

  // Debounce 自动写入历史
  useEffect(() => {
    if (!palette) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      addToHistory(palette);
    }, 1500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [palette, addToHistory]);

  const handlePreset = useCallback((hex: string) => {
    setInput(hex);
    // palette 会在 setInput 后立即更新（zustand 是同步的）
    const p = useGeneratorStore.getState().palette;
    if (p) addToHistory(p);
  }, [setInput, addToHistory]);

  const handleRestore = useCallback((record: { baseHex: string }) => {
    setInput(record.baseHex);
  }, [setInput]);

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>CHROMA</h1>
        <button className={styles.themeBtn} onClick={toggle} type="button" aria-label={theme === 'light' ? 'Switch to dark' : 'Switch to light'}>
          {theme === 'light' ? (
            <Moon size={16} strokeWidth={2} />
          ) : (
            <Sun size={16} strokeWidth={2} />
          )}
        </button>
      </div>

      <section className={styles.section}>
        <ColorInput value={input} error={inputError} onChange={setInput} />

        <div className={styles.presetsWrap}>
          <div className={styles.presetsLabel}>{COPY.presets.heading}</div>
          <div className={styles.presetsGrid}>
            {PRESETS.map((p) => (
              <button
                key={p.id}
                className={styles.presetChip}
                style={{ backgroundColor: p.hex }}
                onClick={() => handlePreset(p.hex)}
                title={p.name}
                type="button"
                aria-label={`Apply ${p.name}`}
              />
            ))}
          </div>
        </div>
      </section>

      {palette && (
        <>
          <SwatchRow stops={palette.stops} />

          <section className={styles.section}>
            <CodePanel palette={palette} format={format} onFormatChange={setFormat} />
            <div className={styles.actions}>
              <ShareButton palette={palette} />
            </div>
          </section>
        </>
      )}

      <HistoryList
        history={history}
        onRestore={handleRestore}
        onRemove={removeFromHistory}
        onClear={clearHistory}
      />
    </main>
  );
}
