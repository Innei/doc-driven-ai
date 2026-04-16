import { style } from '@vanilla-extract/css';
import { vars } from '~/styles/tokens.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[2],
});

export const inputWrap = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
  backgroundColor: vars.color.surface1,
  border: `1px solid ${vars.color.borderStandard}`,
  borderRadius: vars.radius.md,
  padding: `${vars.space[3]} ${vars.space[4]}`,
  transition: 'border-color 150ms ease',
  ':focus-within': {
    borderColor: vars.color.brandAccent,
  },
});

export const icon = style({
  flexShrink: 0,
  color: vars.color.textQuaternary,
});

export const input = style({
  flex: 1,
  background: 'transparent',
  outline: 'none',
  color: vars.color.textPrimary,
  fontFamily: vars.font.mono,
  fontSize: vars.text.base,
  fontWeight: vars.fontWeight.medium,
  letterSpacing: vars.letterSpacing.tight,
});

export const inputError = style({
  borderColor: vars.color.borderSecondary,
});

export const hint = style({
  fontSize: vars.text.sm,
  color: vars.color.textTertiary,
  letterSpacing: vars.letterSpacing.tight,
});
