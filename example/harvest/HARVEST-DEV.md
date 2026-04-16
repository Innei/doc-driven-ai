# HARVEST-DEV — 开发文档

> HARVEST 的工程规范。它回答：HARVEST 怎么被实现、哪些决策一旦确定就不可更改。
>
> 边界：`HARVEST.md` 是意图，`HARVEST-DESIGN.md` 是视觉契约，本文档是实现草稿。

---

## 一、工程底座

### 1.1 技术栈

| 层级 | 选型 | 备注 |
|------|------|------|
| UI 框架 | React 19 | 函数组件 + Hooks |
| 构建 | Vite 6 | 普通 SPA 即可 |
| 路由 | 无 | 单页应用，视图切换通过条件渲染 |
| 状态管理 | useState + useReducer |  habit 数据通过 Context 下沉，打卡记录用本地 state |
| 类型 | TypeScript strict | |
| 样式 | vanilla-extract | 零运行时，token 类型安全 |
| 持久化 | localStorage | 用户数据不离开浏览器 |
| 日期处理 | date-fns | 轻量，避免 moment.js |
| 部署 | 任意静态托管 | Vercel / GitHub Pages / Cloudflare Pages |

### 1.2 渲染策略

纯 SPA。只有一个 `index.html`，所有视图切换都在客户端完成。

### 1.3 状态管理边界

状态分为两层：

1. **应用状态（App State）**：当前显示的周起始日期、`view`（'grid' | 'manage'）
2. **领域状态（Domain State）**：habits 列表、check-ins 记录

领域状态通过 `HarvestContext` 提供，并在初始化时从 localStorage 读取。任何修改 habits 或 check-ins 的操作都会同步回写 localStorage。

### 1.4 项目目录结构

```
src/
  main.tsx                    ← React 挂载点
  App.tsx                     ← 根组件，持有 view 状态
  styles/
    tokens.css.ts             ← design token 契约
    global.css.ts             ← 全局 reset + 动效约束
  components/
    WeekNav.tsx / .css.ts
    HabitGrid.tsx / .css.ts
    HabitRow.tsx / .css.ts
    CheckCell.tsx / .css.ts
    HabitManager.tsx / .css.ts
    EmptyState.tsx / .css.ts
  context/
    HarvestContext.tsx        ← 领域状态 + localStorage 同步
  lib/
    date.ts                   ← 周起始计算、日期格式化
    storage.ts                ← localStorage 读写封装
    id.ts                     ← 简单 id 生成器
    types.ts                  ← 核心类型定义
```

### 1.5 样式系统

使用 vanilla-extract。所有组件自带同名的 `*.css.ts`。

全局强制规则写在 `global.css.ts` 中：

```ts
globalStyle('*', {
  transitionProperty: 'opacity, transform',
  transitionDuration: '150ms',
});
```

---

## 二、数据结构

### 2.1 核心类型定义

```ts
// ═══ 领域模型 ═══

interface Habit {
  id: string;
  name: string;
  createdAt: string; // ISO date
}

interface CheckIn {
  habitId: string;
  date: string; // ISO date (YYYY-MM-DD)
}

// ═══ 持久化格式 ═══

interface HarvestStore {
  version: 1;
  habits: Habit[];
  checkIns: CheckIn[];
}

// ═══ 运行时派生状态 ═══

interface HabitRowData {
  habit: Habit;
  checks: Record<string, boolean>; // key: date string
}
```

### 2.2 类型边界约束

- `date` 字符串统一使用 `YYYY-MM-DD` 格式，所有日期计算通过 `date-fns` 完成后再格式化为该格式
- habit 的 `id` 使用 8 位小写字母数字混合（`crypto.randomUUID` 的后 8 位或自定义生成器）
- `HarvestStore` 必须包含 `version` 字段，用于未来的数据迁移识别

---

## 三、持久化与存储

### 3.1 localStorage 键名

```ts
const STORAGE_KEY = 'harvest-data-v1';
```

### 3.2 读写策略

- **读**：应用挂载时从 localStorage 读取一次。如果读取失败或数据格式不兼容，静默降级为空状态（ habits = [] ）
- **写**：任何修改 habits 或 checkIns 的操作后 50ms 内 debounce 回写 localStorage
- **格式验证**：写入前确保对象符合 `HarvestStore` 结构，但不进行 JSON Schema 级别的严格校验

### 3.3 数据迁移

当前版本为 `version: 1`。如果未来需要变更数据结构，必须通过读取 `version` 字段并执行迁移函数。不允许直接覆盖旧格式。

---

## 四、冻结条款（必须遵守）

以下决策一旦确定就不可更改：

1. **习惯数量上限为 7 个**。增加上限会导致 grid 在移动端视觉崩溃，改变上限也会影响用户已有的心理模型。
2. **日期字符串格式为 `YYYY-MM-DD`**。改变格式会导致所有 check-in 记录失效。
3. **localStorage 键名 `harvest-data-v1`**。改变键名会导致旧用户数据丢失。
4. **周起始日为周一**。这是产品文档中「本周 grid」的核心约定，改变会混淆所有历史记录的可视化。

---

## 五、组件 API

### 5.1 WeekNav

```tsx
interface WeekNavProps {
  weekStart: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}
```

显示格式："4 月 14 日 – 4 月 20 日"。如果跨月/跨年，显示完整月份。

### 5.2 HabitGrid

```tsx
interface HabitGridProps {
  habits: Habit[];
  checkIns: CheckIn[];
  weekStart: Date;
  onToggle: (habitId: string, date: string) => void;
}
```

负责渲染 7 天表头和 habit rows。

### 5.3 CheckCell

```tsx
interface CheckCellProps {
  checked: boolean;
  isToday: boolean;
  onClick: () => void;
}
```

一个 40×40px 的可点击区域。`isToday` 为 true 时，外框使用 `--ink-60` 描边。

### 5.4 HabitManager

```tsx
interface HabitManagerProps {
  habits: Habit[];
  onAdd: (name: string) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}
```

不使用 Dialog/Modal，而是一个全屏覆盖的简单面板（设计文档 §6.2）。

---

## 六、内容数据集成

HARVEST 的引导文案存放在 `HARVEST-DATA.md` 中。开发时：

1. 从 `HARVEST-DATA.md` 提取文案
2. 写入 `src/lib/data/onboarding.ts` 作为 TS 常量
3. `EmptyState` 组件从该文件读取，不直接引用 Markdown

---

## 七、错误处理与降级

### 7.1 错误呈现原则

当 localStorage 读取失败时，不显示任何错误 UI。应用以空状态启动，用户不会察觉到数据丢失（因为他们本来就没有云端预期）。

### 7.2 静默降级场景

- localStorage 读取失败或 JSON 解析失败 → 以空状态启动
- localStorage 写入失败 → 不提示用户（功能继续正常运行，只是刷新后数据不保留）
- 用户输入空习惯名称 → 输入框轻微下沉回弹（同 ECHO 的空输入反馈），不显示错误文字
- 习惯数量已达 7 个 → "添加" 按钮自动 disabled，不弹出提示

---

## 八、性能约束

- habit 数量上限为 7，check-ins 数量在正常使用下不会超过数千条，因此不需要虚拟化或复杂优化
- 周切换动画期间（250ms）不应触发重新计算整个年度的数据
- localStorage 读写使用 debounce，避免连续打卡时的频繁 IO
