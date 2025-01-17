在 JavaScript 中，可以通过多种方式定义一个函数，主要包括以下几种：

------

### 1. **函数声明（Function Declaration）**

使用 `function` 关键字定义一个命名函数。

```javascript
function sayHello() {
    console.log("Hello!");
}
```

**特点：**

- 函数声明有函数名。
- 具备**函数声明提升**，可以在定义之前调用。

------

### 2. **函数表达式（Function Expression）**

将一个匿名函数赋值给变量。

```javascript
const sayHello = function() {
    console.log("Hello!");
};
```

**特点：**

- 函数表达式没有函数声明提升，必须先定义再调用。
- 函数可以是匿名的，也可以命名。

```javascript
const sayHello = function greet() {
    console.log("Hello!");
};
```

------

### 3. **箭头函数（Arrow Function）**

一种简洁的函数定义方式，常用于函数表达式。

```javascript
const sayHello = () => {
    console.log("Hello!");
};
```

**特点：**

- 语法更简洁。
- 如果函数只有一个表达式，可以省略大括号 `{}` 和 `return`。
- 没有自己的 `this` 和 `arguments`，会从外层作用域继承。

```javascript
const double = x => x * 2; // 省略大括号和 return
```

------

### 4. **方法定义（Method Definition）**

在对象或类中定义方法的一种简洁语法。

```javascript
const obj = {
    sayHello() {
        console.log("Hello!");
    }
};
class MyClass {
    sayHello() {
        console.log("Hello!");
    }
}
```

**特点：**

- 是对象或类的一部分，通常作为方法被调用。
- 不使用 `function` 关键字。

------

### 5. **构造函数（Constructor Function）**

通过构造函数创建对象。

```javascript
function Person(name) {
    this.name = name;
}

const person1 = new Person("John");
```

**特点：**

- 函数名通常首字母大写。
- 使用 `new` 关键字调用，会返回一个新对象。

------

### 6. **生成器函数（Generator Function）**

使用 `function*` 定义的特殊函数，可在执行过程中暂停和恢复。

```javascript
function* generateNumbers() {
    yield 1;
    yield 2;
    yield 3;
}
```

**特点：**

- 使用 `function*` 定义。
- 返回一个生成器对象，通过调用 `next()` 获取值。
- 适用于需要延迟执行的场景。

------

### 7. **立即执行函数表达式（IIFE）**

定义后立即执行的函数。

```javascript
(function() {
    console.log("Hello!");
})();
```

**特点：**

- 通常用于初始化操作，避免污染全局作用域。
- 需要使用括号包裹函数，然后调用。

------

### 8. **回调函数（Callback Function）**

一种作为参数传递的函数。

```javascript
function fetchData(callback) {
    setTimeout(() => {
        callback("Data fetched!");
    }, 1000);
}

fetchData(message => {
    console.log(message);
});
```

**特点：**

- 不同于定义方式，回调函数强调的是调用场景。

------

### 总结表

| 定义方式           | 特点                                               |
| ------------------ | -------------------------------------------------- |
| 函数声明           | 有函数声明提升，可在定义前调用。                   |
| 函数表达式         | 没有提升，赋值后才能调用。                         |
| 箭头函数           | 语法简洁，继承外部作用域的 `this` 和 `arguments`。 |
| 方法定义           | 对象或类中的简洁语法，适合定义方法。               |
| 构造函数           | 用于创建对象，结合 `new` 使用。                    |
| 生成器函数         | 可暂停执行，使用 `yield`。                         |
| 立即执行函数表达式 | 立即运行，避免污染全局作用域。                     |

