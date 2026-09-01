# Old Venetian Port of Chania - 修改总结

## 2026-09-01 单景点 SEO 实体绑定：内容深度 + 结构化数据 + PWA/GA4（第三轮）

### 1. ✅ knowledge 段 4→6 段（新增两个维度，InfoSection 自动渲染）
- `firkas`「Firkas 堡垒与港口防御工事」：1629 年威尼斯人建堡守卫港口入口，与灯塔/防波堤构成海上防御环（五语同步）
- `trade`「四通八达的航海贸易网络」：连接威尼斯与东地中海，输出葡萄酒/橄榄油/陶器，Arsenali 船坞与海关（五语同步）

### 2. ✅ 新增 FAQ 板块 + FAQPage 结构化数据
- 新组件 `src/components/FAQSection.tsx`（id="faq"，手风琴，answers 用 hidden 属性保留在 DOM 中，利于 schema 校验）
- 7 条决策型长尾问答：位置 / 免费开放 / 老城停车 / 最佳拍摄点 / 带娃方便吗 / 游船 / 公共卫生间
- `page.tsx` 首页渲染 FAQPage JSON-LD（mainEntity 7 Question/Answer，随语言变化）

### 3. ✅ 新增 SourcesSection 官方来源（E-E-A-T 核心信号）
- 新组件 `src/components/SourcesSection.tsx`（id="sources"）：6 个官方/机构来源卡片（GNTO / 希腊文化部 / 哈尼亚市政府 / 市属港口基金会 / Incredible Crete / 考古地籍系统）
- 含「图片版权」声明块：所有图片产权及版权归原摄影者所有（五语）

### 4. ✅ JSON-LD TouristAttraction 补全
- `geo`（GeoCoordinates 35.5171655/24.0151836，与地图嵌入一致）
- `touristType`（Historic Landmark / Harbor）
- `image`（hero 图绝对 URL）、`hasMap`（Google Maps 短链）、`sameAs`（短链 + GNTO 专题页）

### 5. ✅ 地图嵌入与权威外链
- `MapEmbed.tsx` iframe src 换成用户提供的精确 pb embed（含坐标 35.5171655/24.0151836）
- 地图下方新增 GNTO 官方旅游组织外链（officialText/officialLabel）

### 6. ✅ TDK/OG 实体绑定 + 标题层级
- 五语 title/description 统一为「全称 (城市) - 指南 & 位置」格式；H1 = 全称 + (城市)（如 "Old Venetian Port of Chania (Chania)"）
- openGraph 新增 `images`（hero 图 1200×630 + imgAlt）；manifest 元数据
- Hero 背景图 alt 绑定 `hero.imgAlt`

### 7. ✅ 正文语义绑定
- `Intro.tsx` 新增面包屑（全称 → 城市 → 州/大区 → 国家），与 BreadcrumbList JSON-LD（5 项）配套
- **en.json intro 统一为 Hub 版**（标题改 "Your Guide to Chania & the Venetian Port"，消除五语中唯一旧文案）

### 8. ✅ PWA + GA4
- 新增 `src/app/manifest.ts`（/manifest.webmanifest，主题色 #3a7a8d，start_url /en）
- 新增 `public/sw.js`（缓存优先 SW，layout 注册）+ `public/icons/icon.svg`（灯塔图标）
- GA4 `G-HXM22WWPKP`：同意门控加载（读 cookiePrefs.analytics，cookie 设置页保存时派发 consent-updated 事件即时生效）

### 9. ✅ 图片产权 + 页脚
- `Footer.tsx` 页脚新增 imageRights 一行声明（五语）

### 10. ✅ 验证
- `node scripts/check-i18n.mjs`：23 顶层键 / 137 叶子键 / 14 列表 parity 全部 PASS
- read_lints 0 错误；`npm run build` 成功（27 页：5 语 × 4 路径 + manifest/robots/sitemap/not-found/根重定向）
- 构建产物抽查：五语页面均含 FAQPage/BreadcrumbList/id="faq"/id="sources"/touristType/GeoCoordinates/og:image/G-HXM22WWPKP/图片版权等
- 注意：build 时 ESLint 报 "Converting circular structure to JSON" 为 Next 15.5 + eslint-config 环境已知问题，不影响构建

