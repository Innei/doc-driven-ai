# AI Documentation Starter Kit

> 文档即模板。在 AI 驱动的开发时代，最值钱的 starter 不再是空目录和配置文件，而是一套**结构完整、意图清晰、可直接执行**的文档。

这个 starter kit 提取自真实项目的文档驱动实践，提供了一套可复用的文档体系模板。它的核心假设是：

**如果你能把项目的需求、约束、审美和工程决策写清楚，AI 就能帮你把它实现出来。**

---

## 核心文档契约

任何使用本 kit 的项目，都应维护以下文档层级：

| 文档 | 作用 | 优先级 |
|------|------|--------|
| `PROJECT.md` | **产品意图** — 这是什么、为谁而做、核心体验是什么、拒绝什么 | 最高 |
| `PROJECT-DESIGN.md` | **视觉契约** — 它长什么样、为什么拒绝别的样子（全英文） | 次高 |
| `PROJECT-DEV.md` | **工程规范** — 怎么实现、技术选型、数据结构和边界 | 实现层 |
| `PROJECT-DATA.md` | **结构化数据** — 带 ID 和标记的机器可解析内容资产 | 数据层 |
| `PROJECT-[TOPIC].md` | **专题内容** — 按领域拆分的内容资产（文案、题库、提示词等） | 数据层 |
| `AGENTS.md` | **AI 协议** — 告诉 AI 怎么读这些文档、怎么做决策 | 元层 |

**冲突解决原则**：当多份文档不一致时，以 `PROJECT.md` 的意图为准，`PROJECT-DESIGN.md` 的审美约束次之，`PROJECT-DEV.md` 最后跟进。

---

## 快速开始

### 1. 获取模板

```bash
git clone https://github.com/Innei/doc-driven-ai.git
cd doc-driven-ai
```

### 2. 复制模板

```bash
cp docs/templates/PROJECT.md      ./MYAPP.md
cp docs/templates/PROJECT-DESIGN.md ./MYAPP-DESIGN.md
cp docs/templates/PROJECT-DEV.md  ./MYAPP-DEV.md
```

把 `MYAPP` 替换成你的项目代号。按需复制 `PROJECT-DATA.md` 和 `PROJECT-TOPIC.md`。

### 3. 按顺序填空

**先写 `MYAPP.md`** — 不要急着定技术栈，先回答：
- 这个产品要解决的核心问题是什么？现有方案哪里不够好？
- 用户打开产品的第一秒会看到什么？
- 最核心的一个交互是什么？
- 它必须**拒绝**长成什么样？

**再写 `MYAPP-DESIGN.md`** — 基于产品意图，锁定视觉约束：
- 调色板有几档？为什么不能有第七档？
- 动画只允许出现在哪里？
- 什么组件从系统里**禁止存在**？

**最后写 `MYAPP-DEV.md`** — 把意图翻译成工程决策：
- 渲染策略（SSG / SSR / SPA 怎么分配？）
- 状态管理边界（哪些 store 持久化，哪些绝对不能？）
- 数据结构的冻结条款

### 4. 让 AI 开始工作

把 `AGENTS.md` 放在仓库根目录。当你对 AI 说：

> "基于 `MYAPP-DEV.md §一.1` 的技术栈和 `§二` 的数据结构，把 `MYAPP-DATA.md` 里的内容渲染成一个可交互的页面。参考 `MYAPP-DESIGN.md §2` 的调色板，注意 `DESIGN §2.4` 的禁止列表。"

AI 已经知道你的技术栈、token 命名规则、哪些设计红线不能碰。

---

## 目录结构

```
.
├── README.md
├── AGENTS.md                     # AI 上下文协议（每个项目必须复制到根目录）
├── docs/
│   ├── guides/
│   │   ├── how-to-use.md         # 使用指南
│   │   └── workflow.md           # 文档驱动开发的工作流
│   └── templates/
│       ├── PROJECT.md            # 产品文档模板
│       ├── PROJECT-DESIGN.md     # 视觉设计契约模板（全英文）
│       ├── PROJECT-DEV.md        # 工程规范模板
│       ├── PROJECT-DATA.md       # 结构化数据模板
│       └── PROJECT-TOPIC.md      # 专题内容模板（可按领域多份复用）
└── example/
    └── chroma/                   # 示例：调色板生成工具
        ├── CHROMA.md             # 产品文档
        ├── CHROMA-DESIGN.md      # 视觉设计契约（全英文）
        ├── CHROMA-DEV.md         # 工程规范
        ├── CHROMA-DATA.md        # 预设色板数据
        └── CHROMA-COPY.md        # UI 文案
```

---

## 设计原则

### 1. 文档即冻结层

`PROJECT-DEV.md` 里的"冻结条款"不是摆设。一旦项目上线并产生用户数据（URL、分享链接、存档文件），任何改动都会导致旧数据失效。**文档是你提前写下这些承诺的地方。**

### 2. 内容数据与代码分离

题目、文案、独白、提示词——这些应该放在独立的 `PROJECT-*.md` 里，而不是硬编码在 `.ts` 或 `.tsx` 文件中。这让非技术人员也能参与编辑，也让 AI 在重构代码时不会误伤内容。

### 3. 否定式约束比肯定式更有价值

好的设计文档不只是说"我们可以用什么"，更要说**"我们禁止什么"**。禁止列表越短越锋利，执行起来越不需要解释。

### 4. 跨文档引用是强制技能

每个章节编号独立，引用格式统一为：
- `产品文档 §X.Y` 引用 `PROJECT.md`
- `设计文档 §X.Y` / `DESIGN §X.Y` 引用 `PROJECT-DESIGN.md`
- `开发文档 §X.Y` 引用 `PROJECT-DEV.md`

这保证了当 AI 或人类在不同文档间跳转时，能精确定位上下文。

### 5. 专题文档按需拆分

`PROJECT-[TOPIC].md` 是一个可以多份复用的模板。一个项目可以有 `PROJECT-QUESTIONS.md`、`PROJECT-COPY.md`、`PROJECT-SCORING.md` 等多份。按领域拆分，每份文档只做一件事。

---

## 许可证

MIT — 你可以把它用在自己的项目里，也可以 fork 后改成适合自己团队的版本。
