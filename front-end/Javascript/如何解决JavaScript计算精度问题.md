# 如何解决JavaScript计算精度问题

###### JavaScript 中的数字按照 IEEE 754 的标准，使用 64 位双精度浮点型来表示。其中符号位 S，指数位 E，尾数位M分别占了 1，11，52 位，并且在 [ES5 规范](https://es5.github.io/#x8.5) 中指出了指数位E的取值范围是 **[-1074, 971]**。



总结：

- 使用 `toFixed()` 方法格式化结果。

- 将浮点数转换为整数后再运算。

- 使用第三方库如`big.js` ,`bignumber.js`, `decimal.js` 进行高精度计算。

- 使用 `Number.EPSILON` 判断浮点数相等。

- 使用 `Math.round` 等方法进行四舍五入处理。