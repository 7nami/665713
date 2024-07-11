<!-- .vitepress/theme/Layout.vue -->
<template>
    <DefaultTheme.Layout >
    <template #doc-after>
    <div style="margin-top: 24px">
        <Giscus
          :key="page.filePath"
          repo="7nami/665713"
          repo-id="R_kgDOMOEjWg"
          category="Announcements"
          category-id="DIC_kwDOMOEjWs4Cgt2R"
          mapping="pathname"
          strict="0"
          reactions-enabled="1"
          emit-metadata="0"
          input-position="bottom"
          theme="preferred_color_scheme"
          lang="zh-CN"
          loading="lazy"
          crossorigin="anonymous"
        />
    </div>

    </template>
</DefaultTheme.Layout >
  </template>
  
  <script setup>
  import Giscus from '@giscus/vue'
  import { useData , inBrowser } from 'vitepress'
  import DefaultTheme from 'vitepress/theme'
  import { nextTick, provide,watch } from 'vue'
  
  const { isDark,page } = useData()
  
  const enableTransitions = () =>
    'startViewTransition' in document &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  
  provide('toggle-appearance', async (event) => {
    const { clientX: x, clientY: y } = event
  
    if (!enableTransitions()) {
      isDark.value = !isDark.value
      return
    }
  
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
      )}px at ${x}px ${y}px)`
    ]
  
    await document.startViewTransition(async () => {
      isDark.value = !isDark.value
      await nextTick()
    }).ready
  
    document.documentElement.animate(
      { clipPath: isDark.value ? clipPath.reverse() : clipPath },
      {
        duration: 300,
        easing: 'ease-in',
        pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
      }
    )
  })


  // 监听 isDark 的变化并通知 Giscus 组件
watch(isDark, (dark) => {
  if (!inBrowser) return;

  const iframe = document
    .querySelector("giscus-widget")
    ?.shadowRoot?.querySelector("iframe");

  iframe?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: dark ? "dark" : "light" } } },
    "https://giscus.app"
  );
});

console.log(page , "我是page.");

  </script>
  
  <style>
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
  }
  
  ::view-transition-old(root),
  .dark::view-transition-new(root) {
    z-index: 1;
  }
  
  ::view-transition-new(root),
  .dark::view-transition-old(root) {
    z-index: 9999;
  }
  
  .VPSwitchAppearance {
    width: 22px !important;
  }
  
  .VPSwitchAppearance .check {
    transform: none !important;
  }
  </style>
  