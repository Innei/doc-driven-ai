import { style } from '@vanilla-extract/css';
import { vars } from '~/styles/tokens.css';

export const panel = style({
  backgroundColor: vars.color.surface1,
  border: `1px solid ${vars.color.borderStandard}`,
  borderRadius: vars.radius.lg,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${vars.space[3]} ${vars.space[4]}`,
  borderBottom: `1px solid ${vars.color.borderStandard}`,
  backgroundColor: vars.color.surface1,
});

export const tabs = style({
  display: 'flex',
  gap: vars.space[4],
});

export const tab = style({
  fontFamily: vars.font.sans,
  fontSize: vars.text.sm,
  color: vars.color.textTertiary,
  cursor: 'pointer',
  padding: `${vars.space[1]} 0`,
  background: 'none',
  border: 'none',
  fontWeight: vars.fontWeight.medium,
  letterSpacing: vars.letterSpacing.tight,
  transition: 'color 150ms ease',
  position: 'relative',
  ':hover': {
    color: vars.color.textPrimary,
  },
  '::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '-2px',
    height: '1px',
    backgroundColor: 'transparent',
    transition: 'background-color 150ms ease',
  },
});

export const tabActive = style({
  color: vars.color.textPrimary,
  '::after': {
    backgroundColor: vars.color.brandAccent,
  },
});

export const codeBlock = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.sm,
  lineHeight: vars.lineHeight.normal,
  color: vars.color.textPrimary,
  padding: vars.space[4],
  whiteSpace: 'pre',
  overflowX: 'auto',
  backgroundColor: vars.color.surface1,
});
