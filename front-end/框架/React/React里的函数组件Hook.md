# React里的函数组件Hook

**React 16.8** 版本之前，函数组件没有内部状态，也没有生命周期，所以更多的只是用函数组件来做展示组件。但是从 16.8 开始，React 新增了 Hook，让函数组件的功能得到了增强，有了自己的内部状态、生命周期等。



---

Hook，实际上就是 React 内部封装好的一组方法。我们通过调用这些 Hook 方法，就可以来设置函数组件内部的状态、生命周期等。

例如：

| Hook 方法     | 作用                         |
| ------------- | ---------------------------- |
| `useState()`  | 定义函数组件内部状态（数据） |
| `useEffect()` | 模拟函数组件的生命周期       |
| `useMemo()`   | 缓存数据，模拟计算属性       |
| …             |                              |

### hook 使用规则

1. 所有的 Hook 方法命名都是以 `use` 开头，以后我们自己定义的普通变量、函数等，命名要避开 `use`；
2. 所有的 Hook 方法在使用前，都必须先引入；
3. 所有的 Hook 方法都只能在函数组件中使用，不能再嵌套在其他的条件语句、循环语句中；



## 1、useState定义数据

```react
const StateComponent = () => {
    const [count] = useState(0);
    const [students] = useState([
        { id: 1, name: '张三', age: 20 },
        { id: 2, name: '李四', age: 20 },
    ])
    return (
        <div></div>
    )
}
```

`useState()` 的参数，就是初始数据。一个组件中，可以无限次的使用 `useState`。



## 2、useState使用数据

函数组件中，数据的渲染和类组件一致：

```react
const StateComponent = () => {
    const [count] = useState(0);
    const [students] = useState([
        { id: 1, name: '张三', age: 20 },
        { id: 2, name: '李四', age: 20 },
    ])
    return (
        <div>
            <h1>{count}</h1>
            <ul>
                {
                    students.map(item => <li key={item.id}>{item.name}</li>)
                }
            </ul>
        </div>
    )
}
```

## 3、useState修改数据

`useState` 的返回值中，第一个是数据，第二个是修改数据的方法，通常以 `set` 开头来命名：

```react
const StateComponent = () => {
    const [count, setCount] = useState(0);
    const [students, setStudents] = useState([
        { id: 1, name: '张三', age: 20 },
        { id: 2, name: '李四', age: 20 },
    ])
    console.log(count); // 查看初始数据，和每次修改后的数据
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => {
                setCount(count + 1);
            }}>count+1</button>
            <ul>
                {
                    students.map(item => <li key={item.id}>{item.name}</li>)
                }
            </ul>
            <button onClick={() => {
                setStudents(students.map(item => {
                    if (item.id == 2) {
                        return {
                            ...item,
                            age: 21
                        }
                    }
                    return item;
                }));
            }}>修改李四年龄</button>
        </div>
    )
}
```

语法要求：

1. 不能直接修改原数据；
2. 调用对应的 `set` 方法，传递新数据，来实现旧数据的修改；
3. `set` 方法是异步方法，因此如果想要查看修改后的数据，直接在顶层输出即可。



## 4、useMemo模拟计算属性

useMemo，可以用来缓存数据，通常当我们需要通过计算旧数据来得到一个新数据时，就可以使用 useMemo 来模拟计算属性。

```react
import React, { useMemo } from 'react'
const 变量 = useMemo(() => {
    // 计算过程
    return 值;
}, [依赖的旧数据])
```

### 示例代码:

```react
import React, { useMemo, useState } from 'react'
const ShoppingCart = () => {
    const [goodsData, setGoodsData] = useState([
        { id: 1, name: '衣服', price: 100, count: 0 },
        { id: 2, name: '裤子', price: 200, count: 50 },
        { id: 3, name: '鞋子', price: 300, count: 20 },
    ]);
    // 计算属性 totalPrice
    const totalPrice = useMemo(() => {
        return goodsData.reduce((prev, item) => {
            return item.price * item.count + prev;
        }, 0)
    }, [goodsData]);
    return (
        <div>
            <table>
                ...
            </table>
            <div>合计：{totalPrice}元</div>
        </div>
    )
}
export default ShoppingCart
```

## 5、useEffect模拟类组件的生命周期

### 一、箭头函数 + 空数组

当 useEffect 接收两个参数，第一个参数是`回调函数`，第二个参数是`空数组`时。

回调函数会在**组件首次挂载完成**执行，模拟的是类组件中的 `componentDidMount` 生命周期。

通常可以用来发送页面初始化的网络请求：

```react
useEffect(() => {
    console.log('useEffect: 在组件首次挂载完成执行');
}, []);
```

### 二、箭头函数 + 非空数组

当 useEffect 接收两个参数，第一个参数是回调函数，第二个参数是非数组时，数组中可以设置多个需要“侦听”的数据。

回调函数会在**组件首次挂载完成**时，并且**数组中任意数据发生改变**时执行。

```react
useEffect(() => {
    console.log('useEffect: 在组件首次挂载完成执行 + 数组中任意数据发生改变');
}, [数据一, 数据二]);
```

### 三、箭头函数

当 useEffect 接收一个参数，这个参数是一个回调函数。

回调函数会在**组件首次挂载完成**时，并且**组件更新时**执行，模拟的是类组件中的 `componentDidMount` + `componentDidUpdate` 生命周期。

```react
useEffect(() => {
    console.log('useEffect: 在组件首次挂载完成执行 + 组件更新');
});
```

### 四、第一个函数中返回新函数

当 useEffect 接收一个函数作为参数，同时函数中又 return 了一个新函数。

return 的这个新函数，会在组件卸载完成前执行，模拟的是类组件中的 `componentWillUnmount` 生命周期。

```react
useEffect(() => {
    return () => {
        console.log('返回的新函数：在组件卸载完成前执行')
    }
}, []);
```