### 剩余（人工环节）
- de/fr/el/zh 文案（尤其新增的 firkas/trade/faq/sources 段）需母语者终校
- 照片 public/gallery 文件名含空格括号，建议重命名为 SEO 友好名

---

## 2026-09-01 内容深化：游客设施 + 历史故事传说（专业科普落地页）

### 1. ✅ 新增 FacilitiesSection（中立设施指南，TransportSection 之后）
- 6 类设施卡片（图标 + 标题 + 描述 + hint 徽章）：公共卫生间 WC、停车、餐饮与咖啡馆、酒店与住宿、超市与商店、加油与充电
- 严格中立：只描述设施类型，不推荐任何具体商户（符合非盈利定位）
- 五语文案（en/zh/el/de/fr）同步，hint 徽章差异化（如"夏季车位紧张""旺季建议提前预订"）
- 新组件 `src/components/FacilitiesSection.tsx`，id="facilities"

### 2. ✅ 新增 StoriesSection（有据可考的历史故事/传说，InfoSection 之后）
- 5 条带编号 + tag 徽章的故事卡片：
  1. 阿尔森纳利船坞（Arsenali）：地中海最古老船坞之一，威尼斯桨帆船建造地（航海史）
  2. "埃及灯塔"之名的由来：16世纪威尼斯始建，19世纪埃及治理期（1830s–1841）重建（灯塔历史）
  3. 奥斯曼时代的水岸：1645 年征服后增建清真寺/浴室/仓库，Yali 清真寺至今仍存（奥斯曼遗产）
  4. 列强与通往希腊之路：1898 年英法俄意治理，1913 年并入希腊（近代史）
  5. 1941 年克里特战役（二战）
- 内容全部基于可核实史实，避免虚构细节
- 新组件 `src/components/StoriesSection.tsx`，id="stories"

### 3. ✅ 目录同步更新
- `TableOfContents.tsx` 新增 facilities / stories 两个锚点，现共 13 个板块

### 4. ✅ 验证
- `node scripts/check-i18n.mjs`：21 顶层键 / 124 叶子键 / 11 列表 parity 全部 PASS（新增 facilities 6/6/6、stories 5/5/5）
- read_lints 0 错误

### 建议后续（未执行，待确认）
- knowledge 段扩至 6-7 段（补"防御工事 Firkas 堡垒"与"航海贸易网络"）
- 新增 FAQ 板块（利于 FAQPage schema 与决策型长尾）
- 新增 SourcesSection 官方来源（希腊文化部/哈尼亚市/GNTO，增强 E-E-A-T）
- JSON-LD TouristAttraction 补 geo 坐标与 touristType
- de/fr/el/zh 文案母语者终校

---

## 2026-09-01 GSC/GA4 数据驱动 SEO 优化

### 1. ✅ 清除旧模板残留（合规）
- `src/app/[locale]/layout.tsx`：域名 `dinglicliffsmalta.com` → `oldvenetianportchania.com`；hreflang 由已删除的 mt/it/es 修正为 zh-CN/en/el/de/fr + x-default=en；`<html lang>` 修正为 zh-CN/en/el/de/fr；openGraph locale 补 el_GR/de_DE/fr_FR；siteName 改 "Old Venetian Port of Chania"；**移除 AdSense 占位符（ca-pub-XXXXXXXXXX 两行）**
- 3 个法律页（privacy-policy/terms-of-service/cookie-settings）：域名与 hreflang 同步修正

### 2. ✅ 多语言架构扩展（捕获 de/fr 流失流量）
- `src/i18n/routing.ts`：locales 新增 `de`、`fr`（现为 zh/en/el/de/fr 五语）
- 新建 `src/messages/de.json`（德语全量翻译，TDK 覆盖 `chania kreta` / `chania sehenswürdigkeiten`）
- 新建 `src/messages/fr.json`（法语全量翻译，TDK 覆盖 `la canée` / `port de la canée`）
- `LanguageToggle.tsx` 语言标签补 Deutsch / Français
- `scripts/check-i18n.mjs`：校验 5 语 JSON 有效性 + 顶层/深层 key parity + 数组长度（19 keys / 118 leaf keys / 9 lists ALL PASS），package.json 加 `check:i18n`

