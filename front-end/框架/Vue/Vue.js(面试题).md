# Vue.js 面试题

## 1、Vue 中可以实现数据渲染的方式有哪几种？区别是什么？

1. {{}}
   - 渲染新数据时，**不会**将标签内的旧数据覆盖掉；
   - 渲染数据时，**无法解析**数据中的 HTML 标签，会将字符串中的 HTML 标签当作普通文本进行渲染；
2. `v-text`
   - 渲染新数据时，**会**将标签内的旧数据覆盖掉；
   - 渲染数据时，**无法解析**数据中的 HTML 标签，会将字符串中的 HTML 标签当作普通文本进行渲染；
3. `v-html`
   - 渲染新数据时，**会**将标签内的旧数据覆盖掉；
   - 渲染数据时，**可以解析**数据中的 HTML 标签；

## 2、描述 v-if 和 v-show 的相同点和不同点，以及各自的应用场景。

相同点：v-if 和 v-show 都可以用来控制元素节点在页面中的显示和隐藏。

不同点：

1. `v-if`：用来控制元素节点在节点树中的添加和删除；当 `v-if` 的初始值为 false 时，节点不会添加渲染到页面中；
2. `v-show`：用来控制元素节点在页面中的显示和隐藏；当 `v-show`的初始值为 false 时，节点会先渲染到页面中，然后在节点上添加 `display: none` 的 CSS 样式，来实现元素的隐藏；

应用场景：

1. `v-if` 初始渲染的性能消耗小，因此如果**不需要频繁**的进行“显示/隐藏”切换，建议使用 `v-if`；
2. `v-show` 频繁切换性能消耗小，因此如果**需要频繁**的进行“显示/隐藏”切换，建议使用 `v-show`；

## 3、computed 和 methods 的区别。

问题分析：

在代码语法上，computed 和 methods 都是函数的形式，都可以在函数中经过一些计算来得到一个新的数据，并将该数据作为当前函数的返回值。

参考答案：

1. computed：
   - 本质上是一个属性（对象），使用时不需要小括号调用；
   - 有缓存，当第一次计算出结果后，后续反复使用时不会再重新计算（但是内部依赖的数据发生改变后，会重新计算）；
2. methods：
   - 每一个 methods 都是一个方法，使用时需要通过小括号调用；
   - 没有缓存，每使用一次都会执行一次该方法；

## 4、computed 和 watch 的区别。

问题分析：

computed 和 watch 相似的地方在于，都可以用来检测一些数据的变化，在数据变化时执行相应的方法。

参考答案：

1. computed：
   - 不能指定要检测的数据，只能自动检测内部使用的数据的变化；
   - 计算属性的方法内部，必须返回一个计算结果（数据）；
   - **计算属性方法内部，不支持异步；**
2. watch：
   - 需要指定要侦听的数据；
   - 侦听器的方法内部，没有固定的语法要求；
   - **侦听器方法内部，支持异步；**

## 5、Vue 响应式系统中无法检测到数据的哪些变化？解决方案是什么？

问题分析：

组件 data 中的数据会自动加入到响应式系统中，从普通数据变成响应式数据。

响应式数据的特点是：当数据发生改变时，Vue 内部会自动检测到数据的变化，同时更新对应的节点。

因此，如果有一些响应式数据的变化，Vue 检测不到，出现的问题就是：数据发生了改变，但是页面的节点不会更新。

参考答案：

Vue 响应式系统检测不到以下四种数据的变化：

1. 对象属性的新增：`$set()`、赋值新对象 + 扩展运算符（扩展旧对象，保留旧属性）
2. 对象属性的删除：`$delete()`
3. 通过下标操作数组：`$set()`、`splice()`
4. 修改数组的长度：`splice()`

## 6、Vue 组件之间的传值方式。

1. 父子传值：`props/$emit()`、`$children/$parent`
2. 兄弟传值：事件总线、通过共同的父组件传值
3. 多级嵌套传值：`provide/inject`
4. 状态机传值：Vuex

## 7、什么是单向数据流。

“数据流”指的是父组件传递数据给子组件，当父组件的数据发生了改变，数据的改变会向下流动到子组件，子组件中的数据也会更新。

“单向”指的是父组件可以改变数据，来影响子组件，但是返回来则不行，**子组件不能修改 props 的数据。**

## 8、$router 和 $route 的区别。

1. `$router`：**整个应用程序**的路由**实例**对象，主要用于提供路由相关的方法，包括路由跳转、导航守卫、动态添加路由...等方法。
2. `$route`：**当前页面**的路由**信息**对象，主要用于提供用户当前访问页面的路由信息，包括路由路径、名称、参数、元信息...等数据；

