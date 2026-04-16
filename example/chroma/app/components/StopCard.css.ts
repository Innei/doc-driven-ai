import { style } from '@vanilla-extract/css';
import { vars } from '~/styles/tokens.css';

export const card = style({
  flex: 1,
  minWidth: '52px',
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${vars.color.borderStandard}`,
  borderRadius: vars.radius.sm,
  overflow: 'hidden',
});

export const fill = style({
  width: '100%',
  aspectRatio: '1 / 1',
});

export const info = style({
  padding: `${vars.space[2]} ${vars.space[2]}`,
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  backgroundColor: vars.color.surface0,
});

export const step = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.xs,
  lineHeight: vars.lineHeight.tight,
  color: vars.color.textPrimary,
  fontWeight: vars.fontWeight.medium,
});

export const hex = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.xs,
  lineHeight: vars.lineHeight.normal,
  color: vars.color.textSecondary,
  textTransform: 'lowercase',
});

export const badge = style({
  fontFamily: vars.font.mono,
  fontSize: '10px',
  lineHeight: vars.lineHeight.normal,
  color: vars.color.textTertiary,
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '2px',
});

export const aaPass = style({
  color: vars.color.success,
});
