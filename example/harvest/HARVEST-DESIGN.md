# HARVEST-DESIGN — Visual Design System

> 这是 HARVEST 的**视觉设计契约**。它回答：产品长什么样、为什么拒绝别的样子。
>
> 当本文档与 `HARVEST-DEV.md` 冲突时，**以本文档为准**（`HARVEST-DEV.md` 需要更新实现以匹配设计）。当本文档与 `HARVEST.md` 冲突时，**以 `HARVEST.md` 的产品意图为准**。
>
> 跨文档引用格式：`设计文档 §X.Y` 引用本文件，`产品文档 §X.Y` 引用 `HARVEST.md`，`开发文档 §X.Y` 引用 `HARVEST-DEV.md`。

---

## 1. The one thesis

HARVEST 的设计系统是**农事手账**。它的视觉语言来自纸质记录本：清晰的网格、柔和的墨水痕迹、没有数字仪表盘的感觉。每一条规则都在拒绝"效率工具"的审美。

---

## 2. Color

### 2.1 调色板哲学

三种物质：纸、淡墨、浓墨。没有品牌色，没有成功绿或警告红。打卡状态用"有墨"和"无墨"区分，而不是用彩色图标。

### 2.2 色值

```
--paper         #FAF8F5   页面背景
--ink-100       #1A1A1A   主文字、已打卡格子
--ink-60        #737373   次要文字、习惯名称
--ink-40        #B3B3B3   网格线、未激活日期
--ink-20        #E5E5E5   浅色分隔线、hover 背景
--ink-10        #F2F2F2   输入框背景
```

### 2.3 暗色模式

没有独立的暗色模式设计。系统跟随 `prefers-color-scheme: dark` 时，只将 `--paper` 反转为 `#121212`，所有 ink token 保持相同色相，仅略微提升对比度。不维护两套完整的 token 体系。

### 2.4 禁止存在的颜色 token

以下 token **不存在，也不允许被添加**：

```
--color-primary, --color-accent, --color-brand
--color-success, --color-error, --color-warning
--color-habit-1, --color-habit-2 ... （习惯没有专属颜色）
```

---

## 3. Typography

### 3.1 字体家族

```
--font-body     "Inter", system-ui, sans-serif
--font-display  "Inter", system-ui, sans-serif
```

HARVEST 不需要独立的 display 字体，保持统一的无衬线家族。

### 3.2 字号梯度

```
--text-xs   12px   日期缩写、小标签
--text-sm   14px   习惯名称、按钮文字
--text-base 16px   正文、周导航日期
--text-lg   20px   页面标题
```

**注意**：没有 24px 以上的字号。这是一个安静的应用，不需要大喊。

### 3.3 行高与字重

```
--lh-tight    1.2    标题
--lh-normal   1.5    正文与列表

--fw-regular  400    默认
--fw-medium   500    习惯名称、周导航当前日期
```

---

## 4. Space

### 4.1 间距梯度

```
--space-1    4px
--space-2    8px
--space-3    12px
--space-4    16px
--space-6    24px
--space-8    32px
--space-12   48px
```

**故意缺失的值**：没有 20px、没有 40px、没有 64px 以上。

### 4.2 页面边距与最大宽度

```
--page-padding-x   24px（移动端 16px）
--page-max         720px
```

HARVEST 始终是一个单列居中的窄页面，即使在桌面端也不会展开成 dashboard 布局。

---

## 5. Layout

### 5.1 布局原则

单列产品，没有侧边栏，没有固定底部导航。页面从上到下的顺序是：

1. 顶部周导航（左箭头 / 本周日期范围 / 右箭头 / "回到本周"）
2. 主 grid（习惯 × 7 天）
3. 底部操作区（"管理习惯" 链接）

### 5.2 禁止存在的布局元素

