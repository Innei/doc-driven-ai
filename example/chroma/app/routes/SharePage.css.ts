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

export const chipWrap = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[4],
  padding: `${vars.space[4]} ${vars.space[4]}`,
  backgroundColor: vars.color.surface1,
  border: `1px solid ${vars.color.borderStandard}`,
  borderRadius: vars.radius.lg,
});

export const colorChip = style({
  width: '48px',
  height: '48px',
  border: `1px solid ${vars.color.borderStandard}`,
  borderRadius: vars.radius.md,
  flexShrink: 0,
});

export const chipInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[1],
});

export const chipName = style({
  fontSize: vars.text.base,
  color: vars.color.textPrimary,
  fontWeight: vars.fontWeight.medium,
  letterSpacing: vars.letterSpacing.tight,
});

export const chipHex = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.sm,
  color: vars.color.textSecondary,
  letterSpacing: vars.letterSpacing.tight,
});

export const actions = style({
  display: 'flex',
  gap: vars.space[3],
  alignItems: 'center',
});

export const linkBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[2],
  fontFamily: vars.font.sans,
  fontSize: vars.text.sm,
  color: vars.color.textPrimary,
  padding: `${vars.space[2]} ${vars.space[3]}`,
  backgroundColor: vars.color.surface2,
  borderRadius: vars.radius.md,
  cursor: 'pointer',
  textDecoration: 'none',
  fontWeight: vars.fontWeight.medium,
  letterSpacing: vars.letterSpacing.tight,
  transition: 'background-color 150ms ease',
  ':hover': {
    backgroundColor: vars.color.surface3,
  },
});
