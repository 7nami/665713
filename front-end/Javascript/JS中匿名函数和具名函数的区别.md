# JS中匿名函数和具名函数的区别

##### 主要区别就是他们是否有明确的标识符名称

1. 匿名函数

​		没有显示命名的函数表达式，是直接定义并立即使用，或者作为参数传给其他函数

```js
setTimeout(function(){
	console.log('123')
},1000)
```

2. 具名函数

​		有特定名字的函数声明或者函数表达式

```js
function sum(a,b){
	return a + b
}

var sum = function sum(a,b){
	return a - b
}
```

