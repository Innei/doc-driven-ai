import { style } from '@vanilla-extract/css';
import { vars } from '~/styles/tokens.css';

export const page = style({
  maxWidth: vars.page.maxWidth,
  margin: '0 auto',
  padding: `${vars.space[8]} ${vars.page.paddingX}`,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[8],
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const title = style({
  fontSize: vars.text['2xl'],
  fontWeight: vars.fontWeight.medium,
  color: vars.color.textPrimary,
  letterSpacing: vars.letterSpacing.tight,
});

export const themeBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  color: vars.color.textTertiary,
  cursor: 'pointer',
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.surface1,
  border: `1px solid ${vars.color.borderStandard}`,
  transition: 'color 150ms ease, background-color 150ms ease',
  ':hover': {
    color: vars.color.textPrimary,
    backgroundColor: vars.color.surface2,
  },
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[6],
});

export const actions = style({
  display: 'flex',
  gap: vars.space[3],
  alignItems: 'center',
});

export const presetsWrap = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[2],
});

export const presetsLabel = style({
  fontSize: vars.text.sm,
  color: vars.color.textTertiary,
  letterSpacing: vars.letterSpacing.tight,
});

export const presetsGrid = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space[2],
});

export const presetChip = style({
  width: '28px',
  height: '28px',
  cursor: 'pointer',
  border: `1px solid ${vars.color.borderStandard}`,
  borderRadius: vars.radius.sm,
  transition: 'transform 100ms ease, box-shadow 150ms ease',
  ':hover': {
    transform: 'scale(1.08)',
    boxShadow: vars.shadow.elevated,
  },
});
