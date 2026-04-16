import { style } from '@vanilla-extract/css';
import { vars } from '~/styles/tokens.css';

export const row = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space[4],
  padding: `${vars.space[3]} 0`,
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
});

export const swatch = style({
  display: 'flex',
  flex: 1,
  minWidth: 0,
  height: '32px',
  borderRadius: vars.radius.sm,
  overflow: 'hidden',
  border: `1px solid ${vars.color.borderStandard}`,
});

export const miniStop = style({
  flex: 1,
  minWidth: '8px',
  height: '100%',
});

export const meta = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[4],
  flexShrink: 0,
});

export const time = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.xs,
  color: vars.color.textQuaternary,
  letterSpacing: vars.letterSpacing.tight,
});

export const actions = style({
  display: 'flex',
  gap: vars.space[2],
});

export const actionBtn = style({
  fontFamily: vars.font.sans,
  fontSize: vars.text.xs,
  color: vars.color.textTertiary,
  cursor: 'pointer',
  padding: `${vars.space[1]} ${vars.space[2]}`,
  borderRadius: vars.radius.md,
  fontWeight: vars.fontWeight.medium,
  letterSpacing: vars.letterSpacing.tight,
  transition: 'color 150ms ease',
  ':hover': {
    color: vars.color.textPrimary,
  },
});
