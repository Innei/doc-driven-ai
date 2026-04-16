# CHROMA-DEV — 开发文档

> 这是 CHROMA 的**工程规范**。它回答：产品怎么被实现、数据结构长什么样、哪些决策一旦定下来就不可更改。
>
> **边界**：`CHROMA.md` 回答「是什么」，`CHROMA-DESIGN.md` 回答「长什么样」，本文档回答「怎么被实现」。三份文档冲突时，`CHROMA.md` 是意图，`CHROMA-DESIGN.md` 是视觉契约，本文档是实现当前的草稿。意图先改，视觉契约再跟上，实现最后跟上。
>
> **跨文档引用约定**：`产品文档 §X.Y` 引用 `CHROMA.md`，`设计文档 §X.Y` 引用 `CHROMA-DESIGN.md`，`开发文档 §X.Y` 引用本文档。

---

## 一、工程底座

### 1.1 技术栈

| 层级 | 选型 | 约束/备注 |
|------|------|----------|
| UI 框架 | React 19 | 函数组件 + Hooks，不用 class |
| 构建工具 | Vite 8 | dev server + 生产 build |
| 路由 | React Router v7 · Framework mode | file-based routing，`app/routes/*.tsx`，开启 prerender |
| 状态管理 | Zustand | 两个 store，见 §1.3 |
| 类型系统 | TypeScript strict | `tsc --noEmit` 作为类型检查 |
| 样式方案 | vanilla-extract | 零运行时 CSS-in-TS；[设计文档 §2–§4] 的 token 通过 `createThemeContract` 落地 |
| 图标 | lucide-react | 单色线性图标，strokeWidth 2，尺寸 14–16px |
| 包管理器 | pnpm | |
| 部署 | Vercel | `build/client` 为静态产物 |

### 1.2 渲染策略

"两静一动"：主工具页静态可预渲染，分享落地页为纯客户端。

| 路由 | 渲染方式 | 说明 |
|------|---------|------|
| `/` | SSG 预渲染 | 工具主体（颜色输入 + 色阶预览 + 代码面板 + 历史列表）；壳预渲染，hydrate 后激活所有交互 |
| `/p/:hash` | 纯 SPA，不参与 SSG | 分享落地页；hash 内容由客户端解码，无法预渲染；Vercel rewrite 将此路径导向静态壳 |

`/p/:hash` 首屏短暂空白（主题底色 + 单个中性色块占位），hydrate 后解码 hash 渲染色板。这是换来"分享链接无需服务器"的可接受代价（`产品文档 §6`）。

### 1.3 状态管理

两个 store，按职责分离，互不 import。

```ts
// app/stores/useGeneratorStore.ts
//   职责：当前正在编辑的色板——输入颜色、生成的 Palette 对象、当前导出格式
//   服务：仅 / 路由使用；进入 /p/:hash 时不读此 store
//   持久化：不落 localStorage。刷新即重置为默认颜色（见 §1.3 默认值）

interface GeneratorState {
  input: string;           // 用户输入的原始字符串（HEX / HSL / OKLCH）
  inputError: boolean;     // 解析失败时为 true，色阶不更新
  palette: Palette | null; // 解析成功后的当前色板
  format: ExportFormat;    // 'css' | 'tailwind' | 'json'

  setInput(value: string): void;
  setFormat(format: ExportFormat): void;
}

// app/stores/useHistoryStore.ts
//   职责：本地历史——用户生成过的色板列表
//   服务：/ 路由的历史列表区域
//   持久化：通过 zustand persist 写 localStorage，键名 'chroma-history'
//   partialize：只写 { history } 字段，version: 1
//   上限：最多保存 20 条；新增时超出则移除最旧一条

interface HistoryState {
  history: HistoryRecord[];
  addToHistory(palette: Palette): void;
  removeFromHistory(id: string): void;
  clearHistory(): void;
}
```

**persist 要点**：
- `createJSONStorage(() => localStorage)` 包在 `typeof window !== 'undefined'` 判断内（RR7 SSG 预渲染时无 window）
- `version: 1`；未来结构变更写 `migrate` 函数，不直接破坏旧存档
- `partialize` 只序列化 `{ history }`，不序列化 setter

**默认颜色**：`useGeneratorStore` 初始化时 `input = '#6366F1'`（一个中性的 indigo，便于演示色阶效果）。

### 1.4 路由与目录结构

```
app/
  root.tsx               ← 根布局：主题注入、防闪烁内联脚本（见 §1.5）
  routes.ts              ← 路由表
  routes/
    _index.tsx           ← / 主工具页
    p.$hash.tsx          ← /p/:hash 分享落地页（纯 SPA）
  components/
    ColorInput.tsx
    SwatchRow.tsx
    StopCard.tsx
    CodePanel.tsx
    CopyButton.tsx
    ShareButton.tsx
    HistoryList.tsx
    HistoryRow.tsx
  stores/
    useGeneratorStore.ts
    useHistoryStore.ts
  lib/
    color/
      parse.ts           ← 解析 HEX / HSL / OKLCH 字符串
      scale.ts           ← 核心：从基色生成 11 档色阶
      contrast.ts        ← 计算与白/黑的 WCAG 对比度
      export.ts          ← 将 Palette 序列化为 CSS / Tailwind / JSON 字符串
    codec.ts             ← Palette → URL hash 的编解码（见 §三）
  styles/
    tokens.css.ts        ← createThemeContract（[设计文档 §2–§4]）
    theme.css.ts         ← light / dark 主题实现
    global.css.ts        ← reset + 根字体
```

