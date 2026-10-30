# Flute Daily (长笛每日练习助手) 🎵

> 专为长笛演奏者精心打造的现代化每日练习与进度追踪助手。采用 **Shadcn UI** 精美组件库，具备交互式伯姆长笛指法表、高精度数字节拍器、无人机持续长音调音、巴黎学派经典每日大练习、以及类似 GitHub 贡献热力的练习日历打卡与数据分析系统。

✨ **在线体验地址**: [https://stephenchou888.github.io/Flute-Daily/](https://stephenchou888.github.io/Flute-Daily/)  
🔗 **参考原型**: [Stephen Chou - Saxophone Daily](https://stephenchou888.github.io/Saxophone-Daily/)

---

## 🌟 核心功能亮点

### 1. 交互式伯姆长笛指法图解 (Fingering Chart)
- **覆盖音域**: 低音 C4 至极限超吹高音 D7，涵盖半音阶与常用替代指法（如 Bb 1+1 指法与 Briccialdi 降 B 拇指键切换）。
- **伯姆笛键可视化**: 完整呈现笛头吹孔、左手拇指 B/Bb 键、食指、中指、无名指、G# 小指侧键、颤音键以及右手食中无名、Eb 支撑键、低音 C#/C 键。
- **纯真声波试听**: 基于 Web Audio API 动态合成细腻的长笛真实泛音音色，支持单音试听与音名、频率、唱名速查。
- **五线谱联动与慢速指法演示**: 点击谱面切换指法，以可调速度自动逐音演示并高亮当前音符，支持循环播放与放大看谱。

### 2. 高精度 Web Audio 节拍器 (Metronome)
- **BPM 范围**: 30 - 260 BPM，采用 Web Audio 高精度预先调度算法，绝无界面卡顿引起的走音漂移。
- **拍号与细分**: 支持 2/4、3/4、4/4、6/8 拍号；支持四分、八分、三连音、十六分音符细分切分。
- **Tap Tempo**: 连续点击测速按钮即可自动识别敲击节拍速度。
- **视觉节拍律动**: 醒目的高光重音与环形律动跳动指示。

### 3. 校音基准音与无人机持续长音 (Drone & Pitch Reference)
- **国际基准律切换**: 支持 A=440 Hz 与国际长笛交响标准 A=442 Hz 快速切换。
- **12 个半音阶持续长音**: 用于纯律音准训练与八度、纯五度、大三度泛音拍频抵消训练。
- **长笛复合泛音与纯音切换**: 还原饱满共鸣声场。

### 4. 巴黎学派长笛经典每日大练习 (Routine Library)
系统化整合长笛百年教学法精华：
1. **长音与音色 (Marcel Moyse)**: B4 向下半音阶练习，色彩渐变动态控制 (pp < ff > pp)。
2. **泛音与口风灵活性 (Harmonics)**: 基于低音 C/C#/D 指法的多阶泛音发音法。
3. **音阶与琶音 (Taffanel & Gaubert EJ4/EJ10)**: 24个大小调珍珠般均匀的十六分音符大练习。
4. **吐音技巧 (Articulation)**: 单吐、双吐 (T-K-T-K) 提速与平衡训练、三吐 (Triplets)。
5. **手指灵活性与颤音 (Reichert No.2)**: 难点半音转换与独立手指机能。
6. **练习曲与曲目 (Andersen / Köhler / Mozart / Bach)**: 艺术表现力与音乐修养。

### 5. 详细进度追踪与练习打卡 (Practice Log & Analytics)
- **连续天数连击 (Streak)**: 自动统计当前连续练习天数与历史最高纪录。
- **GitHub 贡献热力图**: 最近 12 周的打卡热力方格矩阵，练得越多颜色越深。
- **分类统计图表**: 自动统计长音、音阶、吐音、曲目各自的时长占比。
- **练习日记记录**: 记录练习时长、曲目、突破最高 BPM、五星专注度评分及反思心得。
- **本地持久化与数据导出/导入**: 数据保存在浏览器中，支持一键导出 JSON 备份与随时导入恢复。

### 6. 长笛大师要诀与故障速查 (Master Tips)
- 吹孔覆盖 1/3 口风黄金法则
- 腹式深呼吸与喉部打开原理
- 吹奏杂音多、漏气、高音难发音、音高漂移等疑难杂症速查表
- 每日练后通条布与皮垫吸水纸保养手册

---

## 🚀 发布到 GitHub Pages 指南

本项目已在 `vite.config.ts` 中配置了相对基准路径 `base: './'`，并在 `.github/workflows/deploy.yml` 预置了自动化 GitHub Actions 编译流水线。

### 1. 提交代码到您的 GitHub 仓库
```bash
git add .
git commit -m "feat: complete Flute Daily practice companion"
git remote add origin https://github.com/stephenchou888/Flute-Daily.git
git branch -M main
git push -u origin main
```

### 2. 启用 GitHub Pages
1. 在 GitHub 打开仓库：`https://github.com/stephenchou888/Flute-Daily`
2. 点击 **Settings**（仓库设置）-> 左侧 **Pages**
3. 在 **Build and deployment** > **Source** 下拉框中，选择 **GitHub Actions**
4. 每次代码 push 到 `main` 分支后，GitHub 将自动运行构建并在 1-2 分钟内上线至：  
   `https://stephenchou888.github.io/Flute-Daily/`

---

## 🛠️ 技术栈
- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **Shadcn UI** 设计规范与组件体系
- **Web Audio API** (高精度节拍器与长笛音色合成)
- **Lucide React** (图标库)
- **Canvas Confetti** (打卡里程碑彩带特效)
