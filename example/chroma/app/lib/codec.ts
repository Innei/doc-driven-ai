import type { Palette, SharePayload } from '~/lib/types';

// 开发文档 §三：编码/序列化

export function encodeSharePayload(palette: Palette): string {
  const payload: SharePayload = {
    c: palette.baseHex,
  };
  if (palette.name) {
    payload.n = palette.name.slice(0, 32);
  }

  const json = JSON.stringify(payload);
  const base64 = typeof window !== 'undefined'
    ? window.btoa(json)
    : Buffer.from(json).toString('base64');

  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function decodeShareHash(hash: string): SharePayload | null {
  try {
    // 补全 URL-safe base64 的 padding
    const padded = hash.padEnd(hash.length + ((4 - (hash.length % 4)) % 4), '=');
    const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');

    const json = typeof window !== 'undefined'
      ? window.atob(base64)
      : Buffer.from(base64, 'base64').toString('utf-8');

    const payload = JSON.parse(json) as unknown;
    if (!payload || typeof payload !== 'object') return null;
    if (!('c' in payload) || typeof (payload as Record<string, unknown>).c !== 'string') return null;

    const result = payload as SharePayload;
    // 验证 c 字段格式：小写 7 字符 HEX
    if (!/^#[0-9a-f]{6}$/.test(result.c)) return null;

    return result;
  } catch {
    return null;
  }
}