### 1.5 主题与防闪烁

主题（light / dark / auto）存入 localStorage，键名 `chroma-theme`。

防闪烁脚本以**内联 `<script>`** 的形式注入 `root.tsx` 的 `<head>` 中，在 React hydrate 前读取 localStorage 并将 `data-theme` 写到 `<html>`。这是 SSG 预渲染项目唯一可靠的防闪烁方式；不要用 CSS media query 替代，因为 media query 无法覆盖用户手动切换的场景。

---

## 二、数据结构

### 2.1 核心类型定义

```ts
// ═══ 色阶算法层 ═══

/** 单档颜色，来自 scale.ts 的计算结果 */
interface Stop {
  step: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
  hex: string;           // '#rrggbb'，小写
  oklch: string;         // 'oklch(L C H)'，3 位小数
  contrastOnWhite: number; // WCAG 对比度比值，2 位小数，如 4.53
  contrastOnBlack: number;
}

/** 完整色板，11 档 */
interface Palette {
  id: string;            // nanoid(8)，创建时生成
  baseHex: string;       // 用户输入归一化后的基色，始终为 '#rrggbb'
  name: string | null;   // 用户可选填的名称；分享时写入 hash
  stops: Stop[];         // 长度固定为 11，顺序为 50→950
  createdAt: number;     // Date.now()
}

// ═══ 导出格式层 ═══

type ExportFormat = 'css' | 'tailwind' | 'json';

// export.ts 根据 Palette 和 ExportFormat 返回纯字符串，无副作用
function generateExport(palette: Palette, format: ExportFormat): string { ... }

// ═══ 持久化层 ═══

/** 存入 localStorage 的历史条目（与 Palette 相同，加 version 字段） */
interface HistoryRecord extends Palette {
  _version: 1;  // 用于 migrate
}
```

### 2.2 类型边界约束

- `Stop[]` 的长度**始终为 11**，顺序**始终为 50→950**。任何读取 stops 的代码都可以假设这两点，不需要防御性检查。这由 `scale.ts` 的实现保证（见四·冻结条款）。
- `Palette.baseHex` **始终为小写 7 字符 HEX**（`#rrggbb`），由 `parse.ts` 在入口处归一化。任何下游代码不需要再次归一化。
- `generateExport` 是 Palette → 代码字符串的**唯一入口**，组件不得自行拼接导出字符串。

---

## 三、编码/序列化

### 3.1 明文格式

分享链接的 payload 是一个紧凑 JSON 对象：

```ts
interface SharePayload {
  c: string;       // baseHex，'#rrggbb'
  n?: string;      // name（可选，最长 32 字符）
}
```

示例：`{"c":"#6366f1","n":"Indigo"}`

### 3.2 编码算法

1. 将 `SharePayload` 序列化为 JSON 字符串（无空格）
2. 将字符串以 UTF-8 编码为字节数组
3. 以 `btoa` 转为 Base64，再将 `+/=` 替换为 `-_`（URL-safe Base64）
4. 写入 URL：`/p/<base64url>`

解码时反向执行。失败（无效 base64、无法解析 JSON、缺少 `c` 字段）则静默重定向到 `/`。

### 3.3 解码与失败处理

```ts
function decodeShareHash(hash: string): SharePayload | null {
  try {
    const json = atob(hash.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(json);
    if (typeof payload.c !== 'string') return null;
    return payload;
  } catch {
    return null;
  }
}
```

`/p/:hash` 路由在 `useEffect` 中调用此函数。返回 `null` 时 `navigate('/', { replace: true })`。

---

## 四、冻结条款（必须遵守）

以下条款在产品上线、有用户分享链接后**不应更改**。更改任何一条都会导致旧分享链接失效：

1. **Stop 档位集合**：`[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]`，共 11 档，顺序固定。不可增删，不可重命名。
2. **SharePayload 的 `c` 字段**：始终为小写 `#rrggbb` 格式的 7 字符 HEX。解码时若不满足此格式，视为无效链接。
3. **编码方式**：URL-safe Base64（`-_` 替换 `+/`）。不可切换为其他编码方案（如 base62、brotli）。

如果需要修改其中任何一条，那不是"版本升级"，而是一次**格式迁移**——旧分享链接将失效，需要迁移方案或版本字段。

---

## 五、内容数据集成

预设色板（供用户一键选用的快捷入口）存放在 `CHROMA-DATA.md`。构建时由脚本解析为 `app/lib/data/presets.ts` 常量，格式：

```ts
interface PresetColor {
  id: string;     // slug，如 'indigo'
  name: string;   // 显示名称，如 'Indigo'
  hex: string;    // '#rrggbb'
}

export const PRESETS: PresetColor[] = [ ... ];
```

UI 文案（按钮标签、空状态、错误提示）存放在 `CHROMA-COPY.md`，直接在组件中以字符串常量引用，不需要 i18n。

---

## 六、错误处理与降级

### 6.1 错误呈现原则

颜色输入无法解析时：输入框边框变为 `--ink-30`（不是红色——`产品文档 §5 产品禁忌`，也是 `设计文档 §2.4` 禁止语义色的具体应用），色阶保持上一个有效状态不变。不显示 Toast、不显示错误文案，仅视觉反馈。

### 6.2 静默降级场景

- localStorage 读取失败（隐私模式或权限拒绝）：历史列表显示空态，不报错，正常使用生成功能
- `/p/:hash` 解码失败：静默重定向到 `/`
- 主题读取失败：回退到 `light`
