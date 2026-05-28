# CellAbo (细胞实验室)

## 项目简介 / About

基于生物化学与分子生物学的 Minecraft 1.21.1 自动化整合包。将硬核生化反应搬进游戏，结合有限空间限制，让玩家体验作为细胞逐步建立中心法则、代谢反应的全流程。

不是传统工业包，没有 RF/EU 电力线。核心体验围绕自动化复杂度、物流复杂度和空间规划复杂度展开。

Target audience: Factorio / Shapez enthusiasts, tech pack veterans, players curious about biology and chemistry. Not a classic RF-based tech pack -- think biochemical automation, not electric grind.

## 核心玩法 / Gameplay

玩家出生在一个由 Compact Machines 构建的微型压缩空间中，模拟细胞内部的狭小环境。空间本身就是一种稀缺资源——需要合成特定蛋白质才能"推开"边界，获得扩张。从手动积攒基础有机物起步，建立核苷酸生产 -> RNA 复制 -> tRNA 物流 -> 翻译系统 -> 蛋白质自动化，最终形成完整细胞工业体系。

- 前期：空间极度受限，通过"扩散机制"获取少量资源，手动合成基础有机物
- 中期：建立 ATP 循环、RNA 复制、tRNA 物流，实现自动化
- 后期：多聚核糖体、高密度物流、生化系统耦合

The core gameplay loop is about scaling automation complexity: from manual amino acid collection to a fully automated protein synthesis pipeline, all within a space-constrained environment.

## 设计理念 / Design Philosophy

- 放弃传统 RF 能量体系，建立基于 ATP/NTP 的物质能量体系
- 机器通过中心法则翻译获得（蛋白质即酶），而非传统合成表
- 空间限制作为核心机制，借助 Compact Machines 实现，需合成特定蛋白才能扩张领地
- 信息流与实体流统一：需要 mRNA 图纸才能合成对应蛋白质
- 范式转移代替纯粹加法：将时间堆砌转化为工程布局与物流解谜

No RF, no EU. Energy is ATP. Machines are proteins translated from mRNA blueprints. Space is a resource you must earn.

## 核心机制 / Core Mechanics

**空间扩张**：开局锁死在小型"脂质体"内，合成膜骨架蛋白才能推开边界，获得更多工厂空间。

**超频（tRNA 浓度）**：机器内 tRNA 复合物数量决定翻译速度。浓度越高速度越快，但错误率（废料产出）与 ATP 消耗指数级上升。

**多聚核糖体（Polyribosome）**：多个核糖体机器串联时同步工作，模拟现实中的多聚核糖体翻译过程。mRNA 图纸可在流水线中循环利用。

**生物构件切割**：核糖体产出结构多肽块，放入切石机切割为微管（物品管道）、水通道蛋白（流体管道）、动力蛋白（抽取伺服器）等工业组件。

## Progression 章节 / Chapter Guide

第一章 -- 中心法则建立

- 子阶段 1 - 无中生有：通过基础操作获取小分子有机物、氨基酸、核苷酸、无机金属离子
- 子阶段 2 - 混沌汤时期：核苷酸投入水中产生 RNA 活性链，获得第一条 RNA 复制酶
- 子阶段 3 - RNA 复制酶阶段：利用复制酶和 tRNA 模板链批量复制 tRNA
- 子阶段 4 - 核酶阶段：组装第一代加工机核糖体核酶，以较低成功率合成短肽
- 子阶段 5 - 核糖体阶段：拼装大小亚基获得真核糖体，翻译膜骨架扩张蛋白

## 模组一览 / Mod List

核心框架
- KubeJS -- 自定义脚本框架
- CustomMachinery -- 自定义单方块机器
- ProbeJS -- 开发辅助

存储与物流网络
- AE2 (Applied Energistics 2) -- 存储网络
- MegaCells -- 大容量存储单元
- AdvancedAE -- 高级 AE2 扩展
- ExtendedAE -- AE2 附加扩展

物流与管道
- Modular Routers -- 模块化路由器
- Pipez -- 管道
- XNet -- 物流网络
- SFM (Super Factory Manager) -- 工厂物流管理

空间与存储
- Compact Machines -- 压缩空间（核心机制载体）
- Functional Storage -- 功能性存储

任务与界面
- FTB Quests -- 任务引导
- JEI (Just Enough Items) -- 物品查询

## 快速开始 / Getting Started

1. 使用 PCL 启动器或 Prism Launcher 加载整合包
2. 开局跟随任务书（FTB Quests）引导
3. 从收集基础小分子有机物和无机离子开始
4. 关注 JEI 中的自定义物品信息与合成路径

基于 NeoForge 1.21.1，Java 21 运行环境。

NeoForge 1.21.1, Java 21 required.

## 开发 / Development

所有自定义内容通过 KubeJS 实现，代码结构遵循 AGENTS.md 规范。

- 资源路径统一使用 `cellabo` namespace
- `startup_scripts/src/` -- 物品/方块/机器注册
- `server_scripts/src/` -- 配方与逻辑
- `client_scripts/src/` -- JEI 信息与 tooltip
- 贴图资源位于 `kubejs/assets/cellabo/textures/`

Custom content via KubeJS 7+. Resource namespace: `cellabo`. See AGENTS.md for full development guidelines.

## 许可证 / License

All rights reserved.
