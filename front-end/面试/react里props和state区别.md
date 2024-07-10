## **1.props和state区别:**

- props和state都是用来存储数据的
  - props存储的是父组件传递归来的数据
  - state存储的是自己的数据
  - props只读的
  - state可读可写
     [https://zh-hans.reactjs.org/docs/components-and-props.html](https://links.jianshu.com/go?to=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Fcomponents-and-props.html)
     [https://zh-hans.reactjs.org/docs/state-and-lifecycle.html](https://links.jianshu.com/go?to=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Fstate-and-lifecycle.html)

## **setState方法**

####  1.setState是同步的还是异步的?

 默认情况下setState是异步的

####  2.为什么setState是异步的?

 主要是为了优化性能

####  3.如何拿到更新之后的数据?

 setState方法其实可以接收两个参数, 通过setState方法的第二个参数, 通过回调函数拿到

####  4.setState一定是异步的吗?

 不一定: 在定时器中, 在原生事件中

```jsx
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            age: 20, // 张三通过setState修改了age
            name: 'sjl', // 李四通过setState修改name
            gender: 'female' // 王五通过setState修改gender
        }
    }
    render(){
        console.log('渲染界面');
        return (
            <div>
                <p>{this.state.age}</p>
                {/*
                <button onClick={()=>{this.btnClick()}}>按钮</button>
                */}
                <button id={'btn'}>按钮</button>
            </div>
        )
    }
    componentDidMount() {
        const oBtn = document.getElementById('btn');
        oBtn.onclick = () => {
            this.setState({
                age: 666
            });
            console.log(this.state.age); // 666
        }
    }
 btnClick(){
 setTimeout(()=>{
            this.setState({
                age: 666
            });
            console.log(this.state.age); // 666
        }, 0);
    }
}
class App extends React.Component{
    render(){
        return (
            <div>
                <Home/>
            </div>
        )
    }
}
export default App;
```

## **setState方法深入**

####  1.setState是同步的还是异步的?

 默认情况下setState是异步的



```javascript
constructor(props){
        super(props);
        this.state = {
            age: 18,
        }
    }
this.setState({
            age: 111
        }, ()=>{
            console.log('回到函数中', this.state.age);
        });
        this.setState({
            age: 222
        });
        this.setState({
            age: 333
        });
        console.log(this.state.age); // 18
```

1. #### 为什么setState是异步的?
    
    主要是为了优化性能，防止多次渲染
2. #### 如何拿到更新之后的数据?
    
    setState方法其实可以接收两个参数，通过setState方法的第二个参数, 通过回调函数拿到



```tsx
        this.setState({
            age: 111
        }, ()=>{
            console.log('回到函数中', this.state.age);//111
        });
        console.log(this.state.age); // 18
```

1. setState一定是异步的吗? =>不一定: 在定时器中, 在原生事件中



```jsx
        setTimeout(()=>{
            this.setState({
                age: 666
            });
            console.log(this.state.age); // 666
        }, 0);
```

1.setState是如何给state赋值的? 通过Object.assign()



```jsx
        let oldObj = {name:'lnj', age:18};
        let newObj = {age: 666};
        let obj = Object.assign({}, oldObj, newObj);
        console.log(obj);
// {name:'lnj', age:666}
```



```javascript
render(){
        return (
            <div>
                <p>{this.state.name}</p>
                <p>{this.state.age}</p>
                <button onClick={()=>{this.btnClick()}}>按钮</button>
            </div>
        )
    }
    btnClick(){
        this.setState({
            age: 666
        });
    }
}
```

#### **State合并现象?**

 因为setState会收集一段时间内所有的修改再更新界面,所以就出现了State合并现象



```kotlin
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            age: 0
        };
    }
    render(){
        return (
            <div>
                <p>{this.state.age}</p>
                <button onClick={()=>{this.btnClick()}}>按钮</button>
            </div>
        )
    }
    btnClick(){
/*
1.为什么最终的一个值是1, 不是3
因为setState默认是一个异步的方法, 默认会收集一段时间内所有的更新, 然后再统一更新,所以就导致了最终的一个值是1, 不是3
* */
        this.setState({
            age: this.state.age + 1
        });
        this.setState({
            age: this.state.age + 1
        });
        this.setState({
            age: this.state.age + 1
        });
        // console.log(this.state.age); // 0
    }
}
```

因为setState默认是一个异步的方法, 默认会收集一段时间内所有的更新, 然后再统一更新,所以就导致了最终的一个值是1, 不是3
 其原理如下：



```csharp
let oldObj = {age: 0};
let stateList = [
   {age: oldObj.age + 1},
   {age: oldObj.age + 1},
   {age: oldObj.age + 1},
  {age: 0 + 1},
    // {age: 0 + 1},
    // {age: 0 + 1},
    //{age: 1},
    //{age: 1},
   // {age: 1}
];
```

#### setstate方法是异步的，this.oldObject.age由于是统一收集处理故都为0,0+1=1

**如何解决setState合并现象**
 1.傻办法——回调函数无限嵌套



```kotlin
  this.setState({
            age: this.state.age + 1
        }, ()=>{
            this.setState({
                age: this.state.age + 1
            }, ()=>{
                this.setState({
                    age: this.state.age + 1
                });
            });
        });
```

2.新变量保存数据



```jsx
//preState是上次返回的state
this.setState((preState, props)=>{
            return {age: preState.age + 1}
        })
        this.setState((preState, props)=>{
            return {age: preState.age + 1}
        })
        this.setState((preState, props)=>{
            return {age: preState.age + 1}
        })
    }
```

**实现原理**



```tsx
let oldObj = {age: 0};
let stateList = [
    (preState)=>{return {age: preState.age + 1}},
    (preState)=>{return {age: preState.age + 1}},
    (preState)=>{return {age: preState.age + 1}},
];
stateList.forEach((fn)=>{
    // {age: 1}
    // {agg: 2}
    // {agg: 3}
    let newObj =  fn(oldObj);
    // {age: 0} {age: 1} / {age: 1}
    // {age: 1} {age: 2} / {age: 2}
    // {age: 2} {age: 3} / {age: 3}
    oldObj = Object.assign({}, oldObj, newObj);//这次的结果保存到下一个对象中
});
console.log(oldObj);
```

作者：YiYa_咿呀
链接：https://www.jianshu.com/p/3b8b5d23bb24