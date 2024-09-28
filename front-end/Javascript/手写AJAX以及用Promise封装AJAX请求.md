# 手写 AJAX 以及用 Promise 封装 AJAX 请求

本文将介绍如何手写一个简易的 AJAX 请求，并使用 Promise 进行封装，以更好地处理异步操作和错误管理。

## 1. 手写一个简易的 AJAX 请求

以下是使用 `XMLHttpRequest` 对象手写的一个基本 AJAX GET 请求：

```javascript
const xhr = new XMLHttpRequest();

// 配置请求：GET 请求，异步模式
xhr.open('GET', 'https://example.com/api/data', true);

// 监听请求状态变化
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) { // 请求已完成
        if (xhr.status >= 200 && xhr.status < 300) { // 请求成功
            console.log('成功：', JSON.parse(xhr.responseText)); // 解析 JSON 数据
        } else {
            console.error('请求失败，状态码：', xhr.status); // 请求失败处理
        }
    }
};

// 发送请求
xhr.send(null);
```

## 2. 用 Promise 封装 AJAX 请求

为了更好地处理异步请求和错误，使用 `Promise` 对原生的 AJAX 进行封装，这样可以通过链式调用 `.then()` 和 `.catch()` 来处理成功和失败的情况。

### 封装 GET 请求为 Promise

```javascript
function ajaxGet(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // 配置请求
        xhr.open('GET', url, true);

        // 监听状态变化
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { // 请求完成
                if (xhr.status >= 200 && xhr.status < 300) { // 成功
                    resolve(JSON.parse(xhr.responseText)); // 返回解析后的 JSON 数据
                } else {
                    reject(new Error('请求失败，状态码：' + xhr.status)); // 请求失败
                }
            }
        };

        // 发送请求
        xhr.send(null);
    });
}
```

### 封装 POST 请求为 Promise

```javascript
function ajaxPost(url, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // 配置 POST 请求
        xhr.open('POST', url, true);

        // 设置请求头，表明发送的是 JSON 数据
        xhr.setRequestHeader('Content-Type', 'application/json');

        // 监听状态变化
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText)); // 成功处理响应数据
                } else {
                    reject(new Error('请求失败，状态码：' + xhr.status)); // 失败处理
                }
            }
        };

        // 将数据序列化为 JSON 字符串并发送
        xhr.send(JSON.stringify(data));
    });
}
```

## 3. 使用示例

### 调用 GET 请求

```javascript
ajaxGet('https://example.com/api/data')
    .then(response => {
        console.log('请求成功：', response);
    })
    .catch(error => {
        console.error('请求出错：', error);
    });
```

### 调用 POST 请求

```javascript
const postData = {
    username: 'zhangsan',
    password: '123456'
};

ajaxPost('https://example.com/api/login', postData)
    .then(response => {
        console.log('登录成功：', response);
    })
    .catch(error => {
        console.error('登录失败：', error);
    });
```

## 4. 解释

- **XMLHttpRequest 对象**：这是用于发起 AJAX 请求的原生浏览器 API。`open()` 方法设置请求类型（如 GET 或 POST）和 URL，`send()` 方法发送请求。
- **`readyState` 和 `status`**：
  - `readyState == 4` 表示请求已经完成。
  - `status` 200-299 表示请求成功，其他状态表示请求失败。
- **Promise**：`Promise` 使异步请求的代码更具可读性。我们通过 `resolve` 来返回成功结果，通过 `reject` 返回错误，方便使用 `.then()` 和 `.catch()` 来处理结果和错误。

## 总结

- 通过原生的 `XMLHttpRequest` 发送 AJAX 请求。
- 使用 `Promise` 使得异步调用的代码更加简洁、可读。
- 可以灵活地处理 GET 和 POST 请求，并且可以很容易地扩展到其他请求类型（如 PUT、DELETE 等）
