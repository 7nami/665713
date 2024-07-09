# 把一个函数作为参数传递给另一个函数时，那个函数就叫做“回调函数”

---

```js
 function doSomething(callback) {

 // 做一些事情

//  ...

 // 然后执行回调函数

 console.log("我是任务");

 callback();

}

doSomething(function() {

 console.log("任务完成!");

}); 
```



---



<img src="./回调函数、Promise，async&await.assets/image-20231031110523278.png" alt="image-20231031110523278" style="zoom:67%;" />

<img src="./回调函数、Promise，async&await.assets/image-20231031110620673.png" alt="image-20231031110620673" style="zoom:67%;" />



foo就是回调函数(callback)

<img src="./回调函数、Promise，async&await.assets/image-20231031112629878.png" alt="image-20231031112629878" style="zoom:67%;" />



Promise：

![image-20231031142818895](./回调函数、Promise，async&await.assets/image-20231031142818895.png)