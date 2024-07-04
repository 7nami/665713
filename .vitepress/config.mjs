import { defineConfig } from 'vitepress'
import { set_sidebar } from "../utils/auto_sidebar.mjs";
import vitePluginMd from 'vite-plugin-md';


console.log("config.mjs 已经被加载.");
const sidebarConfig = set_sidebar("/front-end");
console.log("生成的侧边栏配置:", JSON.stringify(sidebarConfig, null, 2));

// https://vitepress.dev/reference/site-config
export default defineConfig({
    optimizeDeps: {
        include:['pdf'],
        exclude:[],
    },
    // 指定静态文件目录
    publicDir: 'public',
    // 配置静态文件路径
    server: {
        fs: {
            strict: false
        }
    },
    plugins: [
        vitePluginMd(),
    ],
    // base: "/665713/",
    head: [["link", { rel: "icon", href: "/favicon.ico" }]],
    markdown: {
        html: true
    },
    title: "665713",
    description: "A VitePress Site",
    themeConfig: {
        outlineTitle: "在这页面上",
        outline: [2, 6],
        search: {
            provider: 'local',
            options: {
                locales: {
                    zh: {
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档'
                            },
                            modal: {
                                noResultsScreen: "无法找到相关结果",
                                resetButtonTitle: "清除查询条件",
                                footer: {
                                    selectText: "选择",
                                    navigateText: "切换"
                                }
                            }
                        }
                    }
                }
            }
        },

        logo: '/machine.svg',
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '主页', link: '/' },
            { text: '项目', items: [{ text: '外语学习', link: '/language' }, { text: '学习笔记', link: '/front-end' },{ text: '异国风情', link: '/international' }] },
            { text: '查找', items: [{ text: '弹幕首页', link: '/danmaku' }, { text: '弹幕1号', link: '/danmaku/fk-wjq' }] },
            { text: '🔗PJSK贴纸自定义', link: 'https://st.3kn.jp/' },
            // { text: 'front-end里的文件', items: sidebarConfig },

        ],


        sidebar: {
            // "/front-end/": sidebarConfig,
            "/front-end": set_sidebar("/front-end"),
            "/language": set_sidebar("/language"),
            "/danmaku": set_sidebar("/danmaku"),
            "/international": set_sidebar("/international"),


            // '/': [
            //     {
            //         text: 'Examples',
            //         items: [
            //             { text: 'Markdown 示例', link: '/markdown-examples' },
            //             { text: 'Runtime API 示例', link: '/api-examples' }
            //         ]
            //     },
            //     {
            //         text: 'Examples 2',
            //         items: [
            //             { text: 'Markdown 示例2', link: '/markdown-examples' },
            //             { text: 'Runtime API 示例2', link: '/api-examples' }
            //         ]
            //     }
            // ],
        },
        // sidebar: false,
        // aside: "left", 
        socialLinks: [
            { icon: 'github', link: 'https://github.com/7nami' }
        ],
        footer: {
            copyright: 'Copyright © 2024-present MJ'
        }
    }
})
