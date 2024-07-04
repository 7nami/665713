// https://vitepress.dev/guide/custom-theme

import Mycomponent from "./components/Mycomponent.vue"
import Video from "./components/Video.vue"
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import vitepressBackToTop from 'vitepress-plugin-back-to-top'
import 'vitepress-plugin-back-to-top/dist/style.css'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('Mycomponent' , Mycomponent),
    app.component('Video',Video)
    vitepressBackToTop({
        //default
        threshold:300
    })
  },
}
