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
  - title: 🧗 努力
    details: 如果做一件事就努力把它做好
  - title: 🤔 思考
    details: 学会思考，不要人云亦云
---

<style>
  :root {
  /* 标题渐变色 */
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #FFA500, #FFE211);

  /*图标背景渐变色 */
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #41b6e6 50%, #db3eb1 50%);
  --vp-home-hero-image-filter: blur(55px);
}
</style>