- 🚫 粘性头部或底部导航
- 🚫 多列布局或卡片网格
- 🚫 汉堡菜单或侧边抽屉
- 🚫 浮动操作按钮（FAB）
- 🚫 Tab 切换栏（周视图是唯一主视图）

---

## 6. Components

### 6.1 现有组件清单

以下组件存在于系统中，它们的 API 和视觉边界已被严格限定：

- **`WeekNav`** — 显示当前周范围，提供左右切换和回到本周
- **`HabitGrid`** — 习惯列表与 7 天打卡格子的矩阵
- **`CheckCell`** — 单个打卡格子，空或实两种状态
- **`HabitRow`** — 一行习惯名称 + 7 个 CheckCell
- **`HabitManager`** — 管理习惯列表的弹层/覆盖层（不是 dialog）
- **`EmptyState`** — 没有习惯时的引导展示

### 6.2 禁止引入的组件类型

以下组件类型**不存在于本产品中**，也不应被引入：

```
Button（除提交输入外不使用标准按钮样式，交互以文字链接和点击区域为主）
Card · Dialog · Toast · Snackbar · Tooltip
Alert · Banner · Badge · Chip · Tag · Pill · Avatar
Tabs · Accordion · Stepper · ProgressBar · Chart
Sidebar · Drawer · Popover · Dropdown · Select · Modal
```

**特别说明**：HARVEST 的"管理习惯"界面不使用 Dialog/Modal，而是用一个覆盖当前页面的简单面板，通过 opacity 和 y 轴位移进入。

---

## 7. Motion

### 7.1 动效原则

两层规则：
- **内容变化**（如 grid 切换周、打卡状态改变）使用 subtle 的 opacity + scale 动画
- **交互反馈**（如 hover、按下）必须 snap，不拖泥带水

### 7.2 弹簧参数

```
--spring-enter    stiffness: 120, damping: 20, mass: 1
--spring-surface  stiffness: 300, damping: 25, mass: 1  （用于格子状态切换）
```

### 7.3 具体动效规范

- **打卡瞬间**：格子从空变实，内部填充物从 `scale(0)` 弹到 `scale(1)`，时长 200ms
- **取消打卡**：填充物淡出到 opacity 0，时长 150ms，无弹回
- **切换周**：整个 grid 横向滑动（向左/右 16px）同时淡出淡入，时长 250ms
- **管理习惯面板**：从 `y: 8px, opacity: 0` 进入，时长 200ms

### 7.4 禁止的动效

- 🚫 没有页面切换的滑动过渡
- 🚫 没有数字滚动动画或计数器跳动
- 🚫 没有加载 spinner
- 🚫 没有 hover 时的阴影扩散或放大效果
- 🚫 没有 confetti 或任何庆祝动画

---

## 8. Accessibility

### 8.1 最低保证

- 所有前景/背景对比度达到 WCAG AA（4.5:1）
- 键盘焦点状态可见：格子获得焦点时显示 2px 的 `--ink-40` outline
- 点击目标最小 40×40px（CheckCell 设计为 40px 正方形）

### 8.2 `prefers-reduced-motion`

当用户开启系统减少动画偏好时：
- 所有弹簧动画退化为即时切换（duration: 0ms）
- 周切换不再有位移，只保留 opacity 150ms 淡变

---

## 9. Enforcement

### 9.1 如何防止违规

1. **TypeScript 类型系统**：vanilla-extract 的 token 类型安全阻止未声明的颜色/间距
2. **代码审查检查清单**：见 §9.2

### 9.2 PR Review 检查清单

审查任何涉及视觉代码的 PR 时，问这五个问题：

1. 是否引入了新的颜色字面量？
2. 是否对 `opacity` 和 `transform` 以外的属性加了 `transition`？
3. 是否使用了 `box-shadow`、大于 4px 的 `border-radius`、或渐变背景？
4. 是否使用了文档未声明的字体？
5. 是否从禁止列表中引入了新的组件类型（如 Chart、Badge、Toast）？
