# CHROMA-DATA — 预设色板数据

> 这是 CHROMA 的**预设色板**数据文档。存放用户可一键选用的快捷色板种子，作为"快速开始"入口。
>
> 阅读本文档前，请先阅读 `CHROMA.md`（产品意图）和 `CHROMA-DEV.md §五`（数据集成方式）。
>
> **解析约定**：本文档由构建脚本解析为 `app/lib/data/presets.ts`。每条预设的格式为三字段：`id`（slug）、`name`（显示名）、`hex`（基色，`#rrggbb` 格式）。

---

## 格式说明

每条预设占一个三级标题块，格式如下：

```
### [id] · [name]
hex: [#rrggbb]
```

解析脚本匹配 `### ` 开头的行提取 id 和 name，匹配 `hex: ` 行提取颜色值。

---

## 预设列表

### slate · Slate
hex: #64748b

### gray · Gray
hex: #6b7280

### red · Red
hex: #ef4444

### orange · Orange
hex: #f97316

### amber · Amber
hex: #f59e0b

### yellow · Yellow
hex: #eab308

### lime · Lime
hex: #84cc16

### green · Green
hex: #22c55e

### teal · Teal
hex: #14b8a6

### cyan · Cyan
hex: #06b6d4

### blue · Blue
hex: #3b82f6

### indigo · Indigo
hex: #6366f1

### violet · Violet
hex: #8b5cf6

### purple · Purple
hex: #a855f7

### pink · Pink
hex: #ec4899

### rose · Rose
hex: #f43f5e

---

## 说明

以上 16 个预设对应 Tailwind CSS v3 的标准色系基色（500 档），便于用户对照熟悉的参照物验证工具的生成结果。

预设**仅作为快捷入口**，不影响生成算法本身——生成结果由用户的实际输入颜色决定，与预设是否为标准色无关。

---

## 修订历史

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-04-16 | v1 | 初稿，16 个 Tailwind 标准预设 |
