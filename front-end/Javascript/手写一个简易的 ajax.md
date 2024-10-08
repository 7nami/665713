# 手写一个简易的 ajax

先解释 xhr.readyState

- 0-（未初始化）还没有调用 send() 方法
- 1-（载入）已调用 send() 方法，正在发送请求
- 2-（载入完成）send() 方法执行完成，已经接收到全部响应内容
- 3-（交互）正在解析响应内容
- 4-（完成）响应内容解析完成，可以在客户端调用

再解释 xhr.status

- 2xx- 表示成功处理请求，如 200
- 3xx- 需要重定向，浏览器直接跳转，如 301 302 304
- 4xx- 客户端请求错误，如 404 403
- 5xx- 服务器端错误

先准备一个数据：http://test.com//test/test.json

```js
{
  "name":"zhangsan"
}
```



get 请求演示：

```js
const xhr = new XMLHttpRequest()
// get请求，true 表示异步
xhr.open('GET', '/test/test.json', true)
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log(xhr.status, JSON.parse(xhr.responseText))
            //200 {name: "zhangsan"}
        } else {
            console.log(xhr.status, '其他情况')
            // 404 "其他情况"
        }
    }
}
xhr.send(null)
```



post 请求演示：

```js
const xhr = new XMLHttpRequest()
// post请求，无法演示，true 表示异步
xhr.open('POST', '/login', true)
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log(xhr.status, JSON.parse(xhr.responseText))
            // 登录成功提示
        } else {
            console.log(xhr.status, '其他情况')
            // 404 "其他情况"
        }
    }
}
const postData = {
    username: 'zhangsan',
    password: 'xxx'
}
//注意，需要把 json 转字符串
xhr.send(JSON.stringify(postData))
```



手写一个 ajax 函数，增加 Promise 的封装

```js
function ajax(url) {
    const p = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else if (xhr.status === 404) {
                    reject(new Error('404 not found'))
                }
            }
        }
        xhr.send(null)
    })
    return p
}
const url = '/test/test.json'
ajax(url).then(res => {
    console.log(res) // {name: "zhangsan"}
}).catch(err => {
    console.log(err) // '404 not found'
})
```



实际项目中 ajax 的常用插件

- jQuery：https://www.w3school.com.cn/jquery/ajax_ajax.asp
- Fetch 是新的 API：https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
- axios：https://github.com/axios/axios