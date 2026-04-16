import { style } from '@vanilla-extract/css';
import { vars } from '~/styles/tokens.css';

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[2],
  fontFamily: vars.font.sans,
  fontSize: vars.text.sm,
  color: '#ffffff',
  padding: `${vars.space[2]} ${vars.space[3]}`,
  backgroundColor: vars.color.brand,
  borderRadius: vars.radius.md,
  cursor: 'pointer',
  minWidth: '84px',
  fontWeight: vars.fontWeight.medium,
  letterSpacing: vars.letterSpacing.tight,
  transition: 'background-color 150ms ease',
  ':hover': {
    backgroundColor: vars.color.brandHover,
  },
});

export const icon = style({
  flexShrink: 0,
  opacity: 0.9,
});

export const label = style({
  display: 'inline-block',
  transition: 'opacity 150ms ease',
});
