# AGENTS.md

# CellAbo - AI Development Agent Specification

本文件规范 AI Agent 在本项目中的所有行为。  
AI 必须严格遵守，禁止跳过规范、修改项目结构或越权操作。

## 一、项目概述

**项目名称**：CellAbo（细胞实验室）  
**Minecraft 版本**：1.21.1

**核心设计理念**  
本整合包不是传统工业包，核心体验为：
- 空间受限下的自动化构建
- 单方块机器自动化
- 生化反应模拟（围绕生物化学与分子生物学）
- 物流调度
- 中心法则、细胞代谢、糖酵解、三羧酸循环等
- ATP/NTP 物质能量体系

**核心玩法方向**  
玩家从基础有机物起步，建立核苷酸生产 → RNA 复制 → 翻译系统 → 蛋白质自动化，最终形成完整细胞工业体系。

**禁止的设计方向**  
- 传统 RF/EU 电力 progression  
- 超大型 multiblock 作为核心  
- 单机器完成所有步骤  
- 纯挂机等待玩法  
- 无限堆机器直接解决问题  
- 极度离谱 grind

## 二、文件操作权限

**允许修改的目录**  
- `./config/**`
- `./kubejs/**`
- `./defaultconfigs/**`
- `./scripts/**`
- `./.gitignore`
- `./README.md`

**访问工作路径时必须使用**：  

**严禁操作**  
- 修改 `mods/`、`saves/`、`logs/`、`crash-reports/`、`shaderpacks/`、`resourcepacks/`、`libraries/`、`versions/` 等任何未授权目录或文件
- 修改 `.jar` 文件、解压 mod 文件
- 删除、重命名任何已有文件
- 修改 Minecraft 原始文件、Gradle 环境、启动参数、Java 源码
- 创建临时或垃圾文件（如 `temp.js`、`test.js`、`backup.js`、`old.js`、`copy.js`、`final.js` 等）

## 三、KubeJS 目录规范

server_scripts：允许配方修改/添加、loot 修改、tag 处理、服务端逻辑；禁止客户端渲染、tooltip、JEI/EMI 显示、startup 注册
client_scripts：允许JEI/EMI 显示、tooltip、Patchouli 显示等客户端内容；禁止配方逻辑、方块/物品注册
startup_scripts：允许物品/方块/流体注册、自定义机器注册、Creative Tab 创建；禁止：配方修改、动态运行逻辑

**架构要求**  
必须使用 `src` 子目录组织脚本：
- `server_scripts/src/`
- `client_scripts/src/`
- `startup_scripts/src/`

**src 目录职责**  
- 存储脚本，按模块拆分为独立文件
- 一个文件只负责一个系统（如 `aminoAcids.js` 仅处理氨基酸注册）
- 按功能划分子目录（如 `src/item/` 存放物品注册脚本）
- 允许在 `src` 中注册 event，但必须遵守模块化原则

**交互合成系统**  
- 交互合成（右键/左键方块触发掉落、合成等）放在 `server_scripts/src/interactive/` 下
- 一个文件对应一类交互行为（如 `rightClickHarvest.js` 仅处理右键掉落）
- 提供注册函数（如 `registerRightClickHarvest()`）供配方定义调用，事件全局只注册一次

**严格禁止**  
- 同一文件中重复定义同一 event
- 创建 test event 或随机命名的文件
- 过度抽象、过度拆文件、Java 企业级架构（一个简单 recipe 套三层 helper）

**工程原则**：KubeJS 脚本优先保证可读性、可维护性和数据直观性。

## 四、Recipe 组织规范

**目录结构**  
按照所修改的模组，将配方文件放入对应目录：
server_scripts/src/recipes/minecraft/
server_scripts/src/recipes/create/
server_scripts/src/recipes/ae2/
server_scripts/src/recipes/cellabo/

**文件命名**  
推荐以系统或功能命名，如 `metabolism.js`、`nucleotide.js`、`ribosome.js`。  
禁止无意义命名（`recipe.js`、`new.js`、`aaa.js` 等）。

**单文件职责**  
一个文件只负责一个系统，禁止混合多个无关系统或跨阶段 progression。

**注释规范**  
每组配方必须注明输入、输出、设计目的，示例：
```js
/*
输入：4x 核苷酸 + 1x ATP
输出：RNA 碎片
目的：用于 RNA 初期复制
*/
```

## 五、自定义机器规范

**注册**：所有机器注册必须放在 `startup_scripts/src/machine/` 下，禁止直接写在根目录。  
**资源路径**：
- 贴图：`kubejs/assets/cellabo/textures/`
- 模型：`kubejs/assets/cellabo/models/`
- 配方：`server_scripts/src/对应模组文件夹`
- JEI 信息：`client_scripts/src/jei/`

