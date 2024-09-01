# 为什么Vue3 中应该使用 Ref 而不是 Reactive

### **为什么推荐使用ref而不是reactive**

`reactive`在使用过程中存在一些局限性，如果不额外注意这些问题，可能会给开发带来一些不便。与此不同，`ref`更像是Vue2时代的`option API`中的`data`的替代品，可以存放任何数据类型，而`reactive`声明的数据类型则仅限于对象。

总体来说，非必要的情况下最好避免使用`reactive`。官方文档也强烈推荐使用`ref()`作为声明响应式状态的主要API。以下是详细原因：

1. **局限性问题：** `reactive`本身存在一些局限性，可能会在开发过程中引发一些问题。这需要额外的注意力和处理，否则可能对开发造成麻烦。
2. **数据类型限制：** `reactive`声明的数据类型仅限于对象，而`ref`则更加灵活，可以容纳任何数据类型。这使得`ref`更适合一般的响应式状态的声明。
3. **官方推荐：** 官方文档强烈建议使用`ref()`作为声明响应式状态的首选。这是因为`ref`更简单、更直观，同时避免了`reactive`可能引发的一些问题。

总的来说：除非有特定的需求需要使用`reactive`，否则在大多数情况下更推荐使用`ref()`。

#### **最懂Vue的人都这么说了:推荐ref!!!!!!**

<img src="https://developer.qcloudimg.com/http-save/yehe-5471653/de123e5a9c3fa7a35311dfe6c72c21ad.png" style="zoom:67%;" />

### **`reactive`和 `ref` 对比**

| reactive                                 | ref                                                          |
| :--------------------------------------- | :----------------------------------------------------------- |
| ❌ 只支持对象和数组（引用数据类型）       | ✅ 支持基本数据类型 + 引用数据类型                            |
| ✅ 在 <script> 和 <template> 中无差别使用 | ❌ 在 <script> 和 <template> 使用方式不同（在 <script> 中要使用 .value） |
| ❌ 重新分配一个新对象会丢失响应性         | ✅ 重新分配一个新对象不会失去响应                             |
| 能直接访问属性                           | 需要使用 .value 访问属性                                     |
| ❌ 将对象传入函数时，失去响应             | ✅ 传入函数时，不会失去响应                                   |
| ❌ 解构时会丢失响应性，需使用 toRefs      | ❌ 解构对象时会丢失响应性，需使用 toRefs                      |

即：

- `ref` 用于将基本类型的数据和引用数据类型（对象）转换为响应式数据，通过 `.value` 访问和修改。
- `reactive` 用于将对象转换为响应式数据，可以直接访问和修改属性，适用于复杂的嵌套对象和数组。

## **01: `reactive` 有限的值类型**

#### **`reactive` 只能声明引用数据类型（对象）**

```js
let obj = reactive({
  name: '小明',
  age: 18
})
```

#### **`ref` 既能声明基本数据类型，也能声明对象和数组**

Vue 提供了 `ref()` 方法，允许我们创建可以使用**任何值类型**的响应式 `ref`。

```js
// 对象
const state = ref({})
// 数组
const state2 = ref([])
```

使用 `ref`，你可以灵活地声明基本数据类型、对象或数组，而不受像 `reactive` 那样只能处理引用数据类型的限制。这为开发提供了更大的灵活性，尤其是在处理不同类型的数据时。

## **02: `reactive` 使用不当会失去响应**

使用 `reactive` 时，如果不当使用，可能导致响应性失效，带来一些困扰。这可能让开发者在愉快编码的同时，突然发现某些操作失去了响应性，不明所以。因此，建议在不了解 `reactive` 失去响应的情况下慎用，而更推荐使用 `ref`。

### **1. 赋值给 `reactive` 一个整个对象或 `reactive` 对象**

##### **赋值一个普通对象**

```js
let state = reactive({ count: 0 })
// 这个赋值将导致 state 失去响应
state = { count: 1 }
```

##### **赋值一个 `reactive` 对象**

```vue
<template>
  {{ state }}
</template>    

<script setup>
const state = reactive({ count: 0 })
// 在 nextTick 异步方法中修改 state 的值
nextTick(() => {
  // 并不会触发修改 DOM ，说明失去响应了
  state = reactive({ count: 11 });
});
</script>
```

在 `nextTick` 中给 `state` 赋值一个 `reactive` 的响应式对象，但是 DOM 并没有更新。

**解决方法1：**

1. 不要直接整个对象替换，一个个属性赋值

```js
let state = reactive({ count: 0 })
// state = { count: 1 }
state.count = 1
```

2. 使用 `Object.assign`

