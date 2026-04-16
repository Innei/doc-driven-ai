import { style } from '@vanilla-extract/css';
import { vars } from '~/styles/tokens.css';

export const button = style({
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
  position: 'relative',
  minWidth: '64px',
  fontWeight: vars.fontWeight.medium,
  letterSpacing: vars.letterSpacing.tight,
  transition: 'background-color 150ms ease',
  ':hover': {
    backgroundColor: vars.color.surface3,
  },
});

export const icon = style({
  flexShrink: 0,
  color: vars.color.textTertiary,
});

export const label = style({
  display: 'inline-block',
  transition: 'opacity 150ms ease',
});