**命名**：统一使用 `cellabo:<machine_name>`，如 `cellabo:primitive_rna_replicator`，禁止无意义命名（`machine1` 等）。

## 六、JavaScript 代码规范

- **兼容 KubeJS 7.0+**
- **语法**：使用 ES6+，优先使用 `const`，必要时用 `let`，禁止 `var`
- **事件注册**：统一使用 `ServerEvents.recipes(event => {})`，禁止旧的 `onEvent()` 写法
- **常量**：统一抽取为常量（如 `const MODID = 'cellabo'`）
- **Tag 优先**：优先使用 `item/fluid tag`，减少硬编码具体物品
- **调试日志**：开发完成后必须删除所有 `console.log()`，或使用 `DEBUG` 开关控制，禁止在正式版遗留
- **幂等性**：脚本必须支持重复加载

**已知 KubeJS API 注意事项**  
- `BlockEvents.rightClicked` 的 `event.hand` 返回小写字符串 `'main_hand'` / `'off_hand'`
- 实体掉落物控制优先使用 `player.drop(stack, false)`，避免额外操作（motion/pickupDelay），以免出现不一致
- ProbeJS 生成的 `.d.ts` 是确认 API 可用性的首选依据（位于 `.probe/packages/generated-package/`）

## 七、资源规范

- **namespace**：统一使用 `cellabo`，禁止使用 `kubejs` 或其他 namespace
- **路径**：所有资源统一放在 `kubejs/assets/cellabo/` 下

## 八、Git 工作流规范

**开发流程**  
1. 分析需求  
2. 阅读相关代码  
3. 制定修改方案  
4. 实施修改  
5. 检查：结构、命名、语法、重复 ID  
6. 本地验证  
7. `git commit`

**Commit 格式**  

`<type>(<scope>): <description>`

示例：
- `feat(ribosome): 添加 primitive ribosome progression`
- `rebalance(atp): 调整 ATP 前期产量`

**Commit 类型**：`feat`, `fix`, `rebalance`, `refactor`, `compat`, `art`, `remove`  
**粒度**：一次 commit 只做一件事，禁止混合修改配方、贴图、任务等不同性质的内容。

## 九、AI Agent 工作流程
AI 禁止直接编写代码，必须严格遵循以下步骤：

1. **需求分析**：分析当前 progression 阶段、涉及系统/模组、对平衡/自动化/物流复杂度的影响  
2. **阅读已有代码**：检查已有 recipes、helpers、constants、机器注册、tags，避免重复实现  
3. **设计方案**：说明将要修改的文件、原因、是否新增资源/机器/helper  
4. **实施**：保持命名统一、注释完整、模块边界清晰  
5. **验证**：检查语法错误、重复 ID、错误 namespace、循环配方、progression 跳阶段、自动化死锁、JEI 可读性  
6. **总结**：输出修改文件列表、内容、潜在影响、后续建议

**AI 禁止行为总则**  
AI 只负责工程实现，不拥有设计权。禁止任何自作主张的行为，包括但不限于：
- 大规模重构、修改 unrelated 文件
- 擅自新增/删除系统、修改 progression、调整产量或已完成配方
- 擅自降低复杂度、移动文件、删除代码
- 任何设计层面的决策（由人类设计者决定）

## 十、Progression 设计原则

本整合包 progression 的核心不是数值膨胀，而是**自动化复杂度、物流复杂度和空间规划复杂度的提升**。

- **前期**：资源、空间紧缺，自动化困难  
- **前期**：ATP 循环、RNA 复制、tRNA logistics  
- **前期**：多聚核糖体、高密度物流、生化系统耦合

## 十一、AI 输出规范

每次完成任务后，必须输出：
- **修改文件列表**（新增/修改的文件）
- **修改内容说明**（做了什么、为什么）
- **风险说明**（是否影响旧存档、平衡、自动化）

## 十二、FTB Quests 规范

FTB Quests存储位置：config/ftbquests/

修改任务前必须：
* 阅读已有任务结构
* 阅读 chapter dependency
* 检查任务链是否循环
* 检查 reward 是否重复

禁止：
* 擅自重排任务坐标
* 擅自修改整个 chapter
* 擅自删除任务
* 擅自修改 quest id

推荐：
* 一次只修改一个 chapter
* 保持任务树结构稳定
* 保持 progression 连续

任务文本必须：
* 符合 CellAbo 世界观
* 强调生化逻辑
* 强调 progression
* 避免传统工业包叙事

任务设计优先：
* 引导物流
* 引导自动化
* 引导系统理解

而不是：
* 单纯奖励物品

*本文件为 AI Agent 行为最高准则，任何 progression、balance、世界观及机制方向均以人类设计者决定为准。*