#### promise的resolve和reject参数

​    在 JavaScript 中，Promise 是一种处理异步操作的对象。Promise 包含两个主要状态：已完成（fulfilled）和已拒绝（rejected）。当 Promise 被创建时，它处于待定（pending）状态，然后可以通过调用 resolve 函数将其状态更改为已完成，或者通过调用 reject 函数将其状态更改为已拒绝。

resolve 和 reject 函数是 Promise 构造函数中传递的两个参数。这两个参数都是函数，由 Promise 实例的使用者（Promise 的执行器函数）调用。它们各自表示 Promise 的最终状态是已完成还是已拒绝，并可以将最终值传递给与 Promise 相关的后续操作。

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

在上面的示例中，resolve 和 reject 函数都带有一个参数。这个参数通常是 Promise 的最终值或拒绝原因。在实际应用中，这个值可以是任何 JavaScript 对象，例如一个数据对象、错误对象等。

在使用 Promise 时，通常会使用 then 方法来处理已完成状态，使用 catch 方法来处理已拒绝状态。这使得异步操作的结果能够被适当地处理，而不是通过回调函数或其他方式来处理异步代码。