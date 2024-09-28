# Fetch 和 XHR 有什么区别？

### 区别：
- **原生 API vs ES6 新增函数**：`XHR` 是浏览器提供的原生 API，而 `fetch` 是 ES6 中新增的全局函数。
- **使用对象差异**：`XHR` 使用 `XMLHttpRequest` 对象，而 `fetch` 使用 `Promise` 对象。
- **Cookies 默认携带**：`fetch` 默认不会携带 cookies，需要手动设置 `credentials` 属性；而 `XHR` 请求会自动携带 cookies。
- **请求取消能力**：`XHR` 可以取消一个正在进行的请求，而 `fetch` 目前支持通过 `AbortController` 来取消请求。
- **响应类型处理**：`XHR` 的 `responseType` 属性可以设置响应类型（`text`、`json`、`blob` 等），而 `fetch` 需要手动解析响应。
- **进度监听功能**：`XHR` 可以监听上传和下载的进度，而 `fetch` 不支持此功能。
- **错误处理方式**：在错误处理方面，`fetch` 只会在网络错误时 `reject` `Promise`，对于其他 HTTP 错误（如 404、500），`fetch` 不会自动处理，需要手动检查 `response.ok`；而 `XHR` 则会在出现错误时 reject `Promise`。
- **兼容性**：`XHR` 兼容性更好，在一些旧版本的浏览器中可能无法使用 `fetch`。

---

### 代码示例：

#### 使用 XHR 发送 GET 请求：

```javascript
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
    }
};
xhr.send();
```

**一些解释**：

- ```
  xhr.open
  ```

   的第三个参数是用于指示请求是否为异步的布尔值。

  - 如果将它设置为 `true`，则表示该请求是异步的，JavaScript 会在请求发送后继续执行并等待响应。
  - 如果设置为 `false`，则表示该请求是同步的，JavaScript 会在发送请求后一直等待直到收到响应为止。

**XMLHttpRequest 对象的 `readyState` 属性表示请求的状态，`status` 属性表示 HTTP 状态。**

- `readyState` 的可能取值包括：
  - 0: 未初始化，尚未调用 `open` 方法
  - 1: 启动，已经调用 `open` 方法，但尚未调用 `send` 方法
  - 2: 发送，已经调用 `send` 方法，但尚未接收到响应
  - 3: 接收，已经接收到部分数据
  - 4: 完成，已经接收到全部数据，并且可以在客户端使用
- `status` 的常见取值包括：
  - 200: 请求成功
  - 404: 未找到页面
  - 500: 服务器内部错误
  - 302: 重定向等

------

#### 使用 `fetch` 发送 GET 请求：

```js
fetch('https://api.example.com/data')
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(function(data) {
        console.log(data);
    })
    .catch(function(error) {
        console.log(error);
    });

```

---

### 其他需要补充的点：

- **取消 `fetch` 请求**：`fetch` 目前可以通过 `AbortController` 来取消请求，示例如下：

```js
const controller = new AbortController();
const signal = controller.signal;

fetch('https://api.example.com/data', { signal })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error('Fetch error:', err));

// 取消请求
controller.abort();
```



### 总结：

- `XHR` 和 `fetch` 各有优劣，`fetch` 语法更加现代化，且返回 `Promise`，而 `XHR` 具备更丰富的功能如请求进度监听、自动携带 cookies 等。
- `fetch` 在错误处理上需要注意手动检查 HTTP 状态码，而 `XHR` 能够更直观地处理这些状态。