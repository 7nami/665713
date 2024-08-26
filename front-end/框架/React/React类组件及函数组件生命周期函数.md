# 1、类组件生命周期



组件在整个从创建到销毁的过程包含三个大的阶段：挂载、更新、卸载。在每个阶段都会有各自的生命周期函数，生命周期函数就是在组件的特定时期，自动执行的函数。



[生命周期图谱速查表](React Lifecycle Methods diagram)



![Snipaste_2021-09-24_15-24-51.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/942a6db323c143fbaa5897399f608eba~tplv-k3u1fbpfcp-watermark.image?)



## 挂载



### constructor()



构造函数，在 React 组件挂载之前，会调用，一般用于



- 通过给 this.state 赋值对象来初始化内部 state

- 绑定事件



```javaScript

// 一般用法

constructor(props) {

super(props);

this.state = {data: 0};

// 如果事件是一个箭头函数，则不需要使用 bind 绑定

this.handleClick = this.handleClick.bind(this);

}

// 一般可简写为

state = {data: 0};

```



### static getDerivedStateFromProps()



在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。返回一个对象来更新 state ，如果返回 null 则不更新任何内容。



```javaScript

static getDerivedStateFromProps(props, state)

```



### render()



render 被调用时，会检查 this.props 和 this.state 的变化并返回以下类型之一。



- React 元素

- 数组或 fragments

- Portals

- 字符串或数值类型

- 布尔类型或 null



### componentDidMount()



在组件挂载后（插入 DOM 树中）立即调用。



**一般在这里做 DOM 节点的初始化、网络请求、添加订阅或者定时器，如果在这里添加订阅或者定时器，一定要在 componentWillUnmount() 里取消**



## 更新



当组件的 props 或 state 发生变化时会触发更新



### static getDerivedStateFromProps()



### shouldComponentUpdate()



```javaScript

shouldComponentUpdate(nextProps, nextState)

```



根据该函数的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响，默认行为是返回 true ，即每次 state 发生改变时组件都会重新渲染。首次渲染或使用 forceUpdate() 时不会调用该方法。



### render()



### getSnapshotBeforeUpdate()



```javaSrcipt

getSnapshotBeforeUpdate(precProps, prevState)

```



该函数在最近一次渲染输出（提交到 DOM 节点）之前调用。该函数的任何返回值将作为参数传递给 componentDidUpdate()



### componentDidUpdate()



该函数会在更新后被立即调用，首次渲染不会之执行。



可以在这里进行网络请求。



```javaScript

componentDidUpdate(prevProps, prevState, snapshot)



componentDidUpdate(prevProps) {

if (this.props.user !== prevProps.user) {

this.fetch(this.props.user);

}

}

```



## 卸载



### componentWillUnmount()



该函数会在组件卸载及销毁之前直接调用，在此函数中进行必要的清理操作。



# 函数组件生命周期



## useState()



用于初始化 state



```javaScript
const [count, setCount] = useState(0)
```



## useEffect()



用于执行副作用操作



可以把 `useEffect `看作 componentDidMount 、 componentDidUpdate 、 componentWillUnmount 的组合



# 两种生命周期函数的对应



## componentDidMount()



```javaScript
// class

componentDidMount() {

this.getData();

}



// hook

useEffect(() => {

getData();

}, [])
```



## componentDidUpdate()



```javaScript
// hook

// 在 count 发生改变时，getData()会被调用

useEffect(() => {

getData();

}, [count]);
```



## componentWillUnmount()



```javaScript
// hook

// 若返回一个函数，则 React 会在执行清除操作时调用它

useEffect(() => {

getData();

return function () {

getData();

}

})
```