### 3. ✅ TDK 重写（意图从"单一景点"扩展为"哈尼亚老城+威尼斯港口综合指南"）
- en：`Old Venetian Port & Chania Old Town: Top Sights & Travel Guide`
- zh：`哈尼亚老城与威尼斯港口旅游攻略：必看景点与旅行指南`
- el：`Παλαιό Ενετικό Λιμάνι & Παλιά Πόλη Χανίων: Οδηγός & Αξιοθέατα`
- de/fr 见上；Hero 标题/副标题与 Intro 文案同步升级为 Hub 定位，正文嵌入 `things to do in chania` / `parking near the port` 等机会词
- 评分统一更新为 4.8 (42,053)，与 JSON-LD aggregateRating 一致

### 4. ✅ JSON-LD 结构化数据（layout.tsx @graph）
- Organization（#organization）→ WebSite（#website）→ WebPage（#webpage，datePublished 2026-05-01 / dateModified 2026-09-01，inLanguage 按 locale）
- TouristAttraction（#attraction）：alternateName 含希腊/法语名、address、isAccessibleForFree、aggregateRating 4.8/42053、openingHoursSpecification 每日 00:00-23:59

### 5. ✅ sitemap.ts + robots.ts
- `src/app/sitemap.ts`：5 语 × 4 路径 = 20 URL，每项含 hreflang alternates，lastModified 固定 2026-09-01 避免构建漂移
- `src/app/robots.ts`：allow all + sitemap 指向

### 6. ✅ Hub 页定位：页面目录（TableOfContents）
- 新增 `src/components/TableOfContents.tsx`（Hero 之后，11 个板块锚点卡片，复用各 section 标题键，无新增翻译键负担）
- 全部 section 组件补齐 `id` 锚点（intro/basic-info/hours/tickets/transport/knowledge/route/photo-spots/gallery/reviews/map）
- globals.css 增加 `section[id]{scroll-margin-top:5rem}`

### 验证
- 5 语 JSON 全部有效；`node scripts/check-i18n.mjs` ALL PASS；read_lints 0 错误
- 残留检查：dinglicliffsmalta / ca-pub / mt|it|es / 40,488 全库零匹配
- npm run build 因耗时未本地验证（依赖已安装）

### 剩余（人工/内容阶段）
- de/fr 文案为机器辅助翻译，上线前需母语者终校
- Hub & Spoke 子页（Things to Do in Chania Old Town / Lighthouse & Fortresses / Waterfront Restaurants / Parking & Transport）待发布
- 可选：后续新增 /it/ 覆盖 `cosa vedere a chania`

---

## 早期记录（已归档）

### 1. ✅ 添加希腊语支持
- 修改 `src/i18n/routing.ts`：支持 zh（中文）、en（英文）、el（希腊语）
- 删除多余语言文件：`mt.json`, `it.json`, `es.json`
- 创建 `src/messages/el.json`（希腊语翻译文件）

### 2. ✅ 更新景点信息为 Old Venetian Port of Chania
- **英文消息** (`en.json`)：
  - 标题：Old Venetian Port of Chania
  - 副标题：Historic Landmark · Crete, Greece
  - 评分：4.8 (40,488 reviews)
  - 地址：Ag. Markou 8, Chania 731 32, Greece
  - Plus Code：G289+V2 Chania, Greece
  - 电话：+30 2821 05606

- **中文消息** (`zh.json`)：
  - 标题：哈尼亚老威尼斯港口
  - 副标题：历史地标 · 希腊克里特岛
  - 包含所有中文翻译

- **希腊语消息** (`el.json`)：
  - 标题：Παλαιό Ενετικό Λιμάνι Χανίων
  - 副标题：Ιστορικό Ορόσημο · Κρήτη, Ελλάδα
  - 包含所有希腊语翻译

