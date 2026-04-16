import { style } from '@vanilla-extract/css';
import { vars } from '~/styles/tokens.css';

export const row = style({
  display: 'flex',
  width: '100%',
  overflowX: 'auto',
  borderRadius: vars.radius.sm,
  // 设计文档 §6.1：no gap between cards
});
