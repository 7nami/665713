- `setTimeout` 将回调函数放入任务队列中，等待 xxxx 毫秒后执行。
- `setInterval` 将回调函数放入任务队列中，并每隔 xxxx 毫秒重复执行。
- `setImmediate` 将回调函数放入任务队列中，等待当前事件循环结束后立即执行。

-----

#### 事件循环中的宏任务和微任务分别有哪些？

#### [宏任务](http://nocat.life:3009/#宏任务)

1. 整体代码 script
2. setTimeout、setInterval
3. setImmediate（Node.js）
4. I/O 操作（输入输出，比如读取文件操作、网络请求）
5. UI Render（DOM 渲染，即更改代码重新渲染 DOM 的过程）
6. 异步 AJAX、axios、fetch 等

#### [微任务](http://nocat.life:3009/#微任务)

1. Promise 的 then、catch、finally 方法
2. async/await
3. process.nextTick（Node.js）
4. Object.observe（⽤来实时监测 JS 中对象的变化，已废除）
5. MutationObserver（监听 DOM 树的变化）

---

#### JS 的事件循环（Event Loop）

#### [1. 执行宏任务（全局 script）：](http://nocat.life:3009/#1. 执行宏任务（全局 script）：)

当浏览器解析到 `<script>` 标签时，会创建一个宏任务，并执行 `<script>` 标签中的代码。在执行过程中，如果遇到异步代码，会将异步代码添加任务队列中。

#### [2. 执行微任务](http://nocat.life:3009/#2. 执行微任务)

当第一个宏任务“全局 script”执行完成后，JavaScript 引擎会立即检查微任务队列。如果有微任务，它们会按照队列的顺序依次执行所有的微任务。
微任务通常包括 Promise 的回调函数（`.then()`、`.catch()`、`.finally()` 等）

至此，第一轮事件循环结束。

#### [3. 执行宏任务](http://nocat.life:3009/#3. 执行宏任务)

当所有的微任务执行完成后，JavaScript 引擎会检查宏任务队列中是否还有宏任务。如果有，则取出一个宏任务并执行。在执行宏任务过程中，如果产生了新的微任务，则将其添加到微任务队列中。

#### [4. 执行微任务](http://nocat.life:3009/#4. 执行微任务)

当宏任务执行完成后，JavaScript 引擎会继续检查微任务队列。如果有微任务，按照队列的顺序再次执行所有的微任务。

至此，第二轮事件循环结束。

#### [5. 继续下一个循环](http://nocat.life:3009/#5. 继续下一个循环)

重复执行上述步骤 3 和 4，直到任务队列为空。