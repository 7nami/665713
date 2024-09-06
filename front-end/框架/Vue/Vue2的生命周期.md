# Vue2的生命周期

- beforeCreate（创建前）：在实例初始化之后，数据观测和事件配置之前被调用，此时组件实例还没有被创建出来，无法访问到 data、computed、watch 等数据。
- created（创建后）：在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测(data observer)、属性和方法的运算、watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
- beforeMount（挂载前）：在挂载开始之前被调用，即在 render 方法之前被调用。此时的组件已经完成了数据处理，但尚未开始渲染 DOM。
- mounted（挂载后）：在实例挂载后调用，这时候 DOM 已经渲染完成，可以执行一些操作，如调用原生 DOM API，setTimeout 或者 setInterval 等。
- beforeUpdate（更新前）：在数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。可以在这个钩子中进一步地更改状态，不过这样也很容易导致无限循环的更新。
- updated（更新后）：在由于数据更改导致的虚拟 DOM 重新渲染和打补丁之后调用。调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
- beforeDestroy（销毁前）：在实例销毁之前调用。这里可以进行一些清理工作，比如清除定时器，取消网络请求等等。
- destroyed（销毁后）：在实例销毁之后调用。这个时候，所有的事件监听器都已经被移除，所有的子实例也已经被销毁。



##### PS.Vue组件首次加载时会加载哪些生命周期函数？

1. beforeCreate 组件创建前 （没有dom）
2. created 组件创建完成 （没有dom）
3. beforeMount 组件挂载前 （准备dom）
4. mounted 组件挂载完成 （准备dom）



##### 父组件引入子组件，那么生命周期执行的顺序是？

> 父：beforeCreate、created、beforeMount
>
> 子：beforeCreate、created、beforeMount、mounted
>
> ...
>
> 父：mounted

##### 发送请求在created还是mounted？

> 这个问题具体看业务和项目的情况，因为组件的加载顺序是，父组件引入子组件，那么先执行父的前三个生命周期，再执行子的前四个生命周期，如果我们的业务是父组件引入子组件并且优先加载子组件的数据，那么在父组件中当前的请求要放在monted中。如果，当前组件没有父子依赖关系，那么放在哪个生命周期请求都是可以的

##### 在created中如何获取dom

> 1. 只要写异步代码，获取dom是在异步中获取的就可以了，例如：setTimeout、请求、Promise.xxx()等等
> 2. 使用Vue内置的this.$nextTick

##### beforeCreate和created有什么区别？

> beforeCreate没有$data
>
> created中有$data
>
> created可以拿到methods的方法
>
> beforeCreate拿不到methods的方法

##### 为什么发送请求不在beforeCreate里？

> 因为：如果请求是在methods里封装好了，在beforeCreate调用时，`beforeCreate` 中实例的方法和数据还没有被初始化（会报错）。

在`created`和`mounted`去请求数据有什么区别？

`created`：在渲染前调用，通常先初始化属性，然后做渲染

`mounted`:在模板渲染完成后，一般是初始化页面后，再对元素节点进行操作，在这里请求数据可能出现闪屏，`created`里就不会

一般用created比较多，请求的数据对DOM有影响用`created`

如果请求的数据对DOM无关那么可以放在`mounted`
