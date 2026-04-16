import type { ExportFormat, Palette } from '~/lib/types';

export interface GeneratorState {
  input: string;
  inputError: boolean;
  palette: Palette | undefined;
  format: ExportFormat;

  setInput(value: string): void;
  setFormat(format: ExportFormat): void;
}
