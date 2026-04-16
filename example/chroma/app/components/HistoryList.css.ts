import { style } from '@vanilla-extract/css';
import { vars } from '~/styles/tokens.css';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[4],
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const heading = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
  fontSize: vars.text.xl,
  fontWeight: vars.fontWeight.regular,
  color: vars.color.textPrimary,
  letterSpacing: vars.letterSpacing.tight,
});

export const icon = style({
  flexShrink: 0,
  color: vars.color.textQuaternary,
});

export const clearBtn = style({
  fontFamily: vars.font.sans,
  fontSize: vars.text.sm,
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

export const empty = style({
  fontSize: vars.text.sm,
  color: vars.color.textTertiary,
  padding: `${vars.space[4]} 0`,
  letterSpacing: vars.letterSpacing.tight,
});
