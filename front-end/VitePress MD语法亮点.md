# VitePress MD语法亮点

## Markdown 扩展示例

此页面演示了一些 VitePress 提供的内置 Markdown 扩展。

## 语法高亮

VitePress 提供了由 [Shiki](https://github.com/shikijs/shiki) 驱动的语法高亮功能，并具有行高亮等附加功能：

**输入**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
````

**输出**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## 自定义容器

**输入**

```md
::: info
这是一个信息框。
:::

::: tip
这是一个提示。
:::

::: warning
这是一个警告。
:::

::: danger
这是一个危险警告。
:::

::: details
这是一个详细信息块。
:::
```

**输出**

::: info
这是一个信息框。
:::

::: tip
这是一个提示。
:::

::: warning
这是一个警告。
:::

::: danger
这是一个危险警告。
:::

::: details
这是一个详细信息块。
:::

## 更多

查看文档以获取 [完整的 Markdown 扩展列表](https://vitepress.dev/guide/markdown)。