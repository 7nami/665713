JavaScript 语言内置了一些全局构造函数，它们可以用来创建特定类型的对象或进行特定的操作。下面列出了一些常用的内置构造函数：

### 基础数据类型的构造函数

1. **`Object`**: 用于创建新的对象。
2. **`Array`**: 用于创建新的数组。
3. **`String`**: 用于创建新的字符串对象。
4. **`Number`**: 用于创建新的数字对象。
5. **`Boolean`**: 用于创建新的布尔对象。

### 错误对象的构造函数

1. **`Error`**: 用于创建一个错误对象。
2. **`TypeError`**: 用于创建一个类型错误对象。
3. **`SyntaxError`**: 用于创建一个语法错误对象。
4. **`ReferenceError`**: 用于创建一个引用错误对象。
5. **`RangeError`**: 用于创建一个范围错误对象。

### 其他常用构造函数

1. **`Date`**: 用于创建日期和时间对象。
2. **`RegExp`**: 用于创建正则表达式对象。
3. **`Function`**: 用于创建新的函数对象。
4. **`Map`**: 用于创建键值对集合。
5. **`Set`**: 用于创建一个集合。
6. **`Promise`**: 用于创建一个新的 Promise 对象。
7. **`Symbol`**: 用于创建一个新的 Symbol 类型。
8. **`BigInt`**: 用于创建一个新的大整数。

这些构造函数通常与 `new` 操作符一起使用，例如 `new Object()` 或 `new Array()`，但一些也可以不使用 `new` 操作符。

记住，尽管这些构造函数看起来像是类（类是从 ES6 开始添加到 JavaScript 的），但在 ES6 之前，JavaScript 是基于原型的，而不是基于类的。











更准确的说法是：

- 基础数据类型的构造函数： `Object`, `Array`, `String`, `Number`, `Boolean`.
- 错误对象的构造函数： `Error`, `TypeError`, `SyntaxError`, `ReferenceError`, `RangeError`.
- 其他常用的构造函数： `Date`, `RegExp`, `Function`, `Promise`, `Symbol`, `BigInt`.
- 从 ES6 开始引入的构造函数： `Map`, `Set`.