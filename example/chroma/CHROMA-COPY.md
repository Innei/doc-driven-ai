# CHROMA-COPY — UI 文案

> 这是 CHROMA 的 **UI 文案**文档。存放所有界面上出现的短文案：按钮标签、占位符、空状态提示、错误文案、格式名称。
>
> 所有文案必须符合 `产品文档 §0` 的假设 2：工具本身不该抢主角，语言风格同样如此——**不用感叹号，不用鼓励话术，直接说用户需要知道的事**。
>
> 组件中直接引用本文档中的字符串常量，统一在 `app/lib/copy.ts` 中导出。

---

## 输入区

| Key | 文案 |
|-----|------|
| `input.placeholder` | `#5e6ad2` |
| `input.error` | `无法识别的颜色格式` |
| `input.formats` | `支持 HEX、HSL、OKLCH` |

---

## 色阶预览区

| Key | 文案 |
|-----|------|
| `swatch.contrastOnWhite` | `on white` |
| `swatch.contrastOnBlack` | `on black` |
| `swatch.passAA` | `AA` |
| `swatch.failAA` | `—` |

---

## 代码导出区

| Key | 文案 |
|-----|------|
| `export.format.css` | `CSS Variables` |
| `export.format.tailwind` | `Tailwind Config` |
| `export.format.json` | `JSON` |
| `export.copy.idle` | `Copy` |
| `export.copy.done` | `Copied!` |

---

## 分享

| Key | 文案 |
|-----|------|
| `share.button.idle` | `Share` |
| `share.button.done` | `Link copied` |

---

## 历史列表

| Key | 文案 |
|-----|------|
| `history.heading` | `History` |
| `history.empty` | `No palettes yet` |
| `history.restore` | `Restore` |
| `history.remove` | `Remove` |
| `history.clear` | `Clear all` |
| `history.clearConfirm` | `Clear history?` |

---

## 预设入口

| Key | 文案 |
|-----|------|
| `presets.heading` | `Presets` |
| `presets.apply` | `（点击色块即应用，无需按钮标签）` |

---

## 分享落地页（/p/:hash）

| Key | 文案 |
|-----|------|
| `share.page.copyColor` | `Copy base color` |
| `share.page.openTool` | `Open in CHROMA` |
| `share.page.invalidHash` | `（无效链接时静默重定向，不展示此文案）` |

---

## 修订历史

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-04-16 | v1 | 初稿 |
