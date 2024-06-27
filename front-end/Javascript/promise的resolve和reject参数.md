# Promise的resolve和reject参数

---

从代码上讲，Promise可以看做是一个容器，用于保存未来会产生的一个结果。我们可以在Promise容器以外的地方进行使用。Promise可以解决`回调地狱` ,  ` 链式调用 ` , ` 封装Ajax请求`

​    

在 JavaScript 中，Promise 是一种处理异步操作的对象。Promise 包含两个主要状态：`已完成`（**fulfilled**）和`已拒绝`（**rejected**）。当 Promise 被创建时，它处于`待定`（**pending**）状态，然后可以通过调用 resolve 函数将其状态更改为已完成，或者通过调用 reject 函数将其状态更改为已拒绝。

`resolve` 和 `reject` 函数是 Promise 构造函数中传递的两个参数。这两个参数都是函数，由 Promise 实例的使用者（Promise 的执行器函数）调用。它们各自表示 Promise 的最终状态是已完成还是已拒绝，并可以将最终值传递给与 Promise 相关的后续操作。



```javascript
const myPromise = new Promise((resolve, reject) => {

  // 异步操作

  const isOperationSuccessful = true;

  if (isOperationSuccessful) {

​    // 将 Promise 状态更改为已完成，并传递最终值

​    resolve("Operation successful");

  } else {

​    // 将 Promise 状态更改为已拒绝，并传递拒绝原因

​    reject("Operation failed");

  }

});

// 处理 Promise 的已完成状态

myPromise.then((result) => {

  console.log("Fulfilled:", result);

}).catch((reason) => {

  console.log("Rejected:", reason);

});
```

在上面的示例中，`resolve` 和 `reject` 函数都带有一个参数。这个参数通常是 Promise 的最终值或拒绝原因。在实际应用中，这个值可以是任何 JavaScript 对象，例如一个数据对象、错误对象等。

- `resolve()`：处理成功的数据
- `reject()`：处理失败的数据
- `then()`：res的参数可以接受到失败错误的信息
- `catch()`：捕获reject抛出失败错误信息，捕获代码错误信息
- `finally()`：不管结果怎么样都会执行的代码

在使用 Promise 时，通常会使用 `then` 方法来处理已完成状态，使用 `catch` 方法来处理已拒绝状态。这使得异步操作的结果能够被适当地处理，而不是通过回调函数或其他方式来处理异步代码。



Promise的状态？【面试小问】：

- 等待中 `pending`：当 new 了 一个Promise对象时，没有通过 `resolve 和 reject `处理结果，那么Promise就是一个`等待中的状态`
- 已完成`fulliled`：成功的状态，当 new 了 一个Promise对象时，通过` resolve `处理结果，那么Promise立马变成一个`已完成的状态`
- 已失败 `rejected`：失败的状态，当 new 了 一个Promise对象时，通过` reject `处理结果，那么Promise立马变成一个`已失败的状态`