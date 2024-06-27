# react里面的属性

React的三大属性是`state`、`props`、`refs`

React 中没有专门的“计算属性”概念，但是可以使用类组件中的 `get` 方法或函数组件中的 `useMemo` 钩子来模拟计算属性的行为

---





# Vue常用属性

`data `, `methods `, `computed` , `watch` , `components `, `props `,` setup`

`setup`是 Vue 3 引入的，并且强调 `setup` 用于组合式 API

---

## ref和reactive的区别（分版本）

- reactive是Vue 3中引入的新特性，用于创建响应式数据对象。它是通过reactive函数将普通JavaScript对象转换为响应式对象。响应式对象会自动追踪其属性的变化，并在变化时触发相关的更新。

- **Vue 2** 中的 `ref` 用于访问 DOM 元素或子组件实例，不是响应式的。
- **Vue 3** 中的 `ref` 用于创建响应式的数据引用，当其值改变时，会自动触发相关的更新。

---



## 在 Vue 3 中，ref 和 reactive 都是用来创建响应式数据的方法，区别在于：

- `ref` 用来创建一个包含单一值的响应式对象，其返回的是一个对象，其中的值被包装在` value `属性中。
- `reactive` 用来创建包含多个值的响应式对象，其返回的是一个响应式的`Proxy 对象`。



---

### Vue2 和 Vue3 的区别有哪些

- `响应式原理`：Vue2 采用的是 `Object.defineProperty()` 进行数据劫持，Vue3 采用的是 `Object.proxy()` 进行数据劫持；
- 新特性：Vue3 引入了`组合式 API`，而 Vue2 采用的是`选项式 API`；
- Vue2 的组件中需要设置`根节点`，Vue3 支持碎片化，`不需要根节点`；
- 生命周期函数，Vue3 取消了创建阶段的 `beforeCreate` 和 `created` 两个生命周期函数；
- Diff 算法：Vue2 采用的是`双端比较法`，Vue3 采用的是`最长递增子序列`；
- 性能：Vue3 重写了`虚拟 DOM 的实现方式`，初始渲染速度更快；新增了 `Tree shaking技术`，编译时会`自动排除未使用的代码`；源码从` Flow 改成 TypeScript `来进行编写；