`em` 是相对于其最近的设置了 `font-size` 的父元素来设置字体大小的。如果父元素没有设置 `font-size`，那么它会一直向上查找，直到找到一个设置了 `font-size` 的祖先元素。

例如：

```html
<div style="font-size: 20px;">
  <span style="font-size: 2em;"> <!-- 这里的字体大小是 40px -->
    Hello
  </span>
</div>
```

在这个例子中，`span` 的 `font-size` 是 `2em`，这是相对于其最近的设置了 `font-size` 的父元素 `div`（`20px`）来计算的，所以它最终是 `40px`。

如果没有任何父元素设置了 `font-size`，`em` 会相对于浏览器的默认字体大小来设置，这通常是 `16px`。所以，它不一定总是以 `<body>` 的 `font-size` 为基准，除非你明确地在 `<body>` 上设置了 `font-size`。