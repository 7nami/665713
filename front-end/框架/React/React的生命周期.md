# React的生命周期

- 挂载阶段（Mounting）：组件实例被创建并插入到 DOM 中。
  - constructor()
  - static getDerivedStateFromProps()
  - render()
  - componentDidMount()
- 更新阶段（Updating）：组件的状态或者属性发生改变。
  - static getDerivedStateFromProps()
  - shouldComponentUpdate()
  - render()
  - getSnapshotBeforeUpdate()
  - componentDidUpdate()
- 卸载阶段（Unmounting）：组件从 DOM 中移除。
  - componentWillUnmount()



#### PS.有哪些react生命周期被废弃了？

- componentWillMount()：该生命周期函数在组件挂载前执行，可以在此处进行一些准备工作，如初始化状态等。
- componentWillReceiveProps(nextProps)：该生命周期函数在组件接收到新的 props 时被调用，可以在此处根据新的 props 来更新组件状态。
- componentWillUpdate(nextProps, nextState)：该生命周期函数在组件即将更新时执行，可以在此处进行一些准备工作，如获取最新的 props 和 state 等。