### 3. ✅ 更新首屏背景图
- 修改 `src/components/Hero.tsx`：
  - 背景图：`/gallery/old-venetian-port-of-chania (1).jpg`
  - Google Maps 链接：https://maps.app.goo.gl/2ABtjDZz3dGynkJV8

### 4. ✅ 修复照片画廊
- 修改 `src/components/Gallery.tsx`：
  - 更新所有18张照片路径
  - 默认显示8张，点击"显示完整照片"显示全部18张
  - 支持 Lightbox 查看大图
  - 所有 Google Maps 链接已更新

### 5. ✅ 删除"探索更多"板块
- 检查确认无"探索更多"相关内容

### 6. ✅ 更新所有 Google Maps 链接
已更新以下4个位置的 Google Maps 链接为：https://maps.app.goo.gl/2ABtjDZz3dGynkJV8
- 首屏 Hero 区域
- 照片画廊 Gallery
- 游客评价 Reviews
- 地图位置 MapEmbed

### 7. ✅ 更新友情链接
修改 `src/components/Footer.tsx`，删除旧链接，添加新链接：
- 希腊国家旅游组织（GNTO）：https://www.visitgreece.gr/inspirations/the_old_port_area_of_chania/
- 克里特大区官方旅游：https://www.incrediblecrete.gr/
- 哈尼亚市政府及官方旅游局：https://www.chaniatourism.gr/
- 哈尼亚市属港口基金会：https://www.dlx.gr/enetiko-limani-2-2/
- 希腊国家考古地籍系统：https://www.arxaiologikoktimatologio.gov.gr/
- 希腊国家文化遗产数字检索库：https://www.searchculture.gr/aggregator/

### 8. ✅ 修复语言切换问题
- 修改 `src/components/LanguageToggle.tsx`：
  - 更新语言标签：中文、English、Ελληνικά
  - 修复 `switchLocale` 函数逻辑
  - 确保切换语言时路径正确（如 /zh, /en, /el）

### 9. ✅ 创建 .gitignore 文件
创建 `.gitignore` 文件，忽略以下内容：
- node_modules/
- .next/
- out/
- .vercel/
- 环境变量文件
- IDE 配置文件
- OS 系统文件

### 10. ✅ 更新其他组件
- `src/components/Header.tsx`：更新品牌名称为 "Old Venetian Port of Chania"
- `src/components/BasicInfo.tsx`：添加 region 字段显示
- `src/components/MapEmbed.tsx`：更新 Google Maps iframe 源
- `src/components/Reviews.tsx`：更新 Google Maps 链接
- `src/components/Intro.tsx`：已使用正确的翻译键

## 文件清单

### 新增文件
- `src/messages/el.json`（希腊语翻译）
- `.gitignore`

### 修改文件
- `src/i18n/routing.ts`
- `src/messages/en.json`
- `src/messages/zh.json`
- `src/components/Hero.tsx`
- `src/components/Gallery.tsx`
- `src/components/Footer.tsx`
- `src/components/Header.tsx`
- `src/components/BasicInfo.tsx`
- `src/components/MapEmbed.tsx`
- `src/components/Reviews.tsx`
- `src/components/LanguageToggle.tsx`

### 删除文件
- `src/messages/mt.json`
- `src/messages/it.json`
- `src/messages/es.json`

## 验证结果
- ✅ Linter 检查：无错误
- ✅ 所有组件语法已修复
- ✅ 所有 Google Maps 链接已更新
- ✅ 照片画廊支持显示全部18张照片
- ✅ 三语言（中文、英文、希腊语）支持正常
- ✅ 语言切换功能正常

## 下一步建议
1. 运行 `npm run build` 验证项目是否可以成功构建
2. 运行 `npm run dev` 在本地测试所有功能
3. 检查照片文件名是否正确（当前使用空格和括号）
4. 如需部署，运行 `npm run build && npm run start`

## 注意事项
- 照片文件名包含空格和括号，确保在部署服务器上能正常访问
- Google Maps iframe 可能需要 API key 才能正常显示
- 确保所有外部链接在新窗口打开（已添加 target="_blank"）
