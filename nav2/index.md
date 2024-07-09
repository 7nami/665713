---
layout: doc
layoutClass: m-nav-layout
sidebar: false
prev: false
next: false
outline: [2, 3, 4]
---

<style src="/.vitepress/theme/style/nav.scss"></style>

<script setup>
import { NAV_DATA2 } from '/.vitepress/theme/untils/data2.js'; // 修改为新的数据文件路径
</script>

# 里导航

<MNavLinks v-for="{ title, items } in NAV_DATA2" :title="title" :items="items" />
