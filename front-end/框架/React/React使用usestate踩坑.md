# React使用usestate踩坑

### usestate的常规用法

在[react](https://so.csdn.net/so/search?q=react&spm=1001.2101.3001.7020)框架中，不适用类组件，使用函数式组件又想自定义数据维护业务开发的时候，就需要使用react提供的hook来完成。usestate就是最常见的一种hook。

```react
const [name,setName] = useState('dx');
setName（'dx1'）
12
```

中括号实际是一个解构运算，第一个name是设置的值，第二个setName是只能用来改变name的方法。



### useState遇到的坑

#### 1、useState不适合复杂对象的更改。

因为useState不能像setState那样进行合并更新，当使用useState第二个参数进行数据更新的时候，必须传入一个完整的结构，而不仅仅只是改变的那一部分。

如果你想让一个复杂的对象都能实现响应，可以分两种情况。
第一种情况，这个复杂的对象每次都是整体发生改变，那么也可以直接使用useState。

第二种情况，你只是想让许多的简单数据都放到一个对象里面，这样便于统一管理，那我建议，如果这些简单数据之间都没什么必然联系的话，还是分开创建多个state更好。

在编码的过程中，我们宁愿以空间复杂度换取时间复杂度，多创建几个变量和创建一个变量，在用户体验上并不会有太多的差别。

但如果数据过于复杂，diff算法找到对应的变化及发生响应，大规模的重新渲染，这一过程，将会导致用户体验下降。



#### 2、useState异步回调的问题

当使用usestate对数据进行更新，并不能立刻获取到最新的数据。

```react
  const [name, setName] = useState('dx');

  const handleTest = () => {
    console.log(name) // dx
    setName('dx1')
    console.log(name) // dx
  }

```

解决的办法。
一、配合useEffect使用

```react
  const [name, setName] = useState('dx');
  const handleTest = () => {
    console.log(name) //dx
    setName('dx1')
    console.log(name)//dx
  }
  
  useEffect(() => {
    console.log(name) //dx1
  },[name])

```

二、创建一个新的变量保存最新的数据

```react
  const [name, setName] = useState('dx');
  const handleTest = () => {
    console.log(name) //dx
    const newName = "dx1"
    setName(newName)
    console.log(newName) //dx1
  }

```

三、用一个函数包裹，不推荐使用，因为函数里面所有的东西都会全部重新定义

```react
const [name, setName] = useState('dx');
 function text () {
   const handleTest = () => {
     console.log(name) //dx
     const newName = "dx1"
     setName(newName)
     console.log(name) //dx
     console.log(newName) //dx1
   }
   useEffect(() => {
     console.log(name) //dx1
   },[name])

   return (
     <div>
       {name} //点击之前dx，点击按钮之后dx1
      <button type="button" onClick={handleTest }>改变名字</button>
     </div>
   )
 }
```