---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "开发笔记"
  text: "一个记录用的网站"
  tagline: 温故知新
  image:
    src: /M14.png
    alt: 背景图
  actions:
    - theme: alt
      text: About
      link: /markdown-examples
    - theme: brand
      text: 箭头一下
      link: /public/games/arrow/index

features:
  - title: 实用网站
    icon: 🧭
    details: 非常好用的一些站点合集
    link: https://665713.xyz/nav
    linkText: 导航页

  - title: 2048网页版
    details: 游玩网页小游戏
    icon: 🟨
    link: https://665713.xyz/games/2048/index.html

  - title: 🔨 施工中...
    details: Loading....

---

<style>
  :root {
  /* 标题渐变色 */
  --vp-home-hero-name-color: transparent !important;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #FF7F00, #FFA500, #FFB600) !important;

  /*图标背景渐变色 */
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #41b6e6 10%, #db3eb1 100%) !important;
  --vp-home-hero-image-filter: blur(52px) !important;
}
</style>
