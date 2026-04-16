import { globalStyle } from '@vanilla-extract/css';
import { vars } from './tokens.css';

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
});

globalStyle('html, body', {
  height: '100%',
});

globalStyle('body', {
  fontFamily: vars.font.sans,
  fontSize: vars.text.base,
  lineHeight: vars.lineHeight.normal,
  fontWeight: vars.fontWeight.regular,
  color: vars.color.textPrimary,
  backgroundColor: vars.color.surface0,
  fontFeatureSettings: '"cv01", "ss03"',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('button', {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  cursor: 'pointer',
  border: 'none',
  background: 'none',
  color: 'inherit',
});

globalStyle('input', {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  color: 'inherit',
  background: 'transparent',
  border: 'none',
  outline: 'none',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('::selection', {
  backgroundColor: vars.color.brandAccent,
  color: '#ffffff',
});