```js
let state = reactive({ count: 0 })
// state = { count: 1 }，state 不会失去响应
state = Object.assign(state, { count: 1 })
```

3. 使用`ref`定义对象

```js
let state = ref({ count: 0 })
state.value = { count: 1 }
```





### **2.将 `reactive` 对象的属性赋值给变量（断开连接/深拷贝）**

这种操作类似于深拷贝，不再共享同一内存地址，而是只是字面量的赋值，对该变量的赋值不会影响原来对象的属性值。

```js
let state = reactive({ count: 0 })
// 赋值给 n，n 和 state.count 不再共享响应性连接
let n = state.count
// 不影响原始的 state
n++
console.log(state.count) // 0
```

**解决方法3：**

- 避免将`reactive`对象的属性赋值给变量



### 3.直接`reactive`对象解构时

直接结构会失去响应

```js
let state = reactive({ count: 0 })
// 普通解构，count 和 state.count 失去了响应性连接
let { count } = state
count++ // state.count 值依旧是 0
```

**解决方案：**

使用 `toRefs` 解构，解构后的属性是 `ref` 的响应式变量。

```js
const state = reactive({ count: 0 })
// 使用 toRefs 解构，后的属性为 ref 的响应式变量
let { count } = toRefs(state)
count.value++ // state.count 值改变为 1
```

---

### **建议：`ref` 一把梭**

推荐使用 `ref`，总结原因如下：

`reactive` 有限的值类型：只能声明引用数据类型（对象/数组）。

`reactive` 在一些情况下会失去响应，这可能导致数据回显失去响应（数据改了，DOM 没更新）。

```vue
<template>
  {{ state.a }}
  {{ state.b }}
  {{ state.c }}
</template>

<script>
let state = reactive({ a: 1, b: 2, c: 3 })
onMounted(() => {
  // 通过 AJAX 请求获取的数据，回显到 reactive，如果处理不好将导致变量失去响应
  // 回显失败，给响应式数据赋值一个普通对象
  state = { a: 11, b: 22, c: 333 }
  // 回显成功，一个个属性赋值
  state.a = 11
  state.b = 22
  state.c = 33
})
</script>
```

上面这个例子如果是使用 `ref` 进行声明，直接赋值即可，不需要将属性拆分一个个赋值。

使用 `ref` 替代 `reactive`：

```vue
<template>
  {{ state.a }}
  {{ state.b }}
  {{ state.c }}
</template>

<script>
let state = ref({ a: 1, b: 2, c: 3 })
onMounted(() => {
  // 回显成功
  state.value = { a: 11, b: 22, c: 333 }
})
</script>
```

- 给响应式对象的字面量赋一整个普通对象或 `reactive` 对象将导致 `reactive` 声明的响应式数据失去响应。





`ref` 适用范围更广，可声明基本数据类型和引用数据类型。

虽然使用 `ref` 声明的变量在读取和修改时都需要加 `.value` 小尾巴，但正因为有这个小尾巴，我们在 review 代码的时候就很清楚知道这是一个 `ref` 声明的响应式数据。



###### **`ref` 的 `.value` 好麻烦！**

`ref` 声明的响应式变量携带迷人的 `.value` 小尾巴，让我们一眼就能确定它是一个响应式变量。虽然使用 `ref` 声明的变量在读取和修改时都需要加 `.value` 小尾巴，但是正因为有这个小尾巴，我们在 review 代码的时候就很清楚知道这是一个 `ref` 声明的响应式数据。

可能有些人不喜欢这个迷人小尾巴，如果我能自动补全，阁下又如何应对？



#### **Volar 插件能自动补全 `.value`（强烈推荐！！！！！）**

推荐 `ref` 一把梭，但是 `ref` 又得到处 `.value`，那就交给插件来完成吧！

- `Volar` 自动补全 `.value`（不是默认开启，需要手动开启）



> `reactive` 重新赋值丢失响应是因为引用地址变了，被 `proxy` 代理的对象已经不是原来的那个，所以丢失响应了。其实 `ref` 也是一样的，当把 `.value` 那一层替换成另外一个有着 `.value` 的对象也会丢失响应。`ref` 定义的属性等价于 `reactive({ value: xxx })`。 另外，说使用 `Object.assign` 为什么可以更新模板： `Object.assign` 解释是这样的：如果目标对象与源对象具有相同的键（属性名），则目标对象中的属性将被源对象中的属性覆盖，后面的源对象的属性将类似地覆盖前面的源对象的同名属性。 那个解决方法里不用重新赋值，直接 `Object.assign(state, { count: 1 })` 即可，所以只要 `proxy` 代理的引用地址没变，就会一直存在响应性.