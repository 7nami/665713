// https://vitepress.dev/guide/custom-theme

import Mycomponent from "./components/Mycomponent.vue"
import Video from "./components/Video.vue"
import Layout from './Layout.vue' // 引入新的切换特效 Layout 组件
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import vitepressBackToTop from 'vitepress-plugin-back-to-top'
import 'vitepress-plugin-back-to-top/dist/style.css'
import "./style/index.css" //修改主题色的那个css
import googleAnalytics from 'vitepress-plugin-google-analytics'


/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
/*     return h(DefaultTheme.Layout, null, { */
        return h(Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData , ctx }) {
    // ...
    app.component('Mycomponent' , Mycomponent),
    app.component('Video',Video),
    vitepressBackToTop({
        //default
        threshold:300
    }),
    googleAnalytics({
        id: 'G-YTQLR7YHF8', // Replace with your GoogleAnalytics ID, which should start with the 'G-'
      })
  }, 
}



// import Mycomponent from './components/Mycomponent.vue'
// import Video from './components/Video.vue'
// import Layout from './Layout.vue'
// import DefaultTheme from 'vitepress/theme'
// import { h } from 'vue'
// import vitepressBackToTop from 'vitepress-plugin-back-to-top'
// import './style.css'
// import './style/index.css'

// export default {
//   ...DefaultTheme,
//   Layout: () => h(Layout),
//   enhanceApp({ app }) {
//     app.component('Mycomponent', Mycomponent)
//     app.component('Video', Video)
//   },
//   setup() {
//     vitepressBackToTop({
//       threshold: 300,
//     })
//   },
// }
