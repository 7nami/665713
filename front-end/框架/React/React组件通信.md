# React组件通信

## 一、父传子：props

### 1、父组件传值

```react
const FatherComponent = () => {
    return (
        <ChildA name="张三" age={20} />
    )
}
```

传值时，除了传递静态的字符串（例如上面的”张三”），其他数据在传递时都通过 `{}` 来传值

### 2、子组件接收值

```react
const ChildA = (props) => {
    console.log(props);
    const { name } = props;
    return (
        <div>
            <h3>{name}</h3>
            <h3>{props.age}</h3>
        </div>
    )
}
```

### 3、设置props的默认值

```react
const ChildA = (props) => {
    // 方式一：通过 ES6 的解构赋值来设置默认值
    const { name = '李四' } = props;
    return (
        <div>
            <h3>{name}</h3>
            <h3>{props.age}</h3>
        </div>
    )
}
// 方式二：React 官方方式
ChildA.defaultProps = {
    age: 18
}
```

### 4、props的验证

```react
import pt from 'prop-types'
const ChildA = (props) => {
    const { name = '李四' } = props;
    return (
        <div>
            <h3>{name}</h3>
            <h3>{props.age}</h3>
        </div>
    )
}
// 设置 props 的验证
ChildA.propTypes = {
    name: pt.string,
    age: pt.oneOfType([pt.number, pt.string])
}
export default ChildA
```

常用的验证规则：

- 字符串：`pt.string`
- 数字：`pt.number`
- 布尔值：`pt.bool`
- 数组：`pt.array`
- 对象：`pt.object`
- 函数：`pt.func`
- 多个中的任意一个：`pt.oneOfType([pt.number, pt.string])`

### 5、props 只读

props 中的数据，都只能使用，不能修改！！！



## 二、子传父：回调函数

父组件先传递一个函数给子组件，子组件中调用父组件的方法，同时传值给父组件。

### 1、父组件传递回调函数

```react
const FatherComponent = () => {
    const getChildData = (data) => {
        console.log('接收子组件传递的参数', data);
    }
    return (
        <div>
            <ChildA name="张三" age={20} getChildData={getChildData} />
        </div>
    )
}
```

### 2、子组件调用回调函数并传值

```react
const ChildA = (props) => {
    return (
        <div>
            <button onClick={() => {
                // 子组件调用父组件的方法，并将值传递给父组件
                props.getChildData('你好');
            }}>传值给父组件</button>
        </div>
    )
}
```



## 三、嵌套组件传值：context

### 1、创建 context 对象

我们在组件外部创建一个 `context.js` 文件：

```react
import { createContext } from "react";
export default createContext(null);
```

### 2、顶层组件传值

```react
import Context from './context.js'
const FatherComponent = () => {
    return (
        <Context.Provider value={{ count: 10 }}>
            <ChildA name="张三" age={20} getChildData={getChildData} />
            <ChildB />
        </Context.Provider>
    )
}
```

语法说明：

1. 顶层组件通过 `<Context.Provider>` 的 `value` 属性来传递公共数据；
2. 只要被 `<Context.Provider>` 包裹的组件，其内部子子孙孙组件都可以获取到 `value` 中的公共数据；

### 3、内部组件接收值

```react
import React, { useContext } from 'react'
import Context from './context'
const Grandson = () => {
    const value = useContext(Context);
    console.log(value);  // { count: 10 }
    return (
        <div>Grandson</div>
    )
}
```

