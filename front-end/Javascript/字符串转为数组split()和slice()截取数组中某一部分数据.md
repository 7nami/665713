# 字符串转为数组 - `split()`

`split()`可以根据某个字符，将字符串分割成一个数组，可以根据某个字符将字符串进行拆分，以一个数组形式返回

## 语法

~~~javascript
let 数组变量名 = 字符串.split("分割符号");
~~~

## 例子

```javascript
let str = "1-2-3-4a";
let result1 = str.split("");     // ['1', '-', '2', '-', '3', '-', '4', 'a']
let result2 = str.split();       // ['1-2-3-4a']
let result3 = str.split("-");    // ['1', '2', '3', '4a']
```

---

​            

# 截取数组中某一部分数据 - `slice()`



## 语法

```javascript
数组变量名.slice(开始下标, 结束下标【不包含】);
```

## 注意

- 如果从开始下标一直截取到数组最后一个数据时，可以只写开始下标，结束下标可以省略不写。



## 示例

---

```JavaScript
let arr = [1, 2, 3, 4, 5];
let result1 = arr.slice(2);      // [3, 4, 5]
let result2 = arr.slice(1, 3);   // [2, 3]
```

