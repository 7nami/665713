

# **Vuex 的核心属性**

---



- `state`：存储应用级别的状态，即数据。state 是响应式的，可以在组件中使用 $store.state 来访问。
- `getters`：用于派生状态，即计算属性。相当于 Vue 组件中的计算属性。getters 也是响应式的。
- `mutations`：用于修改 state 中的数据。mutations 中的方法必须是同步的，可以通过 commit 方法来触发 mutations 中的方法。
- `actions`：用于处理异步操作和业务逻辑。actions 中的方法可以是异步的，可以通过 dispatch 方法来触发 actions 中的方法。
- `modules`：将 store 分割成模块，每个模块拥有自己的 state、getters、mutations 和 